# Repix.art v2.0

**The Next-Gen AI Creative Studio**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🚀 Introduction

**Repix.art** is a cutting-edge AI photo editing and generation platform designed to cater to a wide range of creators, from casual users to professional designers and freelancers.

Built with a **dark-mode first** aesthetic featuring glassmorphism and neon accents, Repix.art offers a seamless experience that adapts to the user's role:

- **Casual Mode:** Simplified "Magic" tools for instant results.
- **Pro Mode:** Granular controls, batch processing, and advanced workflows.
- **Freelancer Mode:** Integrated project management and client delivery tools.

## ✨ Key Features

### 🎨 Creative Tools

- **Auto Enhance:** Instantly improve lighting and color with AI.
- **AI Remix:** Transform photos into artistic styles (Cyberpunk, Anime, Oil Painting, etc.).
- **AI Generator:** Text-to-image generation engine.
- **AI Avatars:** Create trendy, personalized avatars.
- **Smart Backgrounds:** One-click background removal and replacement.

### 🛠️ Professional Workflows

- **Dual-Role Interface:** Switch between simplified and advanced interfaces.
- **Advanced Editor:** Curves, levels, masking, and detailed parameter controls.
- **Batch Operations:** Process multiple images simultaneously.
- **Project Management:** Dedicated tools for freelancers to manage client projects and reviews.
- **Auto-Albums & Sync:** Smart organization and cloud synchronization.

### 💎 Ecosystem

- **Marketplace:** Community-crafted templates and assets.
- **Credit System:** Flexible monetization for high-compute tasks.
- **Upsell Engine:** Smart "Show & Lock" features to drive conversions.

## 🏗️ Architecture

Repix.art follows a **Modified Feature-Sliced Design** to handle its multi-role nature efficiently:

- **`features/`**: Domain-specific logic and UI components that are role-agnostic (e.g., auth, notifications).
- **`roles/`**: Composed pages and logic specific to each user persona (Casual, Pro, Freelancer).
  - _Casual:_ Focus on wizards and simple sliders.
  - _Pro:_ Focus on dense toolbars and data-heavy views.
- **`shared/`**: Global design system (GlassUI), utilities, and icons.
- **`services/`**: Data layer and mock services.

## 💻 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla CSS approach)
- **Animations:** Framer Motion & Tailwind Animate
- **Icons:** Custom SVG System (No external icon libraries in runtime)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/repix-art.git
   cd repix.art
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy `.env.example` to `.env.local` (if applicable) and configure your API keys.
   _(Note: The current version uses mock services for demonstration)_

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` to view the app.

## 📂 Project Structure

```text
/
├── features/                 # Shared domain logic (Auth, Profile, etc.)
├── roles/                    # Role-specific composition
│   ├── casual/               # Simplified UI for everyday users
│   ├── pro/                  # Advanced tools for power users
│   ├── freelancer/           # Project management for agencies
├── shared/                   # Design system and global utilities
├── services/                 # Mock data and API services
├── App.tsx                   # Main component logic
└── main.tsx                  # Entry point
```

## 📜 License

This project is proprietary. All rights reserved.
