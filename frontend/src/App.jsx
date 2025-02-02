import { useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import InputForm from './InputForm';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div 
        className={`min-h-screen flex flex-col justify-center items-center text-center px-6 py-8 sm:py-12 transition-all duration-500 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-6 p-3 rounded-full hover:bg-opacity-100 transition-all duration-300 focus:outline-none z-50"
        >
          {darkMode ? (
            <BsFillSunFill
              size={30}
              className="text-white transition-transform transform hover:scale-125"
            />
          ) : (
            <BsFillMoonFill
              size={30}
              className="text-black transition-transform transform hover:scale-125"
            />
          )}
        </button>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className={`absolute inset-0 ${
                    darkMode
                      ? 'bg-gradient-to-r from-green-700 via-teal-500 to-blue-400 opacity-20'
                      : 'bg-gradient-to-r from-yellow-200 to-orange-300 opacity-15'
                  } rounded-full blur-3xl z-0 animate-pulse w-96 h-96`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                ></div>

                <h1
                  className={`${
                    darkMode ? 'text-white' : 'text-black'
                  } text-4xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight z-10 transition-all duration-300`}
                >
                  <span className="text-yellow-400">Discover</span> Deeper Insights
                  from Every Word
                </h1>

                <p
                  className={`${
                    darkMode ? 'text-white' : 'text-black'
                  } text-lg sm:text-xl mb-8 max-w-md sm:max-w-lg leading-relaxed font-semibold z-10 transition-all duration-300`}
                >
                  Analyse Patterns and content for{' '}
                  <span className="text-green-400 font-bold">phishing risks</span>,
                  identify <span className="text-green-400 font-bold">malicious intent</span> and{' '}
                  <span className="text-green-400 font-bold">fraudulent patterns</span>,
                  assess <span className="text-green-400 font-bold">emotional tone</span>,
                  and detect subtle <span className="text-green-400 font-bold">psychological cues</span>.
                  Unlock insights for more.
                </p>

                <Link to="/text">
                  <button className="bg-gradient-to-r from-white to-gray-200 text-blue-600 font-bold py-3 px-8 rounded-full shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 z-10">
                    Get Started
                  </button>
                </Link>
                
              </>
            }
          />
          <Route path="/text" element={<InputForm />} />
 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
