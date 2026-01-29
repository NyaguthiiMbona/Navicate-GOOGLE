Navicate

Navicate is a career navigation and role-mapping web application designed to help users explore realistic career paths, role progressions, and skill expectations across different career stages including fresh graduates and mid-career professionals.

The platform emphasizes clarity, output discipline, and trust. It avoids generic advice and instead focuses on structured, role-based guidance that users can actually act on.

Features

Career path exploration by role and experience level

Clear differentiation between fresh graduate and mid-career pathways

Role confidence indicators and realistic timelines

CV and cover letter guidance with strict output rules

Clean, fast frontend built with modern tooling

Designed for international users

Tech Stack

React

TypeScript

Vite

CSS Modules

Google Gemini API (for AI-assisted outputs)

Project Structure
src/
├── components/        # Reusable UI components
├── pages/             # Application pages
├── services/          # API and logic services
├── data/              # Static role and path data
├── App.tsx            # App entry
├── main.tsx           # Vite entry point

Getting Started
Prerequisites

Node.js (v18 or later recommended)

npm or pnpm

Installation

Clone the repository:

git clone https://github.com/NyaguthiiMbona/Navicate-GOOGLE.git
cd Navicate-GOOGLE


Install dependencies:

npm install


or

pnpm install

Environment Variables

Create a .env.local file in the root directory and add:

VITE_GEMINI_API_KEY=your_api_key_here


Do not commit this file to GitHub.

Run Locally
npm run dev


The app will be available at:

http://localhost:5173

Build for Production
npm run build


The production build will be generated in the dist directory.

Deployment

Navicate is designed to be deployed on static hosting platforms such as:

Vercel

Netlify

Set the required environment variables in your hosting provider’s dashboard before deploying.

SEO and Analytics

SEO metadata is handled within the application and is designed to be extended during migration. Analytics can be added post-deployment once traffic patterns are established.

Security Notes

API keys must never be committed to the repository.

All AI outputs are governed by strict prompt rules to prevent verbosity and hallucinations.

License

MIT License

Status

This project is in active development and is undergoing final migration, SEO wiring, and monetization setup.
