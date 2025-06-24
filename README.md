# Sommaire

**Transform PDFs into beautiful, impactful summaries with the power of AI**

Built with Next.js 15, Clerk Auth, OpenAI GPT-4, and modern web technologies for a seamless PDF summarization experience.

## ✨ Features

### 🔧 Core Technologies

- **Next.js 15 App Router** - Server-side rendering, routing, and API endpoints with Server Components
- **React** - Interactive user interfaces with reusable components
- **Clerk** - Secure authentication with Passkeys, GitHub, and Google Sign-in
- **OpenAI GPT-4** - AI-powered summarization with contextual understanding and emoji-enhanced output
- **Langchain** - PDF parsing, text extraction, and document chunking
- **ShadCN UI** - Accessible, customizable React components
- **NeonDB (PostgreSQL)** - Serverless database for summaries and user data
- **UploadThing** - Secure PDF uploads (up to 32MB) and file management
- **Stripe** - Subscription management and secure payment processing
- **TypeScript** - Static typing and enhanced development experience
- **Tailwind CSS 4** - Utility-first, responsive styling

### 🚀 Application Features

- **📝 Smart Summaries** - Clear, structured summaries with key points and insights
- **🖥️ Interactive Viewer** - Beautiful summary viewer with progress tracking
- **🔒 Secure Processing** - Protected file handling and processing
- **🔐 Authentication** - Protected routes and API endpoints
- **💸 Flexible Pricing** - Basic and Pro subscription plans
- **🔗 Webhook Integration** - Stripe event handling
- **👤 User Dashboard** - Manage and organize summaries
- **📱 Responsive Design** - Optimized for mobile and desktop
- **🔄 Real-time Updates** - Live processing status and path revalidation
- **🔔 Smart Notifications** - Toast notifications for uploads, processing, and errors
- **⚡ Performance Optimized** - Fast loading and efficient processing
- **🔍 SEO-Friendly** - Optimized summary generation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Fork and Clone**

   ```bash
   # Fork this repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/sommaire.git
   cd sommaire
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**

   Edit `.env.local` with your credentials:

   ```env
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # UploadThing
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # NeonDB
   DATABASE_URL=your_neondb_connection_string
   ```

5. **Run Development Server**

   ```bash
   npm run dev
   ```

6. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📦 Required Services

### Authentication - [Clerk](https://go.clerk.com/5q0WrFA)

- Sign up for Clerk account
- Create new application
- Configure authentication providers (GitHub, Google, Passkeys)
- Copy API keys to environment variables

### AI Processing - [OpenAI](https://openai.com)

- Create OpenAI account
- Generate API key with GPT-4 access
- Add to environment variables

### File Upload - [UploadThing](https://uploadthing.com)

- Create UploadThing account
- Set up file upload configuration
- Configure PDF upload settings (32MB limit)

### Payments - [Stripe](https://stripe.com)

- Create Stripe account
- Set up products and pricing
- Configure webhooks for subscription events

### Database - [NeonDB](https://neon.tech)

- Create NeonDB account
- Set up PostgreSQL database
- Copy connection string

## 🏗️ Project Structure

```
sommaire/
├── app/                    # Next.js 15 App Router
├── components/             # Reusable React components
├── lib/                    # Utility functions and configurations
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Clerk](https://go.clerk.com/5q0WrFA) for seamless authentication
- [OpenAI](https://openai.com) for powerful GPT-4 API
- [Langchain](https://js.langchain.com) for document processing
- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Next.js](https://nextjs.org) for the amazing framework
- [Vercel](https://vercel.com) for deployment platform

---

**Ready to transform your PDFs?** [Get started now](https://next-ai-saas-pdf.vercel.app/) 🚀
