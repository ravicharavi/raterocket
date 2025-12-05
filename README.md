# RateRocket - Insurance Comparison Platform

RateRocket is a modern insurance comparison website designed specifically for Canadians to compare car and home insurance bundle quotes from top providers.

## Features

- 🚀 **Modern UI/UX**: Beautiful, responsive design built with Next.js and Tailwind CSS
- 🇨🇦 **Canadian Focused**: Designed for Canadian provinces, postal codes, and insurance regulations
- 💰 **Bundle Quotes**: Specialized in comparing car and home insurance bundles
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Form Validation**: Comprehensive validation for Canadian addresses, postal codes, and phone numbers
- 📊 **Quote Comparison**: Side-by-side comparison of multiple insurance providers

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Navigate to the project directory:
```bash
cd raterocket
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
raterocket/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   └── quote/
│       ├── personal-info/  # Personal information form
│       ├── insurance-details/ # Insurance details form
│       └── compare/        # Quote comparison page
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## User Flow

1. **Landing Page**: Users see the homepage with information about RateRocket
2. **Personal Information**: Users enter their personal details (name, address, contact info)
3. **Insurance Details**: Users provide car and home insurance information
4. **Compare Quotes**: Users view and compare bundle quotes from multiple providers

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: For state management and form handling

## Features in Detail

### Personal Information Form
- Validates Canadian postal codes (A1A 1A1 format)
- Validates Canadian phone numbers
- Province selection dropdown
- Address and contact information collection

### Insurance Details Form
- Car insurance details (make, model, year, value, usage)
- Home insurance details (type, value, age, size)
- Claims history tracking
- Current insurance status

### Quote Comparison
- Displays multiple provider quotes
- Highlights best value option
- Shows bundle discounts and savings
- Side-by-side comparison table
- Provider ratings and features

## Future Enhancements

- Backend API integration for real quotes
- User account system
- Quote saving and comparison history
- Email notifications
- Live chat support
- Additional insurance types (life, health, etc.)

## License

This project is private and proprietary.
