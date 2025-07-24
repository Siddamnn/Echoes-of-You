# 🎵 LyricLore - Echoes of You

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" />
  <img src="https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google AI" />
</div>

<div align="center">
  <h3>✨ Discover the poetry in your playlists ✨</h3>
  <p>An AI-powered music analytics platform that transforms your Spotify listening history into personalized poetry and visual insights.</p>
</div>

---

## 🌟 Features

### 🎭 **AI-Generated Poetry**

Transform your music taste into personalized poems using Google's Gemini AI. Get unique insights into your musical soul through creative verse.

### 📊 **Rich Music Analytics**

- **Top Artists & Tracks**: See your most played favorites
- **Recently Played**: Track your current listening habits
- **Genre Analysis**: Discover your musical DNA
- **Mood Cards**: Visual representation of your musical journey

### 🎨 **Beautiful UI/UX**

- Dark theme with elegant animations
- Responsive design for all devices
- Interactive waveform visualization
- Smooth transitions and hover effects

### 🔐 **Secure Authentication**

- OAuth 2.0 integration with Spotify
- Secure token management
- Privacy-focused (no data storage)

---

## 🚀 Live Demo

**[🌐 Try LyricLore Live](https://your-app-name.vercel.app)**

> _Connect your Spotify account and watch your music transform into poetry!_

---

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/1a1a1a/ffffff?text=LyricLore+Home+Page" alt="Home Page" />
  <p><em>🏠 Clean, modern landing page with Spotify authentication</em></p>
</div>

<div align="center">
  <img src="https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dashboard+with+AI+Poetry" alt="Dashboard" />
  <p><em>📊 Personalized dashboard with AI-generated poetry and music insights</em></p>
</div>

---

## 🛠️ Tech Stack

| Category            | Technology        | Purpose                          |
| ------------------- | ----------------- | -------------------------------- |
| **Frontend**        | Next.js 14        | React framework with App Router  |
| **Styling**         | Tailwind CSS      | Utility-first CSS framework      |
| **UI Components**   | shadcn/ui         | Beautiful, accessible components |
| **Language**        | TypeScript        | Type-safe development            |
| **Authentication**  | Spotify OAuth 2.0 | Secure user authentication       |
| **AI/ML**           | Google Gemini AI  | Poetry and content generation    |
| **Deployment**      | Vercel            | Serverless hosting platform      |
| **API Integration** | Spotify Web API   | Music data and analytics         |

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Spotify Developer Account
- Google AI API Key (optional, for AI features)

### 1. Clone the Repository

```bash
git clone https://github.com/Siddamnn/Echoes-of-You.git
cd Echoes-of-You
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Spotify API Configuration
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REDIRECT_URI="http://localhost:9002/api/auth/callback/spotify"

# Next.js Public Variables (Client-side accessible)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID="your_spotify_client_id"
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI="http://localhost:9002/api/auth/callback/spotify"

# Session Security
AUTH_SECRET="your_random_secret_key"

# AI Configuration (Optional)
GEMINI_API_KEY="your_gemini_api_key"
```

### 4. Spotify App Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new app or use existing one
3. Add redirect URI: `http://localhost:9002/api/auth/callback/spotify`
4. Copy Client ID and Client Secret to your `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser! 🎉

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Configure environment variables

3. **Environment Variables for Production**
   Add these in Vercel dashboard:

   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback/spotify
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
   NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback/spotify
   AUTH_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_key
   ```

4. **Update Spotify App Settings**
   - Add production redirect URI in Spotify Developer Dashboard
   - `https://your-app.vercel.app/api/auth/callback/spotify`

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── dashboard/         # Protected dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── DashboardClient.tsx
│   ├── SpotifyLoginButton.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── spotify.ts        # Spotify API integration
│   └── utils.ts          # Helper functions
├── ai/                   # AI/ML integration
│   └── flows/            # Genkit flows
└── hooks/                # Custom React hooks
```

---

## 🎯 Key Features Explained

### 🎼 Music Data Analysis

LyricLore analyzes your Spotify data to provide insights into:

- **Listening Patterns**: When and what you listen to
- **Musical Evolution**: How your taste changes over time
- **Genre Distribution**: Your musical preferences breakdown
- **Artist Affinity**: Your connection to different artists

### 🤖 AI Poetry Generation

Using Google's Gemini AI, the app creates personalized poems based on:

- Your top artists and tracks
- Recent listening history
- Favorite genres and moods
- Musical patterns and preferences

### 🔒 Privacy & Security

- **No Data Storage**: Your Spotify data is never permanently stored
- **Secure Authentication**: OAuth 2.0 with proper token management
- **Session Management**: Secure cookie-based sessions
- **HTTPS Enforcement**: All production traffic encrypted

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add proper error handling
- Update documentation for new features
- Test your changes thoroughly

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Spotify** for their excellent Web API
- **Google** for Gemini AI capabilities
- **Vercel** for seamless deployment
- **shadcn/ui** for beautiful UI components
- **Next.js** team for the amazing framework

---

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/Siddamnn/Echoes-of-You/issues)
- **Discussions**: [Join the community](https://github.com/Siddamnn/Echoes-of-You/discussions)

---

<div align="center">
  <h3>🌟 If you found this project helpful, please give it a star! 🌟</h3>
  <p>Made with ❤️ by <a href="https://github.com/Siddamnn">Siddamnn</a></p>
</div>
