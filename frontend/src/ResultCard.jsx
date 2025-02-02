import React from 'react';
import {
  FaRegCheckCircle, FaRegTimesCircle, FaExclamationTriangle,
  FaShieldAlt, FaRegLightbulb, FaComments, FaUsers, FaBalanceScale,
  FaBullhorn, FaUserTag, FaChalkboardTeacher
} from 'react-icons/fa';

const BooleanIndicator = ({ value }) => (
  <div className="flex items-center space-x-2">
    {value ?
      <FaRegCheckCircle className="w-6 h-6 text-green-500" /> :
      <FaRegTimesCircle className="w-6 h-6 text-red-500" />
    }
    <span className="text-lg font-medium">{value ? 'True' : 'False'}</span>
  </div>
);

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-gradient-to-r from-red-600 to-red-800';
  if (score >= 60) return 'bg-gradient-to-r from-red-400 to-red-600';
  if (score >= 40) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
  return 'bg-gradient-to-r from-green-400 to-green-800';
};


const ResultCard = ({data}) => {
  if (!data) return null;

  const riskMetrics = [
    { name: 'Phishing', data: data.Phishing, icon: FaExclamationTriangle },
    { name: 'Fraudulent', data: data.Fraudulent, icon: FaShieldAlt },
    { name: 'Warning', data: data.Warning, icon: FaRegLightbulb },
    { name: 'Malicious', data: data.Malicious, icon: FaComments }
  ].filter(metric => metric.data);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-8">
      {/* Description */}
      {data.Descrip && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Analysis Summary</h2>
          <p className="text-gray-200 text-lg leading-relaxed">{data.Descrip}</p>
        </div>
      )}

      {/* Risk Metrics */}
      {riskMetrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskMetrics.map(({ name, data, icon: Icon }) => (
            <div key={name} className={`${getScoreColor(data.confidenceScore)} text-white p-6 rounded-lg`}>
              <div className="flex justify-between items-center mb-4">
                <Icon className="w-8 h-8" />
                <span className="text-3xl font-bold">{data.confidenceScore}%</span>
              </div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <BooleanIndicator value={data[`is${name}`]} />
            </div>
          ))}
        </div>
      )}

      {/* Sentiment and Tone */}
      {data.SentimentAndTone && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Sentiment & Tone Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`${getScoreColor(data.SentimentAndTone.SentimentScore)} p-6 rounded-lg text-white`}>
              <h3 className="text-xl font-semibold mb-4">Sentiment</h3>
              <div className="flex justify-between items-center">
                <span className="capitalize text-lg">{data.SentimentAndTone.Sentiment || 'N/A'}</span>
                <span className="text-3xl font-bold">{data.SentimentAndTone.SentimentScore}%</span>
              </div>
            </div>
            <div className={`${getScoreColor(data.SentimentAndTone.ToneScore)} p-6 rounded-lg text-white`}>
              <h3 className="text-xl font-semibold mb-4">Tone</h3>
              <div className="flex justify-between items-center">
                <span className="capitalize text-lg">{data.SentimentAndTone.Tone || 'N/A'}</span>
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
              <div key={index} className={`${getScoreColor(pattern.patternScore)} p-6 rounded-lg text-white`}>
                <div className="flex justify-between items-center">
                  <span className="capitalize text-xl">{pattern.pattern}</span>
                  <span className="text-3xl font-bold">{pattern.patternScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

         {data.Legitimacy  && (
        <div className="p-6 rounded-lg bg-indigo-100 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Legitimacy Status</h3>
          <div className="flex justify-between items-center">
            <span className="capitalize text-lg">{data.Legitimacy.isLegitimate ? "True" :"False"}</span>
            <span className={`text-3xl font-bold ${(data.Legitimacy.trustworthinessScore)}`}>
              {data.Legitimacy.trustworthinessScore}%
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
            <span className="text-2xl font-medium">{data.AudienceTargeting.target || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl">Targeting Score:</span>
            <span className={`text-3xl font-bold ${data.AudienceTargeting.targetingScore >= 50 ? 'text-green-500' : 'text-red-500'}`}>
              {data.AudienceTargeting.targetingScore}%</span>
          </div>
        </div>
      )}


      

          {/* Scarcity or Urgency Cues */}
      {data.ScarcityOrUrgencyCues && (
        <div className="p-6 rounded-lg bg-red-100 shadow-md">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Scarcity & Urgency Cues</h3>
          <div className="flex justify-between items-center">
            <span className="capitalize text-lg">{data.ScarcityOrUrgencyCues.isPresent ? "True" :"False"}</span>
            <span className={`text-3xl font-bold ${(data.ScarcityOrUrgencyCues.urgencyScore)}`}>
              {data.ScarcityOrUrgencyCues.urgencyScore}%
            </span>
          </div>
        </div>
      )}

      {/* Personalization */}
      {data.Personalization && (
        <div className="p-6 rounded-lg bg-blue-50 shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Personalization</h3>
          <div className="flex items-center">
            <FaUserTag className="w-6 h-6 mr-2 text-blue-600" />
            <span className="text-lg">{data.Personalization.isPersonalized ? 'Yes' : 'No'}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="capitalize text-lg">{data.Personalization.isPersonalized ? "True" : "False"}</span>
            <span className="text-3xl font-bold text-blue-700">{data.Personalization.personalizationScore}%</span>
          </div>
        </div>
      )}

      {/* Formality Level */}
      {data.FormalityLevel && (
        <div className="p-6 rounded-lg bg-green-50 shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Formality Level</h3>
          <div className='flex justify-between'>
          <div className="flex items-center">
            <FaChalkboardTeacher className="w-6 h-6 mr-2 text-green-600" />
            <span className="text-lg capitalize">{data.FormalityLevel.level || 'N/A'}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-3xl font-bold text-green-700">{data.FormalityLevel.formalityScore}%</span>
          </div>
          </div>
        </div>
      )}

      {/* Intent */}
      {data.Intent && (
        <div className="p-6 rounded-lg bg-yellow-50 shadow-md">
          <h3 className="text-xl font-semibold text-yellow-700 mb-4">Intent</h3>
          <div className='flex justify-between'>
          <div className="flex justify-between items-center">
            <FaBullhorn className="w-6 h-6 text-yellow-600" />
            <span className="capitalize text-lg">{data.Intent.type || 'N/A'}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-3xl font-bold text-yellow-700">{data.Intent.intentScore}%</span>
          </div>
          </div>
        </div>
      )}

      {/* Politeness Level */}
      {data.PolitenessLevel && (
        <div className="p-6 rounded-lg bg-purple-50 shadow-md">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Politeness Level</h3>
          <div className='flex justify-between'>
          <div className="flex items-center">
            <span className="text-lg capitalize">{data.PolitenessLevel.level || 'N/A'}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-3xl font-bold text-purple-700">{data.PolitenessLevel.politenessScore}%</span>
          </div>
          </div>
        </div>
      )}
      

    </div>
  );
};

export default ResultCard;
