# E-Commerce Development Startup Protocol

Initialize development environment for the e-commerce platform.

## STARTUP SEQUENCE

### Environment Check
- Verify Docker services (PostgreSQL, Redis) are running
- Check backend Medusa.js server status
- Verify frontend Next.js development server
- Confirm environment variables are properly configured

### Project Status
📊 E-COMMERCE STARTUP STATUS
├─ BACKEND: Medusa.js on :9000
├─ FRONTEND: Next.js on :3000  
├─ DATABASE: PostgreSQL via Docker
├─ CACHE: Redis via Docker
└─ STATUS: Development environment ready

## Available Development Commands

### Backend Commands
```bash
docker-compose up -d     # Start PostgreSQL and Redis
cd backend && npm run dev     # Start Medusa backend server
cd backend && npm run seed    # Populate with sample products
```

### Frontend Commands  
```bash
cd frontend && npm run dev    # Start Next.js development server
cd frontend && npm run build  # Build for production
cd frontend && npm run lint   # Run ESLint
```

### Testing Commands
```bash
cd backend && npm run test:unit                    # Unit tests
cd backend && npm run test:integration:http        # HTTP integration tests
cd backend && npm run test:integration:modules     # Module integration tests
```

## Common Development Tasks

### Adding New Products
1. Use the seed script: `npm run seed` in backend directory
2. Or add via admin dashboard at http://localhost:7001
3. Products will appear in frontend automatically via Medusa API

### Cart Development
- Cart state managed by React Context in `frontend/src/lib/medusa/cart-context.tsx`
- Uses React Query for server state management
- Persistent cart via localStorage

### AI Assistant Development
- Placeholder API at `frontend/src/app/api/ai/route.ts`
- Ready for integration with AI services (OpenAI, Anthropic, etc.)
- Used by ProductAssistant component

## Environment Setup
Ensure these variables are configured:
- Backend: `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `STRIPE_API_KEY`
- Frontend: `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, Stripe and Supabase keys