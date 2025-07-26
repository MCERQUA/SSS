# Component Index - Sweat Shop Swag

**⚠️ MANDATORY: Always check this index before creating new components!**

## Quick Reference

### Available Component Categories
- [Layout Components](#layout-components) - Headers, footers, navigation
- [Section Components](#section-components) - Page sections, heroes, CTAs
- [UI Components](#ui-components) - Buttons, cards, basic elements
- [Form Components](#form-components) - Contact forms, quote requests
- [Business Components](#business-components) - NFC, decals, services
- [Shared Components](#shared-components) - Highly reusable elements

---

## Layout Components
*Navigation, headers, footers - used across all pages*

### Currently Available:
- ✅ `Header` - Modern responsive navigation with red/black theme, scroll effects, mobile menu (Used: All pages)
- ✅ `Footer` - Comprehensive site footer with company info, navigation links, and social media (Used: All pages)

### Still Needed:
- [ ] `Navigation` - Standalone navigation component (if needed)

---

## Section Components
*Hero sections, CTAs, content blocks*

### Currently Available:
- ✅ `HeroSection` - Modern hero with 6 variants (home, nfc-technology, decals, about, contact, blog), animations, gradient backgrounds
- ✅ `CTASection` - Flexible call-to-action component with 5 variants (default, gradient, minimal, contact, urgent) and 3 themes
- ✅ `ContactSection` - Reusable contact info display with animations, hover effects, and customizable content

### Still Needed:
- [ ] `ServicesOverview` - Service showcase grid
- [ ] `TestimonialsSection` - Customer reviews and testimonials

---

## UI Components
*Basic reusable elements*

### Currently Available:
- ✅ `Button` - 6 variants (primary, secondary, accent, outline, ghost, destructive), loading states, icons, modern animations
- ✅ `Card` - 6 variants (default, primary, dark, accent, glass, outlined), subcomponents (Header, Title, Content, Footer)
- ✅ `QuoteModal` - Modern modal popup with backdrop blur, animations, ESC/backdrop close, mobile responsive

### Still Needed:
- [ ] `Badge` - Status indicators and labels
- [ ] `Loader` - Loading states and spinners

---

## Form Components
*Contact forms, quote requests, user input*

### Currently Available:
- ✅ `ContactForm` - Netlify-enabled form with 3 variants (contact, quote, newsletter), validation, success states
- ✅ `QuoteModal` - Modal popup quote form with Netlify integration, pre-fill support, modern animations

### Still Needed:
- [ ] `FormField` - Standalone reusable input fields
- [ ] `FormButton` - Form-specific buttons (if needed beyond Button component)

---

## Business Components
*Sweat Shop Swag specific functionality*

### Currently Available:
- **None yet** - Need to create business components

### NFC Components Needed:
- [ ] `NFCShowcase` - Interactive NFC technology demo
- [ ] `NFCBenefits` - List of NFC advantages
- [ ] `NFCProcess` - How NFC integration works

### Decal Components Needed:
- [ ] `DecalGallery` - UV DTF decal examples
- [ ] `DecalFeatures` - Durability and quality highlights
- [ ] `DecalOrdering` - Different ordering options display

### Service Components Needed:
- [ ] `ServiceCard` - Individual service display
- [ ] `ProcessSteps` - Step-by-step process explanation
- [ ] `PricingDisplay` - Pricing tiers and options

---

## Context & State Management
*Global state providers and hooks*

### Currently Available:
- ✅ `ModalContext` - Global modal state management with useModal hook
- ✅ `CartContext` - Shopping cart state and operations (via Medusa integration)

### Still Needed:
- [ ] `ThemeContext` - Dark/light theme switching
- [ ] `AuthContext` - User authentication state

---

## Shared Components
*Highly reusable across multiple pages*

### Currently Available:
- **None yet** - Need to create shared components

### Universal Components Needed:
- [ ] `SectionWrapper` - Consistent section spacing and styling
- [ ] `AnimatedCounter` - Number animations for stats
- [ ] `ImageGallery` - Portfolio and product images
- [ ] `VideoPlayer` - Embedded video content
- [ ] `SocialLinks` - Social media integration

---

## Component Usage Tracking

### Pages and Their Component Needs:

#### Homepage Components Required:
- HeroSection (variant: nfc-technology)
- ServicesOverview
- NFCShowcase
- DecalGallery
- TestimonialsSection
- CTASection (theme: red-black)

#### About Page Components Required:
- HeroSection (variant: about)
- ServiceCard (reusable)
- CTASection (variant: contact)

#### Contact Page Components Required:
- HeroSection (variant: contact)
- ContactForm
- ContactSection

#### Blog Page Components Required:
- HeroSection (variant: blog)
- BlogCard
- BlogGrid
- BlogPagination

---

## Component Creation Guidelines

### Before Creating a New Component:

1. **Check if similar functionality exists above**
2. **Can an existing component be extended with props?**
3. **Is this component reusable across multiple pages?**
4. **Does it follow the red/black/yellow theme standards?**

### When Adding a New Component:

1. **Add it to appropriate category above**
2. **Document its variants and props**
3. **Note which pages will use it**
4. **Add usage examples**

### Component Naming Conventions:
- **PascalCase** for component names
- **Descriptive names** indicating functionality
- **Suffix with component type** (Section, Card, Form, etc.)

---

*Last updated: January 2025*
*Total components available: 11*

## ✅ Ready Components Summary

### Core Components Created:
1. **Header** - Modern responsive navigation with red/black theme (modal integration)
2. **Footer** - Comprehensive site footer with company info and navigation (modal integration)
3. **Button** - 6 variants with animations and loading states  
4. **Card** - 6 variants with subcomponents for consistent layouts
5. **ContactForm** - Netlify-enabled forms with 3 variants
6. **QuoteModal** - Modal popup quote form with Netlify integration and pre-fill support
7. **HeroSection** - 6 variants for different page types (modal integration)
8. **CTASection** - 5 variants for call-to-action blocks (modal integration)
9. **ContactSection** - Reusable contact info display component
10. **CustomQuoteCard** - Quote request cards with modal integration and pre-filled data
11. **ModalContext** - Global modal state management system

### Utility Files:
- **cn utility** - Tailwind class merging function at `/lib/utils.ts`

### Modal System Implementation:
- **Quote Modal Integration**: All "Get Quote" buttons across the site now open the QuoteModal
- **Components Updated**: Header, Footer, CustomQuoteCard, CTASection, HeroSection, CartDrawer
- **Pre-fill Support**: Modal can be opened with pre-filled data (service type, product name, quantity, message)
- **Netlify Forms**: Both ContactForm and QuoteModal submit to separate Netlify forms

### Next Priority Components:
1. ServicesOverview for showcasing NFC/decal services
2. TestimonialsSection for customer reviews
3. NFCShowcase for interactive NFC technology demos
4. DecalGallery for UV DTF decal examples