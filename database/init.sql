-- DomisLink Proctoring Database Schema

CREATE TABLE IF NOT EXISTS exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL,
    exam_id UUID NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proctoring_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES exam_sessions(id),
    signal_id INTEGER NOT NULL,
    signal_name VARCHAR(200) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    confidence FLOAT DEFAULT 0.0,
    description TEXT,
    metadata JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ai_analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES exam_sessions(id),
    analysis_type VARCHAR(100) NOT NULL,
    result_data JSONB NOT NULL,
    confidence FLOAT DEFAULT 0.0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS behavioral_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES exam_sessions(id),
    pattern_type VARCHAR(100) NOT NULL,
    pattern_data JSONB NOT NULL,
    anomaly_score FLOAT DEFAULT 0.0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_exam_sessions_candidate ON exam_sessions(candidate_id);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_exam ON exam_sessions(exam_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_flags_session ON proctoring_flags(session_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_flags_timestamp ON proctoring_flags(timestamp);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_session ON ai_analysis_results(session_id);