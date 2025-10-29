
import React from 'react';

interface ProgressSectionProps {
  statusText: string;
  progress: number;
  onDownload: () => void;
  canDownload: boolean;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ statusText, progress, onDownload, canDownload }) => {
  return (
    <section className="p-4 rounded-2xl bg-neutral-900/60 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">Progreso de Generación</h3>
          <p id="statusText" className="text-xs opacity-75 min-h-[16px]">{statusText}</p>
        </div>
        <div className="grow h-3 bg-neutral-800 rounded-full overflow-hidden w-full sm:w-auto">
          <div
            id="bar"
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button
          id="btnDescargar"
          onClick={onDownload}
          disabled={!canDownload}
          className="px-4 py-2 rounded-xl bg-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-white/20 transition-colors"
        >
          Descargar todo (.zip)
        </button>
      </div>
    </section>
  );
};

export default ProgressSection;
