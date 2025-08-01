import React, { createContext, useContext, ReactNode } from 'react';
import { loggingMiddleware, LogEntry } from './LoggingMiddleware';

interface LoggingContextType {
  logInfo: (message: string, data?: any, component?: string, action?: string) => void;
  logWarn: (message: string, data?: any, component?: string, action?: string) => void;
  logError: (message: string, data?: any, component?: string, action?: string) => void;
  logDebug: (message: string, data?: any, component?: string, action?: string) => void;
  getLogs: () => LogEntry[];
  clearLogs: () => void;
}

const LoggingContext = createContext<LoggingContextType | undefined>(undefined);

export const useLogging = (): LoggingContextType => {
  const context = useContext(LoggingContext);
  if (!context) {
    throw new Error('useLogging must be used within a LoggingProvider');
  }
  return context;
};

interface LoggingProviderProps {
  children: ReactNode;
}

export const LoggingProvider: React.FC<LoggingProviderProps> = ({ children }) => {
  const logInfo = (message: string, data?: any, component?: string, action?: string) => {
    loggingMiddleware.info(message, data, component, action);
  };

  const logWarn = (message: string, data?: any, component?: string, action?: string) => {
    loggingMiddleware.warn(message, data, component, action);
  };

  const logError = (message: string, data?: any, component?: string, action?: string) => {
    loggingMiddleware.error(message, data, component, action);
  };

  const logDebug = (message: string, data?: any, component?: string, action?: string) => {
    loggingMiddleware.debug(message, data, component, action);
  };

  const getLogs = (): LogEntry[] => {
    return loggingMiddleware.getLogs();
  };

  const clearLogs = () => {
    loggingMiddleware.clearLogs();
  };

  const value: LoggingContextType = {
    logInfo,
    logWarn,
    logError,
    logDebug,
    getLogs,
    clearLogs,
  };

  return (
    <LoggingContext.Provider value={value}>
      {children}
    </LoggingContext.Provider>
  );
};