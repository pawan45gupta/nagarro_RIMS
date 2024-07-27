// utils/logger.js
const logError = (error, context = '') => {
  console.error(`[Error - ${new Date().toISOString()}] ${context}:`, error);
};

const logInfo = (message, context = '') => {
  console.info(`[Info - ${new Date().toISOString()}] ${context}:`, message);
};

export { logError, logInfo };
