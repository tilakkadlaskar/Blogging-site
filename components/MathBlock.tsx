import React from 'react';

interface MathBlockProps {
  equation: string;
}

export const MathBlock: React.FC<MathBlockProps> = ({ equation }) => {
  return (
    <div className="my-8 overflow-x-auto py-4 px-4 border border-academic-border rounded bg-academic-surface/50">
      <div className="font-serif text-lg text-center min-w-max italic text-gray-200">
        {/* In a real implementation, we would use KaTeX here. 
            For this static pure-React version, we display the raw LaTeX-like string nicely. */}
        {equation}
      </div>
    </div>
  );
};