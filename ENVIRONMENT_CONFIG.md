# Environment Configuration

## Overview

The API URL is now configurable through Angular environment files instead of being hardcoded.

## Files

- `src/environments/environment.ts` - Development configuration
- `src/environments/environment.prod.ts` - Production configuration

## Configuration

### Development (default)

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api", // Change this URL
};
```

### Production

Edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: "https://your-production-api.com/api", // Change this URL
};
```

## Usage

The `MangaService` automatically uses the correct environment:

```typescript
import { environment } from '../../environments/environment';

private readonly baseUrl = environment.apiUrl;
```

## Build Commands

```bash
# Development (uses environment.ts)
npm start
# or
ng serve

# Production (uses environment.prod.ts)
npm run build
# or
ng build --configuration=production
```

## Adding New Environment Variables

1. Add the variable to both environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api",
  newVariable: "dev-value",
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: "https://api.example.com/api",
  newVariable: "prod-value",
};
```

2. Use it in your service/component:

```typescript
import { environment } from "../environments/environment";

const value = environment.newVariable;
```

## Example: Different Backend URLs

### Local Development

```typescript
apiUrl: "http://localhost:8080/api";
```

### Staging

```typescript
apiUrl: "https://staging-api.mangauniversal.com/api";
```

### Production

```typescript
apiUrl: "https://api.mangauniversal.com/api";
```

## Notes

- Environment files are compile-time replacements, not runtime
- Changes require rebuilding the application
- Never commit sensitive data (API keys, secrets) to environment files
- For true secrets, use server-side environment variables or a secrets manager
