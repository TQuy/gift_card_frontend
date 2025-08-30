# Gift Card Platform

A modern gift card platform built with Nuxt 2 and TypeScript, featuring brand listings and gift card management.

## Features

- 🎁 Browse brands and their gift cards
- 💳 Filter gift cards by brand and denomination
- 🔍 Responsive design with mobile support
- ⚡ Fast static site generation with Nuxt 2
- 🛡️ Type safety with TypeScript
- 🎨 Clean and modern UI design

## Tech Stack

- **Framework:** Nuxt 2
- **Language:** TypeScript
- **Styling:** CSS3 with Scoped Styles
- **Build Tool:** Nuxt Build System
- **Package Manager:** npm

## Project Structure

```
├── assets/css/           # Global styles
├── components/           # Vue components
│   └── BrandCard.vue    # Brand card component
├── layouts/              # Nuxt layouts
│   └── default.vue      # Default layout with navigation
├── pages/                # Nuxt pages (auto-routing)
│   ├── index.vue        # Home page
│   ├── brands.vue       # Brands listing page
│   └── gift-cards.vue   # Gift cards page
├── types/                # TypeScript type definitions
│   └── index.ts         # Brand and GiftCard interfaces
├── nuxt.config.js       # Nuxt configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate static site

## Pages

### Home Page (`/`)
- Hero section with call-to-action buttons
- Features showcase
- Navigation to other sections

### Brands Page (`/brands`)
- Grid layout displaying brand logos
- Hover effects and interactive cards
- Converted from the original brands.html

### Gift Cards Page (`/gift-cards`)
- Filterable gift card listings
- Brand and denomination filters
- Purchase functionality (mock implementation)
- Discount pricing display

## TypeScript Types

The project includes type definitions for:
- `Brand` - Brand information including id, name, logo, etc.
- `GiftCard` - Gift card details including denomination, discounts, etc.

## Customization

You can easily customize the platform by:

1. **Adding new brands**: Update the brands array in the respective page components
2. **Styling**: Modify the scoped CSS in each component
3. **Adding pages**: Create new `.vue` files in the `pages/` directory
4. **Components**: Add reusable components in the `components/` directory

## Deployment

### Static Generation
```bash
npm run generate
```

The generated static files will be in the `dist/` directory and can be deployed to any static hosting service.

### Server-Side Rendering
```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
