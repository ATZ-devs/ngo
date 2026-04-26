# Jeev Kutumb Foundation - Donation Platform

> **Making a Difference, One Donation at a Time**

Welcome to the Jeev Kutumb Foundation donation platform - a secure, transparent, and donor-centric system built to facilitate meaningful contributions toward healthcare, education, skill development, women empowerment, and social welfare.

---

## 🎯 About Jeev Kutumb Foundation

Jeev Kutumb Foundation is committed to creating lasting positive change in communities across India. We believe that **hope begins with us** - and every donation, no matter the size, contributes to our mission of building a more compassionate and responsible society.

### Our Mission

To empower underserved communities through accessible healthcare, quality education, sustainable skill development, women empowerment, and comprehensive social welfare programs.

### What We Do

- **Healthcare Initiatives**: Providing medical support and health awareness to vulnerable populations
- **Educational Programs**: Enabling quality education for children from disadvantaged backgrounds
- **Skill Development**: Equipping individuals with employable skills for economic independence
- **Women Empowerment**: Supporting women through training, mentorship, and economic opportunities
- **Social Welfare**: Direct support for disaster relief, elder care, and community development

---

## 💡 Key Features

### 🔐 Secure Payment Processing
- **India**: Razorpay payment gateway (trusted by millions)
- **Verification**: Cryptographic webhook signature validation
- **Transparency**: Real-time payment confirmation and receipt generation

### 📧 Automated Receipts & Compliance
- **Instant Receipts**: PDF receipts generated within seconds of successful payment
- **Tax Documents**: 80G compliance certificate automatically attached to all receipts
- **Email Delivery**: Secure email delivery with Resend
- **Record Keeping**: Complete donation history maintained in secure database

### 📊 Donor Trust & Transparency
- **Real-time Status**: Donors see immediate payment confirmation
- **Donation History**: Secure donor portal for tracking contributions
- **Impact Updates**: Regular communication about how funds are utilized
- **Professional Interface**: Clean, intuitive, mobile-responsive donation form

### 🛡️ Enterprise-Grade Security
- **Encrypted Data**: All sensitive information encrypted in transit and at rest
- **PCI Compliance**: Payment processing follows industry standards
- **Idempotent Webhooks**: Prevents duplicate charge processing
- **Server-side Verification**: All payment confirmations verified server-side
- **No Frontend Trust**: Frontend cannot bypass payment verification

---

## 🌍 How Donations Work

```
1. Donor visits jeevkutumbfoundation.com/donate
   ↓
2. Fills donation form (name, email, amount)
   ↓
3. Selects payment method (Razorpay)
   ↓
4. Completes secure payment
   ↓
5. Payment verified via encrypted webhook
   ↓
6. Receipt PDF generated automatically
   ↓
7. Email sent to donor with receipt + 80G certificate
   ↓
8. Donation recorded in secure database
```

**Timeline**: From donation to receipt = ~5 seconds

---

## 🏗️ Technical Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) | Fast, SEO-optimized web interface |
| **Backend** | Next.js API Routes | Serverless backend on Vercel |
| **Database** | Supabase (PostgreSQL) | Secure donation and event storage |
| **Storage** | Supabase Storage | Receipt PDF and document hosting |
| **Payments** | Razorpay | Payment processing and verification |
| **Email** | Resend | Transactional email delivery |
| **Hosting** | Vercel | Global CDN, auto-scaling, 99.99% uptime |
| **Domain** | GoDaddy (DNS via Vercel) | Custom domain with SSL/TLS |

### Data Flow

```
Donor Payment → Payment Gateway → Webhook Verification → Database Update → Receipt Generation → Email Delivery
```

**Key Principle**: Every step is independently verified. No assumptions are made about frontend-reported payment status.

---

## 🔒 Security & Trust

### Payment Security

✓ **Webhook Signature Verification**: Every webhook from payment provider is cryptographically verified  
✓ **Idempotent Processing**: Duplicate webhooks are safely ignored  
✓ **No Frontend Trust**: Payment confirmation always verified server-side  
✓ **Encrypted Webhooks**: Payment data transmitted via HTTPS with TLS 1.2+  

### Data Protection

✓ **End-to-End Encryption**: Sensitive data encrypted in transit and at rest  
✓ **No Payment Storage**: Card and UPI payment data never touches our servers (handled by Razorpay)  
✓ **Secure API Keys**: All secrets stored in encrypted environment variables  
✓ **Database Backups**: Daily automated backups with point-in-time recovery  

### Compliance

✓ **PCI Compliance**: Payment processing follows PCI DSS standards  
✓ **80G Certification**: All receipts include tax compliance documentation  
✓ **GDPR Ready**: Donor data handling respects privacy regulations  
✓ **Audit Trail**: Complete record of all transactions and events  

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 20.9+ and npm 10+
- Supabase account (free tier available)
- Razorpay account (test mode for development)
- Resend account for email delivery

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ATZ-devs/ngo.git
   cd ngo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy environment template**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** 

5. **Initialize Supabase database**
   - Go to Supabase dashboard
   - Run SQL migrations from `supabase/schema.sql`
   - Create storage buckets: `receipts` and `documents`
   - Upload your 80G certificate PDF to `documents` bucket

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open http://localhost:3000**

### Production Deployment

**Vercel** (recommended for Next.js):

```bash
# Connect your GitHub repository to Vercel
# Vercel automatically deploys on push to main branch
```

**Custom Domain Setup**:
- Domain: GoDaddy or similar registrar
- Point nameservers to: `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
- Vercel automatically provisions SSL certificate

**Environment Variables in Production**:
- Add all `.env.local` variables to Vercel project settings
- Use live API keys for Razorpay (not test keys)
- Set both `DONATION_JOBS_SECRET` and `CRON_SECRET` to strong random values

---

## 📚 Documentation

### For Donors
- **How to Donate**: Visit `/donate` page
- **Tax Benefits**: Learn about 80G certification and tax deductions
- **Receipt**: Automatic PDF receipt emailed within 5 seconds
- **Support**: Contact `jeevkutumbfoundation@gmail.com`

### For Developers

#### Adding a New Feature
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Submit pull request with clear description
4. Changes deployed to production after review

#### Handling Webhook Events
- Webhooks are idempotent (safe to retry)
- Webhook signature verification is mandatory
- Always verify before trusting payment status

#### Testing Payments
- Use Razorpay test mode with card: `4111 1111 1111 1111`
- Verify webhook delivery in provider dashboard
- Check Supabase for donation records

---

## 📞 Support & Contact

- **Website**: https://jeevkutumbfoundation.com
- **Email**: jeevkutumbfoundation@gmail.com
- **Phone**: +91 77100 75418
- **GitHub Issues**: For technical questions and bugs

---

## 📄 License

This project is open source and available under the MIT License.

---

## ✨ Our Commitment

We are committed to:
- **Transparency**: Complete visibility into how donations are used
- **Security**: Enterprise-grade protection of donor information
- **Accountability**: Regular impact reports and financial transparency
- **Excellence**: Continuous improvement in our programs and systems

**Every donation matters. Together, we create lasting change.**

---

*Last Updated: April 22, 2026*  
*Version: 1.0.0 - Production Ready*

