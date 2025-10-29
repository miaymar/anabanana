
import React, { useState, useCallback } from 'react';
import { JSZip } from 'jszip';
import { saveAs } from 'file-saver';
import { ImageFile, ResultImage } from './types';
import { PROMPTS } from './constants';
import { editImageWithGemini } from './services/geminiService';

import ImageUploader from './components/ImageUploader';
import GenerationModes from './components/GenerationModes';
import ProgressSection from './components/ProgressSection';
import ResultGrid from './components/ResultGrid';
import PromptsReference from './components/PromptsReference';

declare var JSZip: any;
declare var saveAs: any;

const App: React.FC = () => {
  const [sourceFiles, setSourceFiles] = useState<ImageFile[]>([]);
  const [generatedImages, setGeneratedImages] = useState<ResultImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Esperando…');

  const handleFilesChange = (files: File[]) => {
    if (files.length > 10) {
      alert('Por favor, selecciona un máximo de 10 imágenes.');
      files = files.slice(0, 10);
    }
    const imageFiles = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setSourceFiles(imageFiles);
  };

  const generateBatch = useCallback(async (prompt: string, modeKey: string) => {
    if (sourceFiles.length !== 10) {
      alert('Debes seleccionar exactamente 10 imágenes.');
      return;
    }
    if (!prompt) {
      alert('El prompt no puede estar vacío.');
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setGeneratedImages([]);
    setStatusText('Iniciando generación...');
    setProgress(0);

    const results: ResultImage[] = [];
    const total = sourceFiles.length;

    for (let i = 0; i < total; i++) {
      const sourceFile = sourceFiles[i];
      const currentStatus = `Generando imagen ${i + 1} de ${total}...`;
      setStatusText(currentStatus);
      
      try {
        const blob = await editImageWithGemini(sourceFile.file, prompt);
        const originalName = sourceFile.file.name;
        const extension = originalName.slice(originalName.lastIndexOf('.'));
        const baseName = originalName.slice(0, originalName.lastIndexOf('.'));
        const name = `${baseName}__${modeKey}${extension}`;
        
        results.push({ name, url: URL.createObjectURL(blob), blob, status: 'success' });
      } catch (err) {
        console.error(`Error processing image ${i + 1}:`, err);
        results.push({ name: sourceFile.file.name, url: '', blob: null, status: 'error' });
      }
      
      setGeneratedImages([...results]);
      setProgress(Math.round(((i + 1) / total) * 100));
    }

    setStatusText('¡Listo! Todas las imágenes han sido procesadas.');
    setIsLoading(false);
  }, [sourceFiles, isLoading]);

  const downloadAll = async () => {
    const successfulResults = generatedImages.filter(img => img.status === 'success' && img.blob);
    if (successfulResults.length === 0) return;

    const zip = new JSZip();
    successfulResults.forEach(({ name, blob }) => {
      if(blob) zip.file(name, blob);
    });

    setStatusText('Comprimiendo archivos...');
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `generadas_${Date.now()}.zip`);
    setStatusText('¡Listo!');
  };

  return (
    <div className="min-h-screen text-white font-sans">
      <header className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight">Gemini · Editor de Imágenes por Lote</h1>
        <p className="text-sm opacity-80 mt-1">Sube <strong>exactamente 10 fotos</strong>. Elige un modo de edición o escribe tu propia instrucción para generar 10 transformaciones.</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 space-y-8">
        <ImageUploader onFilesChange={handleFilesChange} sourceFiles={sourceFiles} />
        <GenerationModes onGenerate={generateBatch} isLoading={isLoading} />
        <ProgressSection
          statusText={statusText}
          progress={progress}
          onDownload={downloadAll}
          canDownload={!isLoading && generatedImages.some(img => img.status === 'success')}
        />
        <ResultGrid generatedImages={generatedImages} />
        <PromptsReference />
      </main>
    </div>
  );
};

export default App;
