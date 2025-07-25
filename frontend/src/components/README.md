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

### Still Needed:
- [ ] `Footer` - Site footer with contact info and links
- [ ] `Navigation` - Standalone navigation component (if needed)

---

## Section Components
*Hero sections, CTAs, content blocks*

### Currently Available:
- ✅ `HeroSection` - Modern hero with 6 variants (home, nfc-technology, decals, about, contact, blog), animations, gradient backgrounds

### Still Needed:
- [ ] `CTASection` - Call-to-action blocks (themes: red-black, minimal)
- [ ] `ServicesOverview` - Service showcase grid
- [ ] `TestimonialsSection` - Customer reviews and testimonials
- [ ] `ContactSection` - Contact forms and info display

---

## UI Components
*Basic reusable elements*

### Currently Available:
- ✅ `Button` - 6 variants (primary, secondary, accent, outline, ghost, destructive), loading states, icons, modern animations
- ✅ `Card` - 6 variants (default, primary, dark, accent, glass, outlined), subcomponents (Header, Title, Content, Footer)

### Still Needed:
- [ ] `Badge` - Status indicators and labels
- [ ] `Modal` - Pop-up dialogs and overlays  
- [ ] `Loader` - Loading states and spinners

---

## Form Components
*Contact forms, quote requests, user input*

### Currently Available:
- ✅ `ContactForm` - Netlify-enabled form with 3 variants (contact, quote, newsletter), validation, success states

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

*Last updated: December 2024*
*Total components available: 4*

## ✅ Ready Components Summary

### Core Components Created:
1. **Header** - Modern responsive navigation with red/black theme
2. **Button** - 6 variants with animations and loading states  
3. **Card** - 6 variants with subcomponents for consistent layouts
4. **ContactForm** - Netlify-enabled forms with 3 variants
5. **HeroSection** - 6 variants for different page types

### Utility Files:
- **cn utility** - Tailwind class merging function at `/lib/utils.ts`

### Next Priority Components:
1. Footer component for site-wide footer
2. CTASection for call-to-action blocks  
3. ServicesOverview for showcasing NFC/decal services
4. TestimonialsSection for customer reviews