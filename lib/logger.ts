/**
 * Logger utility for consistent logging across the application
 * Controls log visibility based on environment and debug settings
 */

// Determine if we're in production or development
const isProduction = process.env.NODE_ENV === 'production';

// Set this to true to allow logging in production (for critical errors only)
const ALLOW_PRODUCTION_LOGS = false;

// Debug levels
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

// Define colors for different log types
const logColors = {
  [LogLevel.INFO]: '#3498db',
  [LogLevel.WARN]: '#f39c12',
  [LogLevel.ERROR]: '#e74c3c',
  [LogLevel.DEBUG]: '#9b59b6'
};

/**
 * Log a message with the specified level and module
 */
export function log(
  level: LogLevel, 
  module: string, 
  message: string, 
  data?: any
) {
  // Skip logs in production unless explicitly allowed
  if (isProduction && !ALLOW_PRODUCTION_LOGS) return;
  
  // Format the log message
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${module}] ${message}`;

  switch (level) {
    case LogLevel.INFO:
      console.log(`%c${formattedMessage}`, `color: ${logColors[level]}`, data);
      break;
    case LogLevel.WARN:
      console.warn(`%c${formattedMessage}`, `color: ${logColors[level]}`, data);
      break;
    case LogLevel.ERROR:
      console.error(`%c${formattedMessage}`, `color: ${logColors[level]}`, data);
      break;
    case LogLevel.DEBUG:
      console.debug(`%c${formattedMessage}`, `color: ${logColors[level]}`, data);
      break;
  }
}

// Convenience methods
export const logInfo = (module: string, message: string, data?: any) => 
  log(LogLevel.INFO, module, message, data);

export const logWarn = (module: string, message: string, data?: any) => 
  log(LogLevel.WARN, module, message, data);

export const logError = (module: string, message: string, data?: any) => 
  log(LogLevel.ERROR, module, message, data);

export const logDebug = (module: string, message: string, data?: any) => 
  log(LogLevel.DEBUG, module, message, data);

export default {
  log,
  info: logInfo,
  warn: logWarn,
  error: logError,
  debug: logDebug
}; 