const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// Advanced AI Proctoring Signals (101-200)
const ADVANCED_PROCTORING_SIGNALS = {
  // Behavioral & Cognitive Patterns (101-130)
  101: { name: 'Unusual Answering Speed Pattern', severity: 'medium', threshold: 0.7 },
  102: { name: 'Systematic Guessing Behavior', severity: 'medium', threshold: 0.65 },
  103: { name: 'Inconsistent Performance Patterns', severity: 'high', threshold: 0.75 },
  104: { name: 'Cognitive Load Anomalies', severity: 'medium', threshold: 0.6 },
  105: { name: 'Memory Recall Patterns', severity: 'low', threshold: 0.55 },
  106: { name: 'Decision Making Inconsistencies', severity: 'medium', threshold: 0.68 },
  107: { name: 'Problem Solving Strategy Shifts', severity: 'medium', threshold: 0.62 },
  108: { name: 'Learning Curve Anomalies', severity: 'low', threshold: 0.58 },
  109: { name: 'Knowledge Application Patterns', severity: 'medium', threshold: 0.65 },
  110: { name: 'Mental Fatigue Indicators', severity: 'low', threshold: 0.52 },
  
  // Eye Tracking & Gaze Analysis (131-150)
  131: { name: 'Saccadic Eye Movement Patterns', severity: 'high', threshold: 0.72 },
  132: { name: 'Fixation Duration Anomalies', severity: 'medium', threshold: 0.64 },
  133: { name: 'Gaze Velocity Variations', severity: 'medium', threshold: 0.61 },
  134: { name: 'Pupil Dilation Patterns', severity: 'high', threshold: 0.78 },
  135: { name: 'Blink Rate Inconsistencies', severity: 'low', threshold: 0.56 },
  136: { name: 'Visual Search Patterns', severity: 'medium', threshold: 0.67 },
  137: { name: 'Attention Span Fluctuations', severity: 'medium', threshold: 0.63 },
  138: { name: 'Peripheral Vision Usage', severity: 'high', threshold: 0.74 },
  139: { name: 'Eye-Hand Coordination Patterns', severity: 'medium', threshold: 0.66 },
  140: { name: 'Visual Fatigue Indicators', severity: 'low', threshold: 0.54 },
  
  // Facial Expression & Micro-expressions (151-170)
  151: { name: 'Micro-expression Flash Patterns', severity: 'high', threshold: 0.76 },
  152: { name: 'Emotional State Inconsistencies', severity: 'medium', threshold: 0.65 },
  153: { name: 'Stress Level Fluctuations', severity: 'medium', threshold: 0.62 },
  154: { name: 'Confidence Level Variations', severity: 'low', threshold: 0.58 },
  155: { name: 'Cognitive Dissonance Indicators', severity: 'medium', threshold: 0.67 },
  156: { name: 'Deception Detection Patterns', severity: 'high', threshold: 0.79 },
  157: { name: 'Facial Asymmetry Analysis', severity: 'medium', threshold: 0.64 },
  158: { name: 'Emotional Contagion Patterns', severity: 'low', threshold: 0.55 },
  159: { name: 'Non-verbal Leakage Detection', severity: 'high', threshold: 0.77 },
  160: { name: 'Authenticity Score Variations', severity: 'medium', threshold: 0.66 },
  
  // Voice & Audio Analysis (171-190)
  171: { name: 'Vocal Stress Pattern Analysis', severity: 'medium', threshold: 0.65 },
  172: { name: 'Speech Rate Inconsistencies', severity: 'low', threshold: 0.57 },
  173: { name: 'Pitch Variation Anomalies', severity: 'medium', threshold: 0.63 },
  174: { name: 'Voice Tremor Detection', severity: 'high', threshold: 0.73 },
  175: { name: 'Breathing Pattern Analysis', severity: 'medium', threshold: 0.62 },
  176: { name: 'Speech Fluency Variations', severity: 'low', threshold: 0.56 },
  177: { name: 'Vocal Fillers Frequency', severity: 'medium', threshold: 0.61 },
  178: { name: 'Audio Environment Changes', severity: 'high', threshold: 0.75 },
  179: { name: 'Background Voiceprint Analysis', severity: 'high', threshold: 0.78 },
  180: { name: 'Acoustic Anomaly Detection', severity: 'medium', threshold: 0.67 },
  
  // System & Network Patterns (191-200)
  191: { name: 'Network Latency Patterns', severity: 'medium', threshold: 0.64 },
  192: { name: 'Bandwidth Usage Anomalies', severity: 'high', threshold: 0.76 },
  193: { name: 'Process Tree Analysis', severity: 'high', threshold: 0.8 },
  194: { name: 'Memory Usage Patterns', severity: 'medium', threshold: 0.62 },
  195: { name: 'CPU Utilization Anomalies', severity: 'medium', threshold: 0.65 },
  196: { name: 'I/O Operation Patterns', severity: 'low', threshold: 0.58 },
  197: { name: 'Network Packet Analysis', severity: 'high', threshold: 0.82 },
  198: { name: 'System Call Monitoring', severity: 'high', threshold: 0.79 },
  199: { name: 'Virtual Machine Detection', severity: 'critical', threshold: 0.9 },
  200: { name: 'Container Environment Analysis', severity: 'critical', threshold: 0.88 }
};

