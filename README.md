# 22BQ1A42A5 - Campus Hiring Evaluation

## React URL Shortener Web Application

This repository contains a comprehensive React-based URL shortener application built for the Campus Hiring Evaluation. The application demonstrates advanced React development skills, proper architecture, and adherence to all specified requirements.

## 🎯 Project Overview

The application provides a user-friendly URL shortening service with analytical insights, all managed within a client-side React application. It includes comprehensive logging, Material UI design, and robust error handling.

## 📁 Project Structure

```
22BQ1A42A5/
├── Frontend Test Subbmission/          # Main React Application
│   ├── src/
│   │   ├── components/                 # React Components
│   │   ├── middleware/                 # Logging Context
│   │   ├── services/                   # URL Service Logic
│   │   ├── types/                      # TypeScript Definitions
│   │   └── utils/                      # Utility Functions
│   ├── public/                         # Static Assets
│   └── package.json                    # Dependencies
├── Logging Middileware/                # Logging Middleware
│   ├── LoggingMiddleware.ts           # Core Logging Implementation
│   └── README.md                      # Logging Documentation
└── README.md                          # This File
```

## ✅ Requirements Compliance

### Mandatory Requirements Met:
- ✅ **Logging Integration**: Extensive custom logging middleware
- ✅ **React Application**: Built with React 18 and TypeScript
- ✅ **Material UI**: Exclusive use of Material UI components
- ✅ **Client-side Validation**: Comprehensive input validation
- ✅ **URL Shortening**: Core functionality with 5 concurrent URL limit
- ✅ **Validity Periods**: Configurable expiry (1-1440 minutes, default 30)
- ✅ **Custom Shortcodes**: Optional custom shortcode support
- ✅ **Redirection**: Proper URL redirection with click tracking
- ✅ **Statistics Page**: Comprehensive analytics dashboard
- ✅ **Error Handling**: Robust error handling throughout
- ✅ **localhost:3000**: Configured for required port

## 🚀 Key Features

### URL Shortener Page
- Shorten up to 5 URLs concurrently
- Custom shortcode support (3-20 alphanumeric characters)
- Configurable validity periods (1-1440 minutes)
- Real-time form validation
- URL management (copy, delete, open)
- Visual status indicators

### Statistics Page
- Comprehensive analytics dashboard
- Total URLs, active URLs, expired URLs, total clicks
- Detailed table with all shortened URLs
- Status indicators and action buttons
- Historical data tracking

### Technical Excellence
- **TypeScript**: Full type safety
- **Material UI**: Modern, responsive design
- **React Router**: Client-side navigation
- **Custom Logging**: Proprietary logging middleware
- **Error Handling**: Comprehensive error management
- **Validation**: Multi-layer validation system

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Material UI
- **Routing**: React Router DOM
- **Styling**: Material UI Theme System
- **State Management**: React Hooks
- **Validation**: Custom validation utilities
- **Logging**: Custom logging middleware
- **Build Tool**: Create React App

## 🚀 Quick Start

1. **Navigate to the application directory:**
   ```bash
   cd "Frontend Test Subbmission"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📖 Usage

### Creating Shortened URLs
1. Enter a valid URL (with http:// or https://)
2. Set validity period (1-1440 minutes)
3. Optionally provide custom shortcode
4. Click "Shorten URL"

### Managing URLs
- Copy shortened URLs to clipboard
- Open original URLs in new tabs
- Delete URLs to free up slots
- Monitor expiry status

### Viewing Analytics
- Access comprehensive statistics
- View all URLs in detailed table
- Track click counts and usage
- Monitor active vs expired URLs

## 🔧 Architecture Highlights

### Component Architecture
- **Modular Design**: Separate components for each major feature
- **Reusable Components**: Shared UI components and utilities
- **Type Safety**: Full TypeScript implementation
- **State Management**: Efficient React hooks usage

### Service Layer
- **URL Service**: Centralized URL management logic
- **Validation Service**: Comprehensive input validation
- **Logging Service**: Structured logging with metadata

### Middleware Integration
- **Logging Middleware**: Custom implementation in separate module
- **Context Providers**: React context for state sharing
- **Error Boundaries**: Graceful error handling

## 📊 Logging System

The application includes a comprehensive logging system that tracks:
- User interactions and form submissions
- URL creation, deletion, and access
- Error conditions and validation failures
- Component lifecycle events
- Performance metrics and timing

## 🎨 Design System

- **Material UI**: Consistent design language
- **Responsive Layout**: Mobile-first approach
- **Accessibility**: WCAG compliant components
- **Theme System**: Customizable color schemes
- **Icon System**: Consistent iconography

## 🔒 Security & Validation

- **Input Sanitization**: All user inputs validated
- **URL Validation**: Proper URL format checking
- **Shortcode Validation**: Alphanumeric restrictions
- **Error Handling**: Secure error messaging
- **Client-side Security**: XSS prevention measures

## 📈 Performance Features

- **Efficient Rendering**: Optimized React re-renders
- **Memory Management**: Automatic cleanup of expired URLs
- **Client-side Processing**: No server dependencies
- **Lazy Loading**: Components loaded as needed
- **State Optimization**: Minimal state updates

## 🧪 Quality Assurance

- **TypeScript**: Compile-time error checking
- **Comprehensive Validation**: Multi-layer validation
- **Error Boundaries**: Graceful failure handling
- **Extensive Logging**: Debug-friendly logging
- **Code Organization**: Clean, maintainable structure

## 📝 Documentation

- **README Files**: Comprehensive documentation
- **Code Comments**: Inline documentation
- **Type Definitions**: Self-documenting TypeScript
- **Component Documentation**: Clear component interfaces

## 🎓 Educational Value

This project demonstrates:
- Modern React development practices
- TypeScript integration and best practices
- Material UI implementation
- Custom middleware development
- Client-side architecture patterns
- Comprehensive error handling
- Professional code organization

## 📞 Support

This application includes extensive logging and error handling to facilitate debugging and support. All user interactions and system events are logged with appropriate detail levels for troubleshooting purposes.

---

**Note**: This project is created for the Campus Hiring Evaluation and demonstrates advanced React development skills, proper architecture, and adherence to all specified requirements.