# E-commerce Platform

A modern e-commerce platform built with Medusa.js, Next.js, and TypeScript.

## Features

- 🛒 **Shopping Cart**: Full cart functionality with add, remove, and quantity management
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Built with Tailwind CSS and Radix UI components
- 🤖 **AI Assistant**: Interactive shopping assistant powered by AI
- 📝 **Blog System**: MDX-powered blog with dynamic content
- 🔒 **Secure**: Ready for Stripe payments and Supabase authentication
- ⚡ **Fast**: Built with Next.js 14 and server-side rendering

## Tech Stack

### Backend
- **Medusa.js**: Headless commerce engine
- **PostgreSQL**: Database (via Supabase)
- **Node.js**: Runtime environment

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and caching
- **MDX**: Markdown with JSX for blog content

### Additional Services
- **Supabase**: Database and authentication
- **Stripe**: Payment processing
- **Docker**: Local development environment

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for local database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-Start
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:9000
   - Admin Dashboard: http://localhost:7001

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### Backend (.env)
```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa_db
JWT_SECRET=your-super-secret-jwt
COOKIE_SECRET=your-super-secret-cookie
STRIPE_API_KEY=your-stripe-secret-key
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:7001
```

## Project Structure

```
├── backend/                 # Medusa.js backend
│   ├── src/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── scripts/        # Utility scripts
│   └── medusa-config.ts    # Medusa configuration
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities and configurations
│   ├── content/           # MDX blog content
│   └── public/            # Static assets
└── docker-compose.yml     # Database services
```

## Development

### Backend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with sample data
```

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Features Overview

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Persistent cart state

### Product Catalog
- Product listing page
- Product detail pages
- Search and filtering (ready for implementation)

### Blog System
- MDX-powered blog posts
- Dynamic routing
- Responsive design

### AI Assistant
- Interactive chat interface
- Product recommendations
- Shopping assistance

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npx vercel
```

### Backend (Railway/Heroku)
```bash
cd backend
# Follow platform-specific deployment guides
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.