# Project TODO List & Production Launch Checklist

## Domain & Email Integration
- [ ] **Setup Production Contact Form Delivery**
  - **Current State:** Using temporary placeholder/simulation (ready for Web3Forms) for development/testing.
  - **Production Transition Steps (Once custom domain is purchased):**
    1. Sign up for a free email API gateway at [Resend.com](https://resend.com).
    2. Add and verify your new domain (e.g., `soulajute.com`) in the Resend dashboard by adding the DNS records (DKIM, SPF, DMARC) to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
    3. Update the contact page backend integration:
       - Implement a serverless function (`/api/contact`) on Vercel to securely handle the form.
       - Store the private Resend API key inside Vercel's environment variables (`.env`).
       - Use Resend's Node.js SDK to send messages from `contact@yourdomain.com` to `shuklaayush.0006@gmail.com`.
       - Update [Contact.jsx](file:///c:/Users/shukl/OneDrive/Desktop/JUTE%20BAG/jute%20bag%20website/src/pages/Contact.jsx) to POST to `/api/contact` instead of the temporary Web3Forms endpoint.

## General Launch Checks
- [ ] Connect custom domain to Vercel dashboard.
- [ ] Verify SSL certificates (HTTPS) are active.
- [ ] Update SEO meta descriptions and titles with official company address and brand details.
