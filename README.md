# PiMatch - Pi Dating App 💜

Find love in the Pi Network with KYC verified profiles and Pi-powered premium features.

## 🚀 Features

- **KYC Verified Profiles** - Only authenticated Pi Network users
- **Pi-Powered Payments** - Premium features paid with Pi tokens
- **Modern Swipe Interface** - Tinder-style card swiping
- **Real-time Matching** - Instant match notifications
- **Progressive Web App** - Install on mobile devices
- **Pi Browser Optimized** - Perfect for Pi Network ecosystem

## 🏆 Pi Hackathon 2025 Entry

This project is submitted to the Pi Hackathon 2025 - building real-world utility for Pi Network's 47M+ users.

## 💰 Premium Features

- **Super Like** (5π) - Stand out from the crowd
- **Profile Boost** (10π) - Increased visibility for 1 hour  
- **Who Viewed Me** (15π) - See your secret admirers
- **Unlimited Swipes** (20π/month) - No daily limits

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **PWA** - Offline support and mobile installation

## 📱 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pimatch-app.git
cd pimatch-app
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 🔧 Pi SDK Integration

For production, replace mock functions in `app/page.tsx`:

```typescript
// Pi Authentication
const connectPi = async () => {
  const scopes = ['payments', 'wallet_address'];
  const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
  setCurrentUser(authResult.user);
};

// Pi Payments
const makePiPayment = async (amount, feature) => {
  const payment = await window.Pi.createPayment({
    amount: amount,
    memo: `PiMatch ${feature}`,
    metadata: { feature, userId: currentUser.id }
  });
  return payment;
};
```

## 🎨 Design System

### Colors
- **Pi Purple**: `#7c3aed` - Primary brand color
- **Pi Gold**: `#fbbf24` - Accent color for Pi tokens
- **Gradients**: Purple to pink for modern feel

### Typography
- **Font**: Inter (clean, modern)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

## 📂 Project Structure

```
pimatch-app/
├── app/
│   ├── page.tsx          # Main app component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service worker
│   └── icons/           # App icons
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🔒 Privacy & Security

- End-to-end message encryption
- Minimal data collection
- GDPR compliant
- User data ownership
- Safe meetup guidelines

## 🚀 Roadmap

### Phase 1: MVP (Pi Hackathon)
- [x] Basic swipe interface
- [x] Pi authentication simulation
- [x] Premium features with Pi payments
- [x] PWA functionality
- [x] Mobile-responsive design

### Phase 2: Enhanced Features
- [ ] Real-time chat system
- [ ] Video calling
- [ ] Advanced matching algorithm
- [ ] Photo verification
- [ ] Event organization

### Phase 3: Scale & Growth
- [ ] AI-powered matching
- [ ] Global expansion
- [ ] Community features
- [ ] Merchant partnerships

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Email**: contact@pimatch.app
- **Pi Network**: @pimatch
- **Twitter**: @pimatch_app

## 🏆 Pi Hackathon 2025

**Theme**: Real-world Pi utility
**Goal**: Connect 47M+ Pi users through authentic dating
**Prize**: Competing for 160,000 Pi tokens

---

Built with ❤️ for the Pi Network community