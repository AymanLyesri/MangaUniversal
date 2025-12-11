const fs = require('fs');
const path = require('path');

// Get API URL from environment variable
const apiUrl = process.env.NG_APP_API_URL || 'http://localhost:8080/api';

// Path to environment file
const envFile = path.join(__dirname, 'src/environments/environment.prod.ts');

// Generate environment file content
const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

// Write the file
fs.writeFileSync(envFile, content);

console.log('✅ Environment file generated successfully!');
console.log('📍 API URL:', apiUrl);
