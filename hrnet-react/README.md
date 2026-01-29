# HRnet React

A React conversion of the HRnet application, originally built with jQuery. This application provides an employee management system with features for creating and listing employees.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (routes)
├── store/          # State management (Context/Redux)
├── styles/         # Global styles and CSS modules
├── utils/          # Utility functions and helpers
├── App.jsx         # Main application component
├── App.css         # App-level styles
├── main.jsx        # Application entry point
└── index.css       # Global CSS
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

- Create new employees with detailed information
- View and manage employee list
- Search, sort, and paginate employees
- Responsive design
- No jQuery dependencies - 100% React

## Tech Stack

- React 18
- Vite (build tool)
- React Router (routing)
- CSS (styling)

## Original jQuery Application

This project is a migration from the original HRnet jQuery application, converting all jQuery plugins to React components for improved performance and maintainability.

## License

This project is for educational purposes as part of the OpenClassrooms curriculum.
