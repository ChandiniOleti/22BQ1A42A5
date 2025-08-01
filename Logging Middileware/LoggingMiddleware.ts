/**
 * Logging Middleware for URL Shortener Application
 * 
 * This middleware provides comprehensive logging functionality as required
 * by the Campus Hiring Evaluation requirements.
 * 
 * Features:
 * - Multiple log levels (info, warn, error, debug)
 * - Structured logging with metadata
 * - Component and action tracking
 * - Console output for development
 * - Log storage and retrieval
 */

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
  component?: string;
  action?: string;
  userAgent?: string;
  url?: string;
}

export interface LoggingConfig {
  enableConsoleOutput: boolean;
  maxLogEntries: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

class LoggingMiddleware {
  private logs: LogEntry[] = [];
  private config: LoggingConfig;

  constructor(config: Partial<LoggingConfig> = {}) {
    this.config = {
      enableConsoleOutput: true,
      maxLogEntries: 1000,
      logLevel: 'debug',
      ...config
    };
  }

  private shouldLog(level: LogEntry['level']): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    data?: any,
    component?: string,
    action?: string
  ): LogEntry {
    const logEntry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level,
      message,
      data,
      component,
      action,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    // Add to logs array
    this.logs.push(logEntry);

    // Maintain max log entries
    if (this.logs.length > this.config.maxLogEntries) {
      this.logs = this.logs.slice(-this.config.maxLogEntries);
    }

    // Console output if enabled
    if (this.config.enableConsoleOutput && this.shouldLog(level)) {
      this.outputToConsole(logEntry);
    }

    return logEntry;
  }

  private outputToConsole(logEntry: LogEntry): void {
    const timestamp = logEntry.timestamp.toISOString();
    const component = logEntry.component ? `[${logEntry.component}]` : '';
    const action = logEntry.action ? `[${logEntry.action}]` : '';
    const prefix = `${timestamp} ${component}${action}`;
    
    const message = `${prefix} ${logEntry.message}`;

    switch (logEntry.level) {
      case 'error':
        console.error(message, logEntry.data);
        break;
      case 'warn':
        console.warn(message, logEntry.data);
        break;
      case 'debug':
        console.debug(message, logEntry.data);
        break;
      default:
        console.log(message, logEntry.data);
    }
  }

  // Public logging methods
  public info(message: string, data?: any, component?: string, action?: string): LogEntry {
    return this.createLogEntry('info', message, data, component, action);
  }

  public warn(message: string, data?: any, component?: string, action?: string): LogEntry {
    return this.createLogEntry('warn', message, data, component, action);
  }

  public error(message: string, data?: any, component?: string, action?: string): LogEntry {
    return this.createLogEntry('error', message, data, component, action);
  }

  public debug(message: string, data?: any, component?: string, action?: string): LogEntry {
    return this.createLogEntry('debug', message, data, component, action);
  }

  // Log retrieval methods
  public getLogs(level?: LogEntry['level'], component?: string): LogEntry[] {
    let filteredLogs = [...this.logs];

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level);
    }

    if (component) {
      filteredLogs = filteredLogs.filter(log => log.component === component);
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public getLogsByDateRange(startDate: Date, endDate: Date): LogEntry[] {
    return this.logs.filter(log => 
      log.timestamp >= startDate && log.timestamp <= endDate
    ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public clearLogs(): void {
    this.logs = [];
    if (this.config.enableConsoleOutput) {
      console.log('Logging middleware: All logs cleared');
    }
  }

  public getLogStats(): {
    total: number;
    byLevel: Record<LogEntry['level'], number>;
    byComponent: Record<string, number>;
  } {
    const stats = {
      total: this.logs.length,
      byLevel: {
        debug: 0,
        info: 0,
        warn: 0,
        error: 0
      } as Record<LogEntry['level'], number>,
      byComponent: {} as Record<string, number>
    };

    this.logs.forEach(log => {
      stats.byLevel[log.level]++;
      
      if (log.component) {
        stats.byComponent[log.component] = (stats.byComponent[log.component] || 0) + 1;
      }
    });

    return stats;
  }

  // Configuration methods
  public updateConfig(newConfig: Partial<LoggingConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.info('Logging configuration updated', newConfig, 'LoggingMiddleware', 'updateConfig');
  }

  public getConfig(): LoggingConfig {
    return { ...this.config };
  }
}

// Create and export singleton instance
export const loggingMiddleware = new LoggingMiddleware();

// Export class for custom instances if needed
export { LoggingMiddleware };