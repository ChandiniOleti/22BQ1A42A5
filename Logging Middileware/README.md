# Logging Middleware

This directory contains the logging middleware implementation as required by the Campus Hiring Evaluation.

## Features

- **Multiple Log Levels**: Support for debug, info, warn, and error levels
- **Structured Logging**: Each log entry includes timestamp, level, message, component, action, and optional data
- **Component Tracking**: Track which component generated each log entry
- **Action Tracking**: Track specific actions within components
- **Console Output**: Development-friendly console output with proper formatting
- **Log Storage**: In-memory storage with configurable limits
- **Log Retrieval**: Methods to filter and retrieve logs by various criteria
- **Statistics**: Get statistics about log entries by level and component

## Usage

```typescript
import { loggingMiddleware } from './LoggingMiddleware';

// Basic logging
loggingMiddleware.info('User action completed', { userId: 123 });
loggingMiddleware.warn('Validation warning', { field: 'email' });
loggingMiddleware.error('API call failed', { error: 'Network timeout' });

// Component and action tracking
loggingMiddleware.info(
  'URL shortened successfully', 
  { shortCode: 'abc123' }, 
  'URLShortener', 
  'createShortURL'
);

// Retrieve logs
const allLogs = loggingMiddleware.getLogs();
const errorLogs = loggingMiddleware.getLogs('error');
const componentLogs = loggingMiddleware.getLogs(undefined, 'URLShortener');

// Get statistics
const stats = loggingMiddleware.getLogStats();
console.log(`Total logs: ${stats.total}`);
console.log(`Error count: ${stats.byLevel.error}`);
```

## Configuration

```typescript
loggingMiddleware.updateConfig({
  enableConsoleOutput: true,
  maxLogEntries: 1000,
  logLevel: 'info' // Only log info, warn, and error (skip debug)
});
```

## Integration

The logging middleware is integrated into the React application through the `LoggingContext` in the main application. This provides a React-friendly interface while using the core logging functionality defined here.

## Requirements Compliance

This implementation satisfies the mandatory logging integration requirement specified in the Campus Hiring Evaluation document:

- ✅ Extensive use of logging middleware
- ✅ No use of inbuilt language loggers or console logging as primary logging mechanism
- ✅ Structured logging with metadata
- ✅ Component and action tracking
- ✅ Log storage and retrieval capabilities