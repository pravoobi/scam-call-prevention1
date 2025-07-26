# FraudGuard - Fraud Awareness eLearning Platform

An interactive eLearning platform designed to educate Indians about fraud prevention and awareness. Built with React, TypeScript, and modern web technologies.

## 🛡️ About FraudGuard

FraudGuard is a comprehensive fraud awareness platform that uses interactive scenarios and decision-based learning to help users identify and prevent common scams targeting Indians. The platform covers major fraud types including UPI fraud, bank impersonation, KYC scams, and more.

## ✨ Features

### Core Learning Features
- **Interactive Scenario Engine**: Branching storyline system with decision trees
- **6 Specialized Modules**: UPI Fraud, Bank Impersonation, KYC Scams, Aadhaar/PAN Fraud, Loan Scams, Digital Arrest
- **Real-time Feedback**: Immediate consequences and explanations for choices
- **Adaptive Scoring**: Dynamic assessment based on user choices and learning progress
- **Hint System**: Contextual assistance with progressive difficulty levels

### User Experience
- **Personalized Onboarding**: Risk assessment and custom learning paths
- **Progress Tracking**: Fraud awareness score, achievements, and streak counters
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Realistic Interface Mockups**: Authentic-looking replicas of UPI apps, SMS, emails
- **Gamification**: Badges, achievements, and score-based progression

### Technical Features
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, Zustand
- **State Management**: Persistent user progress and settings
- **Routing**: Multi-page application with protected routes
- **Performance**: Optimized with code splitting and lazy loading
- **Accessibility**: Screen reader support and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fraud-awareness-elearning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📱 Usage

### Getting Started
1. **Onboarding**: Complete the 5-step onboarding process
   - Personal information (optional)
   - Banking habits selection
   - Risk level assessment
   
2. **Learning Modules**: Access fraud awareness modules
   - Start with UPI Fraud Protection (beginner-friendly)
   - Progress through increasingly complex scenarios
   
3. **Interactive Scenarios**: 
   - Read the scenario context
   - Make decisions at critical moments
   - Receive immediate feedback and explanations
   - Track your fraud awareness score

### Navigation
- **Home**: Dashboard with progress overview and recommendations
- **Modules**: Browse and access all learning modules
- **Profile**: View progress, achievements, and settings

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── Layout.tsx      # Main layout component
│   └── LoadingScreen.tsx
├── pages/              # Page components
│   ├── HomePage.tsx    # Dashboard
│   ├── ModulesPage.tsx # Module browser
│   ├── ScenarioPage.tsx# Interactive learning
│   ├── ProfilePage.tsx # User profile
│   └── OnboardingPage.tsx
├── store/              # State management
│   └── appStore.ts     # Zustand store
├── types/              # TypeScript definitions
│   └── index.ts
├── data/               # Static data and content
│   └── modules.ts      # Learning module definitions
├── lib/                # Utility functions
│   └── utils.ts
└── main.tsx           # Application entry point
```

## 🎯 Learning Modules

### Phase 1 (MVP) - Available Now
1. **UPI Fraud Protection** - Learn to identify fake cashback calls and payment manipulation
2. **Bank Impersonation Detection** - Recognize fake bank representatives
3. **KYC Scam Prevention** - Distinguish legitimate vs fraudulent KYC requests

### Phase 2 (Planned)
4. **Aadhaar/PAN Fraud Alerts** - Protect identity documents from fraud
5. **Loan/Credit Card Scam Detection** - Identify fake loan offers on social media
6. **Digital Arrest Scam Protection** - Recognize authority impersonation

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, CSS-in-JS
- **State Management**: Zustand with persistence
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Fetching**: TanStack Query (ready for API integration)

## 📊 Features in Detail

### Interactive Scenario Engine
- Branching storylines with multiple outcomes
- Decision trees with realistic consequences
- Character dialogue system with typing animations
- Visual story representation (chat bubbles, call interfaces)
- Choice timer for pressure simulation
- Retry mechanism with progressive hints

### Scoring System
- Base score calculated from correct choices
- Hint usage penalty system
- Time-based bonuses
- Risk level improvement tracking
- Achievement unlock conditions

### Progress Tracking
- Fraud Awareness Score (0-100 scale)
- Module completion tracking
- Time spent learning
- Achievement badges
- Learning streak counters

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Colors**: Primary blue theme with semantic colors for success, warning, danger
- **Typography**: System font stack with clear hierarchy
- **Components**: Consistent spacing, border radius, and shadow patterns
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design with breakpoint-aware layouts

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any environment-specific configuration:

```env
VITE_APP_TITLE=FraudGuard
VITE_API_URL=http://localhost:8000/api
```

### Tailwind Configuration
The design system is configured in `tailwind.config.js` with:
- Custom color palette
- Extended animations
- Responsive breakpoints
- Custom utility classes

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Serve the dist/ folder with any static hosting service
```

## 🤝 Contributing

We welcome contributions to improve FraudGuard! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Ensure responsive design
- Test on multiple devices
- Follow accessibility guidelines

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Emergency Contacts

If you encounter fraud in real life:
- **Cybercrime Helpline**: 1930
- **Banking Fraud**: Contact your bank immediately
- **UPI Fraud**: Block UPI ID in your app

## 🙏 Acknowledgments

- Indian Computer Emergency Response Team (CERT-In) for fraud awareness guidelines
- Reserve Bank of India (RBI) for banking security best practices
- Real fraud victims who shared their experiences (anonymized)

## 📈 Roadmap

### Version 2.0
- **Multilingual Support**: Hindi, Tamil, Telugu, Bengali
- **Voice Navigation**: Audio-only learning mode
- **Community Features**: User forums and experience sharing
- **Advanced Analytics**: Learning pattern analysis
- **Offline Mode**: Downloadable content for offline learning

### Version 3.0
- **AI-Powered Scenarios**: Dynamic scenario generation
- **Integration APIs**: Bank app integration for real-time alerts
- **Enterprise Features**: Corporate training modules
- **Regional Customization**: State-specific fraud patterns

---

**Stay Safe, Stay Informed with FraudGuard! 🛡️** 
