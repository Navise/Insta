import React, { useState } from 'react';
import ResultCard from './ResultCard';

const InputForm = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('There was an issue processing your request. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-8 mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center text-slate-800">Enter the Text</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            className="w-full px-6 py-3 border-2 border-slate-800 rounded-lg text-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-transparent resize-none"
            placeholder="Enter text here..."
            rows="6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold shadow-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
        >
          Submit
        </button>
      </form>

      <ResultCard data={result}/>
    </div>
  );
};

export default InputForm;
