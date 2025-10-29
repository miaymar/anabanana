
import React from 'react';
import { PROMPTS } from '../constants';

const PromptsReference: React.FC = () => {
  const promptContent = `Normal →\n${PROMPTS.normal}\n\nNocturno / Fondo noche →\n${PROMPTS.nocturno}\n\nEstampado de frutas →\n${PROMPTS.frutas}`;

  return (
    <details className="p-4 rounded-2xl bg-neutral-900/60 ring-1 ring-white/10">
      <summary className="cursor-pointer select-none font-medium">Ver prompts de referencia</summary>
      <pre className="mt-3 text-xs whitespace-pre-wrap opacity-80 bg-neutral-950 p-3 rounded-lg">
        {promptContent}
      </pre>
    </details>
  );
};

export default PromptsReference;
