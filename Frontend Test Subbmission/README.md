# URL Shortener Web Application

A comprehensive React-based URL shortener application built for the Campus Hiring Evaluation. This application provides core URL shortening functionality with analytical insights, all managed within a client-side application.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Shorten up to 5 URLs concurrently
- **Custom Shortcodes**: Optional custom shortcode support (3-20 characters, alphanumeric)
- **Validity Periods**: Configurable expiry times (1-1440 minutes)
- **Automatic Cleanup**: Expired URLs are automatically deactivated
- **Click Tracking**: Track clicks on shortened URLs
- **Redirection**: Seamless redirection to original URLs

### User Interface
- **Material UI Design**: Clean, modern interface using Material UI components
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live updates of URL status and statistics
- **User-friendly Forms**: Comprehensive form validation and error handling
- **Copy to Clipboard**: Easy copying of shortened URLs
- **Visual Feedback**: Loading states, success/error messages, and tooltips

### Analytics & Statistics
- **Statistics Dashboard**: Comprehensive view of all shortened URLs
- **Usage Metrics**: Total URLs, active URLs, expired URLs, and total clicks
- **Detailed URL Information**: Creation dates, expiry times, click counts
- **Status Indicators**: Visual status indicators for active/expired URLs

### Technical Features
- **Client-side Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling with user-friendly messages
- **Logging Integration**: Extensive logging middleware as required
- **TypeScript**: Full TypeScript implementation for type safety
- **React Router**: Client-side routing for navigation
- **State Management**: Efficient state management with React hooks

## 🏗️ Architecture

### Project Structure
```
Frontend Test Subbmission/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── URLShortenerPage.tsx
│   │   ├── URLStatisticsPage.tsx
│   │   └── RedirectHandler.tsx
│   ├── middleware/
│   │   └── LoggingContext.tsx
│   ├── services/
│   │   └── urlService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md

Logging Middileware/
├── LoggingMiddleware.ts
└── README.md
```

### Key Components

#### URLShortenerPage
- Main interface for creating shortened URLs
- Form validation and submission
- Display of active shortened URLs
- URL management (copy, delete, open)

#### URLStatisticsPage
- Statistics dashboard with key metrics
- Comprehensive table of all URLs
- Filtering and sorting capabilities
- Visual status indicators

#### RedirectHandler
- Handles redirection from short URLs
- Click tracking and analytics
- Error handling for invalid/expired URLs
- User-friendly redirect interface

#### LoggingMiddleware
- Comprehensive logging system
- Multiple log levels (debug, info, warn, error)
- Component and action tracking
- Log storage and retrieval

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better development experience
- **Material UI**: Comprehensive UI component library
- **React Router**: Client-side routing
- **UUID**: Unique identifier generation
- **Custom Logging**: Proprietary logging middleware

## 📋 Requirements Compliance

### ✅ Mandatory Requirements Met

1. **Logging Integration**: Extensive use of custom logging middleware
2. **React Application**: Built with React and TypeScript
3. **Material UI**: Exclusively uses Material UI components
4. **Client-side Validation**: Comprehensive input validation
5. **URL Shortening**: Core functionality with 5 concurrent URL limit
6. **Validity Periods**: Configurable expiry times with default 30 minutes
7. **Custom Shortcodes**: Optional custom shortcode support
8. **Redirection**: Proper URL redirection with click tracking
9. **Statistics Page**: Comprehensive analytics and URL management
10. **Error Handling**: Robust error handling throughout the application
11. **localhost:3000**: Configured to run on the required port

### 🎯 Additional Features

- **Real-time Status Updates**: Live updates of URL expiry status
- **Copy to Clipboard**: Easy URL copying functionality
- **Visual Feedback**: Loading states and user feedback
- **Responsive Design**: Mobile-friendly interface
- **Comprehensive Validation**: Both client-side and service-level validation
- **Statistics Dashboard**: Rich analytics with visual indicators

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "Frontend Test Subbmission"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

## 📖 Usage Guide

### Creating a Shortened URL

1. Navigate to the URL Shortener page
2. Enter the original URL (must include http:// or https://)
3. Set the validity period (1-1440 minutes)
4. Optionally provide a custom shortcode
5. Click "Shorten URL"

### Managing URLs

- **Copy**: Click the copy icon to copy the shortened URL
- **Open**: Click the launch icon to open the original URL
- **Delete**: Click the delete icon to deactivate the URL

### Viewing Statistics

1. Navigate to the Statistics page
2. View overall metrics in the dashboard cards
3. Browse the detailed table of all URLs
4. Use the action buttons to interact with URLs

### Using Shortened URLs

1. Copy a shortened URL from the application
2. Share or use the shortened URL
3. When accessed, users will be redirected to the original URL
4. Click counts are automatically tracked

## 🔧 Configuration

The application includes several configurable aspects:

### Logging Configuration
- Log levels (debug, info, warn, error)
- Console output toggle
- Maximum log entries
- Component and action tracking

### URL Service Configuration
- Maximum concurrent URLs (currently 5)
- Default validity period (30 minutes)
- Shortcode generation parameters
- Validation rules

## 🐛 Error Handling

The application includes comprehensive error handling:

- **Form Validation**: Real-time validation with helpful error messages
- **API Errors**: Graceful handling of service errors
- **Network Issues**: Proper error states for network problems
- **Invalid URLs**: Clear messaging for invalid or expired URLs
- **User Feedback**: Toast notifications for all user actions

## 📊 Logging

The application uses a comprehensive logging system:

- **Structured Logging**: All logs include timestamp, level, component, and action
- **Multiple Levels**: Debug, info, warn, and error levels
- **Component Tracking**: Track which component generated each log
- **Action Tracking**: Track specific user actions
- **Console Output**: Development-friendly console output
- **Log Storage**: In-memory storage with retrieval capabilities

## 🔒 Validation

### URL Validation
- Valid URL format (must include protocol)
- Length restrictions
- Malformed URL detection

### Shortcode Validation
- 3-20 character length
- Alphanumeric characters only
- Uniqueness checking
- Reserved word avoidance

### Validity Period Validation
- 1-1440 minute range
- Integer values only
- Default value handling

## 🎨 UI/UX Features

- **Material Design**: Consistent Material UI design language
- **Responsive Layout**: Works on all screen sizes
- **Loading States**: Visual feedback during operations
- **Error States**: Clear error messaging and recovery options
- **Success Feedback**: Confirmation of successful operations
- **Tooltips**: Helpful tooltips for all interactive elements
- **Status Indicators**: Visual status chips and badges
- **Navigation**: Clear navigation between pages

## 📈 Performance

- **Client-side Processing**: All operations handled client-side
- **Efficient State Management**: Optimized React state updates
- **Lazy Loading**: Components loaded as needed
- **Memory Management**: Automatic cleanup of expired URLs
- **Optimized Rendering**: Efficient re-rendering strategies

## 🧪 Testing

The application is built with testing in mind:

- **TypeScript**: Compile-time error checking
- **Validation**: Comprehensive input validation
- **Error Boundaries**: React error boundaries for graceful failures
- **Logging**: Extensive logging for debugging

## 📝 License

This project is created for the Campus Hiring Evaluation and is intended for educational and evaluation purposes.

## 👥 Support

For any questions or issues related to this application, please refer to the comprehensive logging system which tracks all user interactions and system events for debugging purposes.