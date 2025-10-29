
import React, { useCallback } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  sourceFiles: ImageFile[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesChange, sourceFiles }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesChange(Array.from(event.target.files));
    }
  }, [onFilesChange]);

  return (
    <section className="p-4 rounded-2xl bg-neutral-900/60 ring-1 ring-white/10">
      <label htmlFor="fileInput" className="block text-sm mb-2 font-medium">
        Cargar 10 fotos (JPG/PNG/WebP)
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 transition-colors"
      />
      <p id="fileHint" className="text-xs mt-2 opacity-75">
        {sourceFiles.length} / 10 seleccionadas
      </p>
      {sourceFiles.length > 0 && (
        <div id="preview" className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {sourceFiles.map((imageFile, index) => (
            <img
              key={index}
              src={imageFile.previewUrl}
              alt={imageFile.file.name}
              className="aspect-square object-cover rounded-lg w-full"
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ImageUploader;