// AI Analysis Endpoints
app.post('/api/analyze/behavioral', async (req, res) => {
  try {
    const { sessionId, behaviorData } = req.body;
    
    // Simulate advanced behavioral analysis
    const analysisResults = await analyzeBehavioralPatterns(behaviorData);
    
    // Store results in database
    await pool.query(
      'INSERT INTO behavioral_patterns (session_id, pattern_type, pattern_data, anomaly_score) VALUES ($1, $2, $3, $4)',
      [sessionId, 'behavioral_analysis', analysisResults, analysisResults.anomalyScore]
    );

    res.json({
      success: true,
      analysis: analysisResults,
      flags: generateBehavioralFlags(analysisResults, sessionId)
    });
  } catch (error) {
    console.error('Behavioral analysis error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/analyze/facial', async (req, res) => {
  try {
    const { sessionId, imageData, timestamp } = req.body;
    
    // Simulate facial expression analysis
    const facialAnalysis = await analyzeFacialExpressions(imageData);
    
    await pool.query(
      'INSERT INTO ai_analysis_results (session_id, analysis_type, result_data, confidence) VALUES ($1, $2, $3, $4)',
      [sessionId, 'facial_expression', facialAnalysis, facialAnalysis.confidence]
    );

    res.json({
      success: true,
      analysis: facialAnalysis,
      flags: generateFacialFlags(facialAnalysis, sessionId)
    });
  } catch (error) {
    console.error('Facial analysis error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/analyze/voice', async (req, res) => {
  try {
    const { sessionId, audioData, duration } = req.body;
    
    // Simulate voice stress analysis
    const voiceAnalysis = await analyzeVoicePatterns(audioData);
    
    await pool.query(
      'INSERT INTO ai_analysis_results (session_id, analysis_type, result_data, confidence) VALUES ($1, $2, $3, $4)',
      [sessionId, 'voice_analysis', voiceAnalysis, voiceAnalysis.confidence]
    );

    res.json({
      success: true,
      analysis: voiceAnalysis,
      flags: generateVoiceFlags(voiceAnalysis, sessionId)
    });
  } catch (error) {
    console.error('Voice analysis error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Real-time Monitoring Endpoint
app.post('/api/monitor/real-time', async (req, res) => {
  try {
    const { sessionId, monitoringData } = req.body;
    
    const realTimeAnalysis = await performRealTimeAnalysis(monitoringData);
    
    // Store in Redis for real-time dashboard updates
    await redisClient.setEx(
      `session:${sessionId}:realtime`,
      30, // 30 seconds TTL
      JSON.stringify(realTimeAnalysis)
    );

    res.json({
      success: true,
      analysis: realTimeAnalysis,
      alerts: generateRealTimeAlerts(realTimeAnalysis)
    });
  } catch (error) {
    console.error('Real-time monitoring error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Signal Analysis Functions
async function analyzeBehavioralPatterns(behaviorData) {
  // Simulate complex behavioral pattern analysis
  return {
    anomalyScore: Math.random(),
    confidence: 0.85 + Math.random() * 0.15,
    patterns: {
      answeringSpeed: analyzeAnsweringSpeed(behaviorData.answeringPatterns),
      performanceConsistency: analyzePerformanceConsistency(behaviorData.performanceData),
      cognitiveLoad: estimateCognitiveLoad(behaviorData.interactionData)
    },
    timestamp: new Date().toISOString()
  };
}

async function analyzeFacialExpressions(imageData) {
  // Simulate facial expression analysis using computer vision
  return {
    confidence: 0.80 + Math.random() * 0.20,
    emotions: {
      stress: Math.random(),
      confidence: Math.random(),
      confusion: Math.random(),
      focus: Math.random()
    },
    microExpressions: detectMicroExpressions(imageData),
    authenticityScore: 0.75 + Math.random() * 0.25,
    timestamp: new Date().toISOString()
  };
}

async function analyzeVoicePatterns(audioData) {
  // Simulate voice stress and pattern analysis
  return {
    confidence: 0.78 + Math.random() * 0.22,
    stressLevel: Math.random(),
    speechRate: analyzeSpeechRate(audioData),
    pitchVariation: analyzePitchVariation(audioData),
    backgroundAnalysis: analyzeBackgroundNoise(audioData),
    timestamp: new Date().toISOString()
  };
}

// Helper functions for signal analysis
function analyzeAnsweringSpeed(patterns) {
  return {
    averageTime: 45.2,
    consistency: 0.82,
    anomalies: Math.random() > 0.7 ? ['sudden_speed_increase'] : []
  };
}

function analyzePerformanceConsistency(performanceData) {
  return {
    consistencyScore: 0.75 + Math.random() * 0.25,
    patternStability: 0.80 + Math.random() * 0.20,
    anomalies: Math.random() > 0.8 ? ['inconsistent_performance'] : []
  };
}

function estimateCognitiveLoad(interactionData) {
  return {
    loadLevel: Math.random(),
    fatigueIndicators: Math.random() > 0.6 ? ['increased_error_rate'] : [],
    focusScore: 0.70 + Math.random() * 0.30
  };
}

function detectMicroExpressions(imageData) {
  return {
    deceptionIndicators: Math.random() > 0.9 ? ['micro_expression_flash'] : [],
    emotionalLeakage: Math.random() > 0.85 ? ['facial_asymmetry'] : [],
    confidence: 0.80 + Math.random() * 0.20
  };
}

function analyzeSpeechRate(audioData) {
  return {
    wordsPerMinute: 150 + Math.random() * 50,
    consistency: 0.75 + Math.random() * 0.25,
    anomalies: Math.random() > 0.7 ? ['speech_rate_spike'] : []
  };
}

function analyzePitchVariation(audioData) {
  return {
    variationScore: Math.random(),
    stability: 0.80 + Math.random() * 0.20,
    stressIndicators: Math.random() > 0.8 ? ['pitch_instability'] : []
  };
}

function analyzeBackgroundNoise(audioData) {
  return {
    noiseLevel: Math.random(),
    voiceCount: Math.floor(Math.random() * 3),
    environmentStability: 0.85 + Math.random() * 0.15
  };
}

async function performRealTimeAnalysis(monitoringData) {
  return {
    sessionIntegrity: 0.90 + Math.random() * 0.10,
    riskLevel: Math.random() * 100,
    activeSignals: Object.keys(ADVANCED_PROCTORING_SIGNALS)
      .filter(() => Math.random() > 0.7)
      .map(signalId => ({
        signalId: parseInt(signalId),
        ...ADVANCED_PROCTORING_SIGNALS[signalId],
        confidence: Math.random()
      })),
    timestamp: new Date().toISOString()
  };
}

// Flag generation functions
function generateBehavioralFlags(analysis, sessionId) {
  const flags = [];
  
  if (analysis.anomalyScore > 0.7) {
    flags.push({
      sessionId,
      signalId: 103,
      signalName: 'Inconsistent Performance Patterns',
      severity: 'high',
      confidence: analysis.confidence,
      description: 'Detected unusual performance pattern inconsistencies',
      metadata: { anomalyScore: analysis.anomalyScore }
    });
  }
  
  return flags;
}

function generateFacialFlags(analysis, sessionId) {
  const flags = [];
  
  if (analysis.emotions.stress > 0.8) {
    flags.push({
      sessionId,
      signalId: 153,
      signalName: 'Stress Level Fluctuations',
      severity: 'medium',
      confidence: analysis.confidence,
      description: 'Elevated stress levels detected during examination',
      metadata: { stressLevel: analysis.emotions.stress }
    });
  }
  
  return flags;
}

function generateVoiceFlags(analysis, sessionId) {
  const flags = [];
  
  if (analysis.backgroundAnalysis.voiceCount > 1) {
    flags.push({
      sessionId,
      signalId: 179,
      signalName: 'Background Voiceprint Analysis',
      severity: 'high',
      confidence: analysis.confidence,
      description: 'Multiple voices detected in examination environment',
      metadata: { voiceCount: analysis.backgroundAnalysis.voiceCount }
    });
  }
  
  return flags;
}

function generateRealTimeAlerts(analysis) {
  return analysis.activeSignals.map(signal => ({
    signalId: signal.signalId,
    name: signal.name,
    severity: signal.severity,
    confidence: signal.confidence,
    timestamp: new Date().toISOString()
  }));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'AI Proctoring Service',
    version: '2.0.0',
    signals: Object.keys(ADVANCED_PROCTORING_SIGNALS).length
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Proctoring Service running on port ${PORT}`);
  console.log(`📊 Monitoring ${Object.keys(ADVANCED_PROCTORING_SIGNALS).length} advanced signals`);
});