# Service Finder - Local Heroes

A modern web application for finding and booking local service providers.

## Project Overview

Service Finder is a comprehensive platform that connects customers with local service providers. Built with modern web technologies, it offers a seamless experience for both customers and service providers.

## Features

- **Service Discovery**: Browse and search for various service categories
- **Provider Profiles**: Detailed provider information with reviews and ratings
- **Booking System**: Easy booking and appointment scheduling
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Comprehensive admin panel for managing services and users
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Technologies Used

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_REPOSITORY_URL>
   cd service-finder-local-heroes-69-main
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── home/           # Home page components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── services/       # Service-related components
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
