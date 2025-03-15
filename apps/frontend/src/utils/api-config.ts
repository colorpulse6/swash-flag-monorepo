/**
 * API configuration utility that prioritizes runtime configuration over build-time environment variables.
 * This allows the application to use the correct API URL even when deployed to different environments.
 */

declare global {
  interface Window {
    RUNTIME_CONFIG?: {
      API_URL: string;
      ENVIRONMENT: string;
      BUILD_TIME: string;
    };
  }
}

// Default configuration fallbacks
const defaultConfig = {
  apiUrl: 'http://localhost:4000',
  environment: 'development',
};

// Build-time environment variables from Vite
const buildTimeConfig = {
  apiUrl: import.meta.env.VITE_API_URL || defaultConfig.apiUrl,
  environment: import.meta.env.VITE_APP_ENV || defaultConfig.environment,
};

// Get runtime configuration
function getRuntimeConfig() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.RUNTIME_CONFIG) {
    return {
      apiUrl: window.RUNTIME_CONFIG.API_URL,
      environment: window.RUNTIME_CONFIG.ENVIRONMENT,
    };
  }
  return null;
}

// Export the final configuration, prioritizing runtime > build-time > defaults
const config = {
  // Use runtime config if available, otherwise fall back to build-time config
  apiUrl: getRuntimeConfig()?.apiUrl || buildTimeConfig.apiUrl,
  environment: getRuntimeConfig()?.environment || buildTimeConfig.environment,
  isProduction: (getRuntimeConfig()?.environment || buildTimeConfig.environment) === 'prod',
  isDevelopment: (getRuntimeConfig()?.environment || buildTimeConfig.environment) === 'dev',
  isStaging: (getRuntimeConfig()?.environment || buildTimeConfig.environment) === 'staging',
};

export default config; 