
import React, { useState } from 'react';
import { PROMPTS } from '../constants';

interface GenerationModesProps {
  onGenerate: (prompt: string, modeKey: string) => void;
  isLoading: boolean;
}

const ModeButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

const GenerationModes: React.FC<GenerationModesProps> = ({ onGenerate, isLoading }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  return (
    <section className="p-4 rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-3">1. Elige un modo predefinido</h2>
        <div className="flex flex-wrap gap-3">
          <ModeButton onClick={() => onGenerate(PROMPTS.normal, 'normal')} disabled={isLoading}>Normal</ModeButton>
          <ModeButton onClick={() => onGenerate(PROMPTS.nocturno, 'nocturno')} disabled={isLoading}>Nocturno / Fondo noche</ModeButton>
          <ModeButton onClick={() => onGenerate(PROMPTS.frutas, 'frutas')} disabled={isLoading}>Estampado de frutas</ModeButton>
        </div>
        <p className="text-xs mt-3 opacity-75">La generación inicia al pulsar un modo si hay 10 imágenes cargadas.</p>
      </div>
      
      <div className="border-t border-white/10 pt-4">
        <h2 className="text-lg font-semibold mb-3">2. O escribe tu propia instrucción</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ej: Añade un filtro retro, cambia el fondo a una playa..."
            disabled={isLoading}
            className="flex-grow bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button
            onClick={() => onGenerate(customPrompt, 'custom')}
            disabled={isLoading || !customPrompt.trim()}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generar con Prompt
          </button>
        </div>
      </div>
    </section>
  );
};

export default GenerationModes;
