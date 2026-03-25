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
- Separate pages for Features, Purchase, Reviews, Download, Troubleshooting
- Interactive 3D menu on hero section
- 6 pricing tiers with Stripe checkout
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
- ✅ Updated Navbar with Links to all pages
- ✅ Interactive 3D menu with hover tilt effect
- ✅ **Features page** (/features) - 22 features with tags and descriptions
- ✅ **Purchase page** (/purchase) - Student/Service toggle, duration selection
- ✅ **Reviews page** (/reviews) - Discord-style reviews with sorting
- ✅ **Download page** (/download) - Setup instructions
- ✅ **Troubleshooting page** (/troubleshooting) - FAQ articles with search
- ✅ Reviews carousel on landing page
- ✅ Pricing section with 6 tiers
- ✅ FAQ accordion
- ✅ Footer with navigation

### Features Documented
- Auto Advance (Coursemap Mode, Next Activity Mode, Take Notes)
- Auto Advance Delay
- Auto Submit Delay (Custom Delays)
- Auto Answers (Default Mode, Stealth Mode, Guess Unknown)
- Auto Assignment, Auto Instruction, Auto Vocab, Auto Virtual Lab
- Anti Logout
- Brainly Search, Brainly Unlocker
- AI Answers (Humanize, Ask AI Button)
- Custom Background, Discord Logging
- Frame Unlocker, Language Activity Skipper
- Multi-tabs, Show Column, Skip Intros
- Video Brightness, Hide Personal Info, Hide Menu

## Prioritized Backlog

### P0 - Critical (Not Started)
- [ ] Discord bot for key generation & delivery
- [ ] Ticket system Discord bot
- [ ] Actual IXLPro Tampermonkey script for IXL

### P1 - Important
- [ ] Email delivery of license keys (Resend/SendGrid)
- [ ] User accounts/dashboard
- [ ] Key management (view, regenerate keys)
- [ ] 404 Error page

### P2 - Nice to Have
- [ ] Real Trustpilot integration
- [ ] Analytics dashboard (admin)
- [ ] Multiple payment gateways (PayPal)
- [ ] Mobile-specific interactive menu

## Next Tasks
1. Create IXLPro Tampermonkey script for IXL (adapting from EdgyPro)
2. Set up Discord bot with key generation commands
3. Implement email delivery for license keys
4. Add user authentication system
