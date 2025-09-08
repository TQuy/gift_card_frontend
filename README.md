# Gift Card Platform 🎁

## Features

- 🔐 **User Authentication** - Login/logout with persistent sessions using localStorage
- 🎁 **Brand Management** - Browse and explore different gift card brands
- 💳 **Gift Card Purchase** - Purchase gift cards from various brands
- 📱 **Responsive Design** - Mobile-first design with Vuetify components
- ⚡ **Fast Performance** - Static site generation with Nuxt 2
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🎨 **Modern UI** - Clean Material Design with Vuetify
- 🔄 **State Persistence** - User sessions persist across browser refreshes
- 🍪 **Cookie Support** - Automatic cookie handling for API requestsull-featured gift card platform built with Nuxt 2, TypeScript, and Vuetify. Features user authentication, brand management, and a responsive design for optimal user experience across all devices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Authentication System](#authentication-system)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [TypeScript Types](#typescript-types)
- [Styling & UI](#styling--ui)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🔐 **User Authentication** - Login/logout with persistent sessions using localStorage
- 🎁 **Brand Management** - Browse and explore different gift card brands
- 💳 **Gift Card Browsing** - Filter and search through available gift cards
- � **Responsive Design** - Mobile-first design with Vuetify components
- ⚡ **Fast Performance** - Static site generation with Nuxt 2
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🎨 **Modern UI** - Clean Material Design with Vuetify
- 🔄 **State Persistence** - User sessions persist across browser refreshes
- 🍪 **Cookie Support** - Automatic cookie handling for API requests

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Nuxt.js** | Vue.js Framework | 2.17.3 |
| **Vue.js** | Frontend Framework | 2.7.16 |
| **TypeScript** | Type Safety | 5.9.2 |
| **Vuetify** | UI Component Library | 1.12.3 |
| **Vuex** | State Management | 3.6.2 |
| **Axios** | HTTP Client | 5.13.6 |
| **Tailwind CSS** | Utility-first CSS | 6.14.0 |

## Project Structure

```
gift-card-platform/
├── api/                      # API layer
│   ├── auth.ts              # Authentication API calls
│   ├── brands.ts            # Brand-related API calls
│   ├── giftCard.ts          # Gift card API calls
│   └── types.ts             # API response types
├── assets/                   # Static assets
│   ├── css/main.css         # Global styles
│   └── variables.scss       # SCSS variables
├── components/              # Reusable Vue components
│   ├── BrandCard.vue        # Brand display card
│   ├── BrandDetailCard.vue  # Detailed brand view
│   ├── DeliveryContactForm.vue # Contact form
│   ├── DeliveryTimeForm.vue # Delivery time selector
│   └── GiftAmountSelector.vue # Amount selection
├── constants/               # Application constants
│   └── brands.ts           # Brand data constants
├── layouts/                 # Nuxt layouts
│   └── default.vue         # Main application layout
├── pages/                   # Application pages (auto-routing)
│   ├── index.vue           # Home page
│   ├── login.vue           # Authentication page
│   ├── register.vue        # User registration
│   └── brands/             # Brand-related pages
│       ├── index.vue       # Brands listing
│       └── _brand_id/      # Dynamic brand pages
│           └── issue.vue   # Gift card purchase
├── plugins/                 # Nuxt plugins
│   └── auth-init.client.js # Auth initialization
├── store/                   # Vuex store modules
│   ├── index.ts            # Root store
│   ├── auth.ts             # Authentication store
│   └── types.ts            # Store type definitions
├── types/                   # TypeScript definitions
│   ├── index.ts            # Main type definitions
│   └── nuxt.d.ts           # Nuxt type extensions
├── nuxt.config.js          # Nuxt configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Authentication System

The platform includes a complete authentication system:

- **Login/Logout** - Secure user authentication
- **Session Persistence** - Uses localStorage to maintain user sessions
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Store Integration** - User state managed through Vuex
- **Cookie Support** - Automatic cookie handling for API requests

### Authentication Flow
1. User logs in via `/login` page
2. Credentials sent to backend API
3. User data stored in Vuex store and localStorage
4. Subsequent requests include authentication cookies
5. User remains logged in across browser sessions

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TQuy/gift_card_frontend.git
   cd gift_card_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

### Environment Setup

The application is configured to connect to a backend API at `http://localhost:8000`. Make sure your backend server is running on this port, or update the `baseURL` in `nuxt.config.js`:

```javascript
axios: {
  baseURL: "http://your-backend-url:port",
  credentials: true,
  withCredentials: true
}
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build application for production |
| `npm run start` | Start production server |
| `npm run generate` | Generate static site |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Fix ESLint issues automatically |

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `pages/index.vue` | Home page with hero section |
| `/login` | `pages/login.vue` | User authentication |
| `/register` | `pages/register.vue` | User registration |
| `/brands` | `pages/brands/index.vue` | Browse all brands |
| `/brands/:id/issue` | `pages/brands/_brand_id/issue.vue` | Purchase gift cards |

## Components

### Core Components

- **BrandCard** - Displays brand information in card format
- **BrandDetailCard** - Detailed view of a specific brand
- **GiftAmountSelector** - Interactive amount selection component
- **DeliveryContactForm** - Contact information form
- **DeliveryTimeForm** - Delivery time selection

### Layout Components

- **default.vue** - Main layout with navigation and footer
- Navigation includes responsive design for mobile and desktop
- Automatic authentication state handling

## API Integration

The application integrates with a backend API for:

- **Authentication** - Login, logout, registration
- **Brands** - Fetch brand data and details
- **Gift Cards** - Browse and purchase gift cards

### API Configuration

```javascript
// nuxt.config.js
axios: {
  baseURL: "http://localhost:8000",
  credentials: true,
  withCredentials: true
}
```

## State Management

### Vuex Store Structure

```javascript
// store/auth.ts
- state: { user: UserResponse | null }
- mutations: { setUser, clearUser, initializeStore }
- actions: { login, logout, initializeAuth }
```

### Features
- **Persistent State** - User data saved to localStorage
- **Automatic Initialization** - Store restored on app startup
- **Type Safety** - Full TypeScript support

## TypeScript Types

### Core Types

```typescript
// User Authentication
interface UserResponse {
  id: number;
  username: string;
  email: string;
  role_id: number;
  roleName: string;
  isAdmin: boolean;
}

// API Responses
interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

// Brand Information
interface Brand {
  id: number;
  name: string;
  logo: string;
  description: string;
}
```

## Styling & UI

- **Vuetify** - Primary UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Material Design** - Google's design system
- **Responsive Design** - Mobile-first approach
- **SCSS Support** - For advanced styling needs

### Theme Configuration

```javascript
// nuxt.config.js
vuetify: {
  customVariables: ["~/assets/variables.scss"],
  theme: {
    dark: false,
    // Custom theme configuration
  }
}
```

## Deployment

### Static Generation (Recommended)

```bash
npm run generate
```

Deploy the `dist/` folder to any static hosting service:
- **Netlify**
- **Vercel**
- **GitHub Pages**
- **AWS S3**

### Server-Side Rendering

```bash
npm run build
npm run start
```

Deploy to platforms supporting Node.js:
- **Heroku**
- **Digital Ocean**
- **AWS EC2**
- **Google Cloud Platform**

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use traditional function expressions (avoid arrow functions when possible)
- Avoid TypeScript enums
- Write meaningful commit messages
- Add proper type definitions

## License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Nuxt.js, TypeScript, and Vuetify**
