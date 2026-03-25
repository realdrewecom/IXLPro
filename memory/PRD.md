# IXLPro - Product Requirements Document

## Original Problem Statement
Create a SaaS product similar to EdgyPro (edgypro.net) but for IXL learning platform. The website should replicate EdgyPro 1:1 with:
- Name: IXLPro
- Pricing tiers: Day ($2.50), Week ($10), Month ($25), 3 Month ($50), Year ($100), Service ($120)
- Stripe payment integration
- Discord bot for key delivery (future)
- Tampermonkey script integration

## User Personas
1. **Students** - High school/college students using IXL who want help with assignments
2. **Business Users** - Tutoring services or groups needing Service Keys

## Core Requirements (Static)
- Landing page with EdgyPro-style dark theme
- Hero section with animated stats
- Reviews carousel (Discord-style testimonials)
- 6 pricing tiers with Stripe checkout
- FAQ accordion section
- Setup/Download instructions
- License key generation on purchase
- Key validation API for Tampermonkey script

## What's Been Implemented ✅
**Date: January 2026**

### Backend (FastAPI)
- ✅ Stats API endpoint (/api/stats)
- ✅ Pricing plans endpoint (/api/pricing)
- ✅ Stripe checkout integration (/api/checkout/create)
- ✅ Payment status polling (/api/checkout/status/{session_id})
- ✅ License key generation on successful payment
- ✅ Key validation API (/api/validate-key)
- ✅ Keys by email lookup (/api/keys/by-email/{email})
- ✅ Webhook handler (/api/webhook/stripe)

### Frontend (React)
- ✅ Navbar with status indicator & Trustpilot rating
- ✅ Hero section with animated counters
- ✅ Reviews carousel with Discord-style cards
- ✅ Pricing section with 6 tiers
- ✅ FAQ accordion (10 items)
- ✅ Setup section with Desktop/Mobile tabs
- ✅ Footer with social links
- ✅ Payment success/cancel pages

### Design
- ✅ Dark theme (zinc-900/950 backgrounds)
- ✅ Blue accent color scheme
- ✅ Outfit & IBM Plex Sans typography
- ✅ Glassmorphism navbar
- ✅ Card hover effects

## Prioritized Backlog

### P0 - Critical (Not Started)
- [ ] Discord bot for key generation & delivery
- [ ] Ticket system Discord bot
- [ ] Actual IXLPro Tampermonkey script for IXL

### P1 - Important
- [ ] Email delivery of license keys (Resend/SendGrid)
- [ ] User accounts/dashboard
- [ ] Key management (view, regenerate keys)
- [ ] Referral system

### P2 - Nice to Have
- [ ] Real Trustpilot integration
- [ ] Analytics dashboard (admin)
- [ ] Multiple payment gateways (PayPal)
- [ ] Mobile app support

## Next Tasks
1. Create IXLPro Tampermonkey script for IXL (adapting from EdgyPro)
2. Set up Discord bot with key generation commands
3. Implement email delivery for license keys
4. Add user authentication system
