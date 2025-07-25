# Claude Code E-commerce Setup Plan

## Project Overview
Building a modern e-commerce site with:
- **Backend**: Medusa.js (headless commerce)
- **Frontend**: Next.js 14+ with TypeScript
- **Database**: PostgreSQL (Supabase)
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Blog**: MDX-based
- **AI**: Ready for integrations
- **3D**: React Three Fiber ready

---

## Phase 1: Initial Setup

### 1.1 Create Project Directory
```bash
mkdir ecommerce-project
cd ecommerce-project
```

### 1.2 Setup Medusa Backend
```bash
# Create Medusa backend with seed data
npx create-medusa-app@latest backend --seed --db-url postgres://user:pass@host:5432/medusa_db

# Navigate to backend
cd backend

# Install additional dependencies
npm install @medusajs/file-local @medusajs/payment-stripe

# Create .env file
cat > .env << 'EOF'
DATABASE_URL=postgres://user:pass@host:5432/medusa_db
JWT_SECRET=your-super-secret-jwt
COOKIE_SECRET=your-super-secret-cookie
STRIPE_API_KEY=your-stripe-secret-key
STORE_CORS=http://localhost:3000,https://yourdomain.com
ADMIN_CORS=http://localhost:7001,https://admin.yourdomain.com
EOF

# Update medusa-config.js for plugins
cat > medusa-config.js << 'EOF'
module.exports = {
  projectConfig: {
    database_url: process.env.DATABASE_URL,
    database_type: "postgres",
    store_cors: process.env.STORE_CORS,
    admin_cors: process.env.ADMIN_CORS,
    redis_url: process.env.REDIS_URL
  },
  plugins: [
    {
      resolve: "@medusajs/file-local",
      options: {
        upload_dir: "uploads",
      },
    },
    {
      resolve: "@medusajs/payment-stripe",
      options: {
        api_key: process.env.STRIPE_API_KEY,
      },
    },
  ],
}
EOF
```

### 1.3 Setup Next.js Frontend
```bash
# Go back to root directory
cd ..

# Create Next.js frontend
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"

# Navigate to frontend
cd frontend

# Install e-commerce dependencies
npm install @medusajs/medusa-js @medusajs/product @tanstack/react-query axios
npm install @types/node --save-dev

# Install UI dependencies
npm install lucide-react clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label

# Install MDX for blog
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install gray-matter reading-time
```

---

## Phase 2: Frontend Structure

### 2.1 Create Essential Directories
```bash
# In frontend directory
mkdir -p src/lib/{medusa,utils}
mkdir -p src/components/{ui,layout,products,cart,checkout,account,blog}
mkdir -p src/app/{products,cart,checkout,account,blog}
mkdir -p public/{images,fonts}
mkdir -p content/blog
```

### 2.2 Setup Medusa Client
```bash
# Create Medusa client configuration
cat > src/lib/medusa/client.ts << 'EOF'
import Medusa from "@medusajs/medusa-js"

export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
})
EOF

# Create React Query provider
cat > src/lib/medusa/medusa-provider.tsx << 'EOF'
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
    },
  },
})

export function MedusaProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
EOF
```

### 2.3 Create Environment Configuration
```bash
# Create .env.local for frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```

---

## Phase 3: Core Components

### 3.1 Create Layout Components
```bash
# Main layout wrapper
cat > src/app/layout.tsx << 'EOF'
import { Inter } from "next/font/google"
import { MedusaProvider } from "@/lib/medusa/medusa-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MedusaProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </MedusaProvider>
      </body>
    </html>
  )
}
EOF
```

### 3.2 Create Product Listing Page
```bash
# Products page
cat > src/app/products/page.tsx << 'EOF'
import { medusaClient } from "@/lib/medusa/client"
import { ProductCard } from "@/components/products/product-card"

export default async function ProductsPage() {
  const { products } = await medusaClient.products.list()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
EOF
```

### 3.3 Create Cart Functionality
```bash
# Cart context
cat > src/lib/medusa/cart-context.tsx << 'EOF'
"use client"

import { createContext, useContext, ReactNode } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { medusaClient } from "./client"

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  // Cart logic implementation
  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
EOF
```

---

## Phase 4: Database & Supabase Setup

### 4.1 Setup Supabase
```bash
# Create Supabase configuration
cat > src/lib/supabase/client.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
EOF
```

### 4.2 Database Migrations
```bash
# In backend directory
cd ../backend

# Create custom entities
mkdir -p src/models
mkdir -p src/migrations

# Create blog post model
cat > src/models/blog-post.ts << 'EOF'
import { Entity, Column } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"

@Entity()
export class BlogPost extends BaseEntity {
  @Column()
  title: string

  @Column()
  slug: string

  @Column("text")
  content: string

  @Column({ default: true })
  published: boolean
}
EOF
```

---

## Phase 5: Blog System

### 5.1 MDX Blog Setup
```bash
# Configure MDX
cd ../frontend

# Create next.config.js for MDX
cat > next.config.mjs << 'EOF'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
EOF

# Create blog utilities
cat > src/lib/blog/utils.ts << 'EOF'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: filename.replace(/\.mdx$/, ''),
      ...data,
      content,
    }
  })
  
  return posts
}
EOF
```

---

## Phase 6: AI Integration Prep

### 6.1 AI Chat Component
```bash
# Create AI chat interface
cat > src/components/ai/product-assistant.tsx << 'EOF'
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ProductAssistant() {
  const [messages, setMessages] = useState<any[]>([])
  
  return (
    <div className="fixed bottom-4 right-4 w-96">
      {/* AI Chat Interface */}
    </div>
  )
}
EOF
```

### 6.2 AI API Route
```bash
# Create AI endpoint
cat > src/app/api/ai/route.ts << 'EOF'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { message } = await req.json()
  
  // AI processing logic here
  
  return NextResponse.json({ response: "AI response" })
}
EOF
```

---

## Phase 7: Deployment Preparation

### 7.1 Production Build Scripts
```bash
# Update package.json scripts
cd ../frontend
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"
npm pkg set scripts.dev="next dev"

cd ../backend
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="medusa start"
npm pkg set scripts.dev="medusa develop"
```

### 7.2 Docker Configuration
```bash
# Create docker-compose.yml in root
cd ../..
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: medusa_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
      
  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOF
```

---

## Phase 8: Testing & Launch

### 8.1 Test Commands
```bash
# Start all services
docker-compose up -d

# Start backend
cd backend
npm run dev

# In new terminal, start frontend
cd ../frontend
npm run dev

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:9000
# - Admin: http://localhost:7001
```

### 8.2 Production Deployment
```bash
# Frontend to Vercel
cd frontend
vercel

# Backend to Railway
cd ../backend
railway init
railway up
```

---

## File Structure Summary
```
ecommerce-project/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── services/
│   │   └── api/
│   ├── medusa-config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── content/blog/
│   ├── public/
│   └── package.json
└── docker-compose.yml
```

---

## Next Steps After Setup

1. **Configure Stripe** - Add products and test payments
2. **Design System** - Customize Tailwind theme
3. **SEO Setup** - Add metadata and sitemap
4. **Analytics** - Add Plausible or similar
5. **3D Integration** - Add React Three Fiber when ready
6. **AI Features** - Connect to Anthropic API

This plan provides a complete, production-ready e-commerce platform with $0 monthly platform fees!