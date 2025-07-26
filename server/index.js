const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// In-memory data stores (replace with proper database in production)
let spamDatabase = new Map();
let callHistory = [];
let threatIntelligence = [];
let userReports = [];
let blockedNumbers = new Set();
let whitelistedNumbers = new Set();

// Initialize with sample data
initializeSampleData();

function initializeSampleData() {
  // Sample spam numbers
  const spamNumbers = [
    '+919876543210', '+918765432109', '+917654321098', 
    '+919555123456', '+918444789012', '+917333456789'
  ];
  
  spamNumbers.forEach(number => {
    spamDatabase.set(number, {
      phoneNumber: number,
      spamProbability: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
      reportCount: Math.floor(Math.random() * 200) + 50,
      categories: ['fraud', 'telemarketing', 'robocall'],
      lastReported: new Date(),
      sources: ['community', 'ai_detection', 'telecom_db']
    });
  });

  // Sample threat intelligence
  threatIntelligence = [
    {
      id: 'threat-1',
      title: 'Fake UPI Reversal Scam Alert',
      description: 'Scammers calling about fake UPI transaction reversals asking for OTP and bank details',
      fraudType: 'upi_fraud',
      severity: 'high',
      affectedStates: ['delhi', 'maharashtra', 'karnataka'],
      isActive: true,
      createdAt: new Date(),
      source: 'Cybercrime Cell Delhi',
      preventionTips: [
        'Never share OTP or bank details over phone',
        'UPI transactions cannot be reversed by calling',
        'Contact your bank directly for any UPI issues',
        'Report suspicious calls to cybercrime helpline'
      ]
    },
    {
      id: 'threat-2',
      title: 'Digital Arrest Scam Surge',
      description: 'Increase in fake police/CBI calls claiming digital arrest and demanding money',
      fraudType: 'digital_arrest',
      severity: 'critical',
      affectedStates: ['uttar_pradesh', 'bihar', 'west_bengal'],
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      source: 'National Cyber Crime Portal',
      preventionTips: [
        'Police never make arrest calls',
        'No digital arrest process exists',
        'Never transfer money to avoid arrests',
        'Report to local police immediately'
      ]
    }
  ];
}

// AI-powered spam detection function
function detectSpam(phoneNumber, callerName = '', location = '') {
  let spamProbability = 0;
  let riskLevel = 'low';
  let fraudPatterns = [];
  let spamCategory = 'unknown';

  // Check against known spam database
  if (spamDatabase.has(phoneNumber)) {
    const spamData = spamDatabase.get(phoneNumber);
    spamProbability = spamData.spamProbability;
    spamCategory = spamData.categories[0];
  } else {
    // AI-like pattern detection
    // Check for suspicious patterns in phone numbers
    if (phoneNumber.match(/^\+91[0-9]{10}$/)) {
      // Valid Indian number format
      const number = phoneNumber.substring(3);
      
      // Pattern 1: Sequential numbers
      if (isSequentialNumber(number)) {
        spamProbability += 0.3;
        fraudPatterns.push({
          type: 'suspicious_number_pattern',
          confidence: 0.7,
          description: 'Sequential number pattern detected'
        });
      }
      
      // Pattern 2: Repeated digits
      if (hasRepeatedDigits(number)) {
        spamProbability += 0.2;
        fraudPatterns.push({
          type: 'repeated_digits',
          confidence: 0.6,
          description: 'Repeated digit pattern'
        });
      }
      
      // Pattern 3: Known spam prefixes
      const spamPrefixes = ['9876', '8765', '7654', '6543'];
      if (spamPrefixes.some(prefix => number.startsWith(prefix))) {
        spamProbability += 0.4;
        fraudPatterns.push({
          type: 'suspicious_prefix',
          confidence: 0.8,
          description: 'Known spam number prefix'
        });
      }
    }

    // Caller name analysis
    if (callerName) {
      const suspiciousNames = [
        'customer care', 'bank officer', 'kyc update', 'security team',
        'police', 'cbi', 'courier', 'lottery', 'prize', 'winner'
      ];
      
      if (suspiciousNames.some(name => callerName.toLowerCase().includes(name))) {
        spamProbability += 0.3;
        spamCategory = detectFraudCategory(callerName);
        fraudPatterns.push({
          type: 'suspicious_caller_name',
          confidence: 0.7,
          description: 'Caller name matches common fraud patterns'
        });
      }
    }

    // Location-based analysis
    if (location) {
      // Add location-based risk assessment
      const highRiskAreas = ['unknown', 'private', 'blocked'];
      if (highRiskAreas.includes(location.toLowerCase())) {
        spamProbability += 0.2;
      }
    }
  }

  // Determine risk level
  if (spamProbability >= 0.8) riskLevel = 'critical';
  else if (spamProbability >= 0.6) riskLevel = 'high';
  else if (spamProbability >= 0.4) riskLevel = 'medium';
  else if (spamProbability >= 0.2) riskLevel = 'low';
  else riskLevel = 'very_low';

  return {
    isSpam: spamProbability > 0.5,
    spamProbability: Math.min(spamProbability, 1.0),
    riskLevel,
    spamCategory,
    fraudPatterns,
    source: spamDatabase.has(phoneNumber) ? 'database' : 'ai_detection'
  };
}

function isSequentialNumber(number) {
  for (let i = 0; i < number.length - 2; i++) {
    const a = parseInt(number[i]);
    const b = parseInt(number[i + 1]);
    const c = parseInt(number[i + 2]);
    if (b === a + 1 && c === b + 1) return true;
  }
  return false;
}

function hasRepeatedDigits(number) {
  const digitCounts = {};
  for (let digit of number) {
    digitCounts[digit] = (digitCounts[digit] || 0) + 1;
    if (digitCounts[digit] >= 4) return true;
  }
  return false;
}

function detectFraudCategory(callerName) {
  const name = callerName.toLowerCase();
  if (name.includes('bank') || name.includes('upi') || name.includes('payment')) return 'financial_scam';
  if (name.includes('police') || name.includes('cbi') || name.includes('arrest')) return 'fake_authority';
  if (name.includes('kyc') || name.includes('update') || name.includes('verify')) return 'identity_theft';
  if (name.includes('lottery') || name.includes('prize') || name.includes('winner')) return 'lottery_scam';
  if (name.includes('loan') || name.includes('credit')) return 'loan_scam';
  return 'fraud';
}

// API Routes

// Check if a number is spam
app.post('/api/check-spam', (req, res) => {
  try {
    const { phoneNumber, callerName, location } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const spamResult = detectSpam(phoneNumber, callerName, location);
    
    // Log the call
    const callInfo = {
      id: `call-${Date.now()}`,
      phoneNumber,
      callerName: callerName || 'Unknown',
      location: location || 'Unknown',
      timestamp: new Date(),
      ...spamResult,
      reportCount: spamDatabase.has(phoneNumber) ? spamDatabase.get(phoneNumber).reportCount : 0
    };
    
    callHistory.unshift(callInfo);
    if (callHistory.length > 1000) callHistory = callHistory.slice(0, 1000);

    // Emit real-time update
    io.emit('call_detected', callInfo);
    
    // If spam, emit block event
    if (spamResult.isSpam && spamResult.spamProbability > 0.7) {
      const blockEvent = {
        phoneNumber,
        reason: `High spam probability (${Math.round(spamResult.spamProbability * 100)}%)`,
        timestamp: new Date(),
        spamCategory: spamResult.spamCategory,
        riskLevel: spamResult.riskLevel
      };
      io.emit('call_blocked', blockEvent);
    }

    res.json({
      success: true,
      data: spamResult
    });
  } catch (error) {
    console.error('Error checking spam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Report spam
app.post('/api/report-spam', (req, res) => {
  try {
    const { phoneNumber, category, description, location } = req.body;
    
    if (!phoneNumber || !category) {
      return res.status(400).json({ error: 'Phone number and category are required' });
    }

    const report = {
      id: `report-${Date.now()}`,
      phoneNumber,
      category,
      description: description || '',
      location: location || 'Unknown',
      timestamp: new Date(),
      verified: false
    };

    userReports.unshift(report);
    
    // Update spam database
    if (spamDatabase.has(phoneNumber)) {
      const spamData = spamDatabase.get(phoneNumber);
      spamData.reportCount += 1;
      spamData.spamProbability = Math.min(spamData.spamProbability + 0.1, 1.0);
      spamData.lastReported = new Date();
      if (!spamData.categories.includes(category)) {
        spamData.categories.push(category);
      }
    } else {
      spamDatabase.set(phoneNumber, {
        phoneNumber,
        spamProbability: 0.7,
        reportCount: 1,
        categories: [category],
        lastReported: new Date(),
        sources: ['community']
      });
    }

    // Emit real-time update
    io.emit('spam_reported', report);

    res.json({
      success: true,
      message: 'Spam report submitted successfully',
      data: report
    });
  } catch (error) {
    console.error('Error reporting spam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get call history
app.get('/api/call-history', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedHistory = callHistory.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedHistory,
      pagination: {
        page,
        limit,
        total: callHistory.length,
        hasMore: endIndex < callHistory.length
      }
    });
  } catch (error) {
    console.error('Error getting call history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get threat intelligence
app.get('/api/threat-intelligence', (req, res) => {
  try {
    res.json({
      success: true,
      data: threatIntelligence.filter(threat => threat.isActive)
    });
  } catch (error) {
    console.error('Error getting threat intelligence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get spam statistics
app.get('/api/statistics', (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCalls = callHistory.filter(call => call.timestamp >= today);
    const spamCallsToday = todayCalls.filter(call => call.isSpam);
    
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekCalls = callHistory.filter(call => call.timestamp >= weekAgo);
    
    const categoryStats = {};
    spamCallsToday.forEach(call => {
      categoryStats[call.spamCategory] = (categoryStats[call.spamCategory] || 0) + 1;
    });

    const stats = {
      callsBlockedToday: spamCallsToday.length,
      spamDetectedToday: spamCallsToday.length,
      reportsSubmitted: userReports.filter(report => report.timestamp >= today).length,
      totalNumbers: spamDatabase.size,
      weeklyTrends: generateWeeklyTrends(weekCalls),
      topSpamCategories: Object.entries(categoryStats)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateWeeklyTrends(weekCalls) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const trends = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    const dayCalls = weekCalls.filter(call => 
      call.timestamp >= dayStart && call.timestamp <= dayEnd
    );
    
    trends.push({
      day: days[date.getDay()],
      spam: dayCalls.filter(call => call.isSpam).length,
      normal: dayCalls.filter(call => !call.isSpam).length
    });
  }
  
  return trends;
}

// Block/unblock number
app.post('/api/block-number', (req, res) => {
  try {
    const { phoneNumber, action } = req.body; // action: 'block' or 'unblock'
    
    if (!phoneNumber || !action) {
      return res.status(400).json({ error: 'Phone number and action are required' });
    }

    if (action === 'block') {
      blockedNumbers.add(phoneNumber);
    } else if (action === 'unblock') {
      blockedNumbers.delete(phoneNumber);
    }

    res.json({
      success: true,
      message: `Number ${action}ed successfully`
    });
  } catch (error) {
    console.error('Error blocking/unblocking number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial data
  socket.emit('threat_intelligence', threatIntelligence);
  
  // Simulate periodic alerts
  const alertInterval = setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
      const alerts = [
        {
          id: `alert-${Date.now()}`,
          type: 'scam_alert',
          title: 'New Fraud Pattern Detected',
          message: 'Multiple reports of fake bank calls in your area',
          severity: 'medium',
          timestamp: new Date(),
          actionRequired: false
        },
        {
          id: `alert-${Date.now()}`,
          type: 'government_advisory',
          title: 'Government Advisory Update',
          message: 'New UPI fraud technique being used by scammers',
          severity: 'high',
          timestamp: new Date(),
          actionRequired: true
        }
      ];
      
      const alert = alerts[Math.floor(Math.random() * alerts.length)];
      socket.emit('live_alert', alert);
    }
  }, 30000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(alertInterval);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:3000`);
});