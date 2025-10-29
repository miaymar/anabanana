
import React from 'react';
import { ResultImage } from '../types';

interface ResultGridProps {
  generatedImages: ResultImage[];
}

const ErrorPlaceholder: React.FC = () => (
    <div className="aspect-square flex items-center justify-center bg-red-950/30 text-red-300 text-xs text-center p-2 rounded-lg ring-1 ring-red-500/50">
      Error al generar
    </div>
);

const ResultGrid: React.FC<ResultGridProps> = ({ generatedImages }) => {
  if (generatedImages.length === 0) return null;

  return (
    <div id="out" className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
      {generatedImages.map((result, index) => (
        result.status === 'success' ? (
          <img
            key={index}
            src={result.url}
            alt={result.name}
            className="aspect-square object-cover rounded-lg w-full"
          />
        ) : (
          <ErrorPlaceholder key={index} />
        )
      ))}
    </div>
  );
};

export default ResultGrid;
