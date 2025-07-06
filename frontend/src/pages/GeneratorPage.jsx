import React from 'react';

const GeneratorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 font-inter min-h-screen">
      <h1 className="text-3xl font-bold text-text-dark mb-6">AI Post Generator</h1>
      <div className="w-full max-w-4xl bg-white border border-primary rounded-soft shadow-soft overflow-hidden" style={{ height: '80vh' }}>
        <iframe
          src="http://localhost:8501" 
          title="AI Post Generator"
          className="w-full h-full border-none"
        >
          Your browser does not support iframes.
        </iframe>
      </div>
      <p className="text-text-dark mt-4">Please ensure your AI Post Generator Python app is running on http://localhost:8501</p>
    </div>
  );
};

export default GeneratorPage; 