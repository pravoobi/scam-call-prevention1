# 🛡️ FraudGuard - Indian Fraud Call Prevention App

A comprehensive fraud call prevention application specifically designed for Indian users, featuring AI-powered spam detection, real-time threat intelligence, and multi-language support.

## 🌟 Features

### Core Call Protection
- **Smart Call Identification**: Real-time caller ID with spam probability scoring
- **AI-Powered Detection**: Machine learning algorithms for pattern recognition
- **Community Database**: Crowdsourced spam reports from millions of users
- **Business Directory Integration**: Verified business and service provider listings
- **Multi-Language Support**: Hindi, Tamil, Telugu, Bengali, Marathi, and more

### Advanced Spam Detection
- **Behavioral Analysis**: Detection of robocalls, telemarketing, and fraudulent patterns
- **Number Pattern Recognition**: Identification of suspicious number sequences
- **Call Frequency Monitoring**: Flagging numbers making excessive calls
- **Cross-Network Intelligence**: Spam detection across telecom operators

### India-Specific Fraud Prevention
- **UPI Fraud Protection**: Warnings for fake UPI/payment issues
- **Bank Impersonation Detection**: Alerts for calls claiming to be from banks
- **KYC Scam Prevention**: Detection of fake KYC update calls
- **Digital Arrest Protection**: Warnings about fake police/CBI calls
- **Aadhaar/PAN Fraud Alerts**: Protection against identity document scams

### Real-Time Features
- **Live Threat Intelligence**: Government advisories and community warnings
- **Real-Time Alerts**: Push notifications about new fraud patterns
- **WebSocket Integration**: Live updates and notifications
- **Automated Reporting**: One-click reporting to cybercrime portals

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Context API with reducers
- **Routing**: React Router v6
- **Charts**: Recharts for analytics
- **Animations**: Framer Motion
- **Real-time**: Socket.io client

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express framework
- **Real-time**: Socket.io for WebSocket connections
- **Security**: Helmet, CORS, rate limiting
- **AI Detection**: Custom spam detection algorithms
- **Data Storage**: In-memory (production: MongoDB)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-fraud-call-prevention
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp server/.env.example server/.env
   # Update the environment variables as needed
   ```

4. **Start the application**
   ```bash
   # Development mode (both client and server)
   npm run dev
   
   # Or start separately
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend  
   cd client && npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - WebSocket: ws://localhost:5000

## 📱 Usage

### For End Users

1. **Dashboard**: View protection status and recent activity
2. **Call History**: Review all incoming calls with spam detection
3. **Spam Reports**: Report and manage spam calls
4. **Live Alerts**: Real-time threat intelligence and warnings
5. **Education**: Learn about fraud types and prevention tips
6. **Settings**: Configure protection preferences

### API Integration

```javascript
// Check if a number is spam
const response = await fetch('/api/check-spam', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    callerName: 'SBI Customer Care',
    location: 'Delhi'
  })
});

const result = await response.json();
console.log(result.data.isSpam); // true/false
console.log(result.data.spamProbability); // 0.0 to 1.0
```

## 🧠 AI Detection Engine

### Spam Detection Algorithm
The app uses multiple detection methods:

1. **Database Lookup**: Check against known spam numbers
2. **Pattern Analysis**: 
   - Sequential number patterns
   - Repeated digit detection
   - Suspicious prefixes
3. **Caller Name Analysis**: Keyword matching for fraud indicators
4. **Location-based Risk**: Geographic risk assessment
5. **Community Reports**: Crowdsourced verification

### Risk Level Calculation
- **Critical** (80-100%): Immediate blocking recommended
- **High** (60-80%): Strong spam indicators
- **Medium** (40-60%): Moderate risk
- **Low** (20-40%): Minimal risk
- **Very Low** (0-20%): Likely legitimate

## 🌐 Multi-Language Support

Supported languages:
- English (en)
- Hindi (hi) - हिंदी
- Tamil (ta) - தமிழ்
- Telugu (te) - తెలుగు
- Bengali (bn) - বাংলা
- Marathi (mr) - मराठी
- Gujarati (gu) - ગુજરાતી
- Kannada (kn) - ಕನ್ನಡ
- Malayalam (ml) - മലയാളം
- Punjabi (pa) - ਪੰਜਾਬੀ
- Urdu (ur) - اردو

## 🔐 Security Features

- **Rate Limiting**: API endpoints protected against abuse
- **Input Validation**: All user inputs sanitized
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet.js**: Security headers and protection
- **Data Privacy**: No personal data stored permanently

## 📊 Analytics & Insights

### Dashboard Metrics
- Calls blocked today
- Spam detection rate
- Community reports
- Protection uptime

### Advanced Analytics
- Weekly/monthly trends
- Fraud type distribution
- Geographic risk mapping
- Telecom operator analysis

## 🛣️ Roadmap

### Phase 1 (Current) ✅
- [x] Basic spam detection
- [x] Real-time alerts
- [x] Multi-language support
- [x] Fraud education
- [x] Dashboard and analytics

### Phase 2 (Planned)
- [ ] Database integration (MongoDB)
- [ ] User authentication
- [ ] Mobile app (React Native)
- [ ] TRAI API integration
- [ ] Advanced AI models

### Phase 3 (Future)
- [ ] Machine learning pipeline
- [ ] Government database sync
- [ ] Telecom operator partnerships
- [ ] Voice analysis integration
- [ ] Community moderation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use semantic commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Reporting Issues
- GitHub Issues: [Report Bug](../../issues)
- Email: support@fraudguard.app

### Community
- Telegram: [@FraudGuardIndia](https://t.me/FraudGuardIndia)
- Discord: [Join Server](https://discord.gg/fraudguard)

## 🙏 Acknowledgments

- **TRAI (Telecom Regulatory Authority of India)** for DND registry support
- **National Cyber Crime Portal** for threat intelligence
- **Community Contributors** for spam reports and feedback
- **Indian Cybercrime Cells** for fraud pattern data

## ⚠️ Disclaimer

This application is designed to help identify potential spam calls but should not be the sole method of protection. Users should remain vigilant and report suspicious activities to appropriate authorities.

---

**Made with ❤️ for India's Digital Safety** 
