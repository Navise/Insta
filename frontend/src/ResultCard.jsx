import React from 'react';
import { FaRegCheckCircle, FaRegTimesCircle, FaExclamationTriangle, FaShieldAlt, FaRegLightbulb, FaComments } from 'react-icons/fa';

const BooleanIndicator = ({ value }) => (
  <div className="flex items-center space-x-2">
    {value ? 
      <FaRegCheckCircle className="w-6 h-6 text-green-500" /> :
      <FaRegTimesCircle className="w-6 h-6 text-red-500" />
    }
    <span className="text-lg font-medium">{value ? 'True' : 'False'}</span>
  </div>
);

const ResultCard = ({ data }) => {
  if (!data) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-gradient-to-r from-red-600 to-red-800';
    if (score >= 60) return 'bg-gradient-to-r from-red-400 to-red-600';
    if (score >= 40) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-green-400 to-green-600';
  };

  const riskMetrics = [
    { name: 'Phishing', data: data.Phishing, icon: FaExclamationTriangle },
    { name: 'Fraudulent', data: data.Fraudulent, icon: FaShieldAlt },
    { name: 'Warning', data: data.Warning, icon: FaRegLightbulb },
    { name: 'Malicious', data: data.Malicious, icon: FaComments }
  ].filter(metric => metric.data);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-8">
      {/* Description Card */}
      {data.Descrip && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Analysis Summary</h2>
          <p className="text-gray-200 text-lg leading-relaxed">{data.Descrip}</p>
        </div>
      )}

      {/* Risk Metrics Grid */}
      {riskMetrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskMetrics.map(({ name, data, icon: Icon }) => (
            <div key={name} className={`${getScoreColor(data.confidenceScore)} text-white p-6 rounded-lg`}>
              <div className="flex justify-between items-center mb-4">
                <Icon className="w-8 h-8" />
                <span className="text-3xl font-bold">{data.confidenceScore}%</span>
              </div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <div className="mt-4">
                <BooleanIndicator value={data[`is${name}`]} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sentiment and Tone */}
      {data.SentimentAndTone?.SentimentScore && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Sentiment & Tone Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${getScoreColor(data.SentimentAndTone.SentimentScore)} text-white`}>
              <h3 className="text-xl font-semibold mb-4">Sentiment</h3>
              <div className="flex justify-between items-center">
                <span className="capitalize text-lg">{data.SentimentAndTone.Sentiment}</span>
                <span className="text-3xl font-bold">{data.SentimentAndTone.SentimentScore}%</span>
              </div>
            </div>
            <div className={`p-6 rounded-lg ${getScoreColor(data.SentimentAndTone.ToneScore)} text-white`}>
              <h3 className="text-xl font-semibold mb-4">Tone</h3>
              <div className="flex justify-between items-center">
                <span className="capitalize text-lg">{data.SentimentAndTone.Tone}</span>
                <span className="text-3xl font-bold">{data.SentimentAndTone.ToneScore}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keywords */}
      {data.Keywords?.keywords?.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Key Indicators</h2>
          <div className="flex flex-wrap gap-3">
            {data.Keywords.keywords.map((keyword, index) => (
              <span key={index} className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-lg font-medium">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Writing Patterns */}
      {data.WritingPatterns?.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Writing Patterns</h2>
          <div className="space-y-6">
            {data.WritingPatterns.map((pattern, index) => (
              <div key={index} className={`p-6 rounded-lg ${getScoreColor(pattern.patternScore)} text-white`}>
                <div className="flex justify-between items-center">
                  <span className="capitalize text-xl">{pattern.pattern}</span>
                  <span className="text-3xl font-bold">{pattern.patternScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legitimacy Status */}
      {data.Legitimacy?.status && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Legitimacy Status</h2>
          <div className="flex justify-between items-center">
            <span className="text-xl">Legitimate:</span>
            <span className={`text-3xl font-bold ${data.Legitimacy.isLegitimate ? 'text-green-500' : 'text-red-500'}`}>
              {data.Legitimacy.isLegitimate ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      )}

      {/* Audience Targeting */}
      {data.AudienceTargeting && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Audience Targeting</h2>
          <div className="flex justify-between items-center">
            <span className="text-xl">Target:</span>
            <span className="text-2xl font-medium">{data.AudienceTargeting.target}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl">Targeting Score:</span>
            <span className={`text-3xl font-bold ${data.AudienceTargeting.targetingScore >= 50 ? 'text-green-500' : 'text-red-500'}`}>
              {data.AudienceTargeting.targetingScore}%
            </span>
          </div>
        </div>
      )}

      {/* Politeness Level */}
      {data.PolitenessLevel && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Politeness Level</h2>
          <div className="flex justify-between items-center">
            <span className="text-xl">Politeness:</span>
            <span className={`text-3xl font-bold ${data.PolitenessLevel.politenessScore >= 50 ? 'text-green-500' : 'text-red-500'}`}>
              {data.PolitenessLevel.level}
            </span>
          </div>
        </div>
      )}

      {/* Cultural References */}
      {data.CulturalReferences && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Cultural References</h2>
          <div className="flex justify-between items-center">
            <span className="text-xl">Cultural References Present:</span>
            <span className={`text-3xl font-bold ${data.CulturalReferences.isPresent ? 'text-green-500' : 'text-red-500'}`}>
              {data.CulturalReferences.isPresent ? 'Yes' : 'No'}
            </span>
          </div>
          {data.CulturalReferences.references?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Cultural References:</h4>
              <ul className="list-disc pl-6">
                {data.CulturalReferences.references.map((ref, index) => (
                  <li key={index} className="text-lg">{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
