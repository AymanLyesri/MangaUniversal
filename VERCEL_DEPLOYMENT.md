# Deploying to Vercel

## Environment Variables Setup

### 1. In Vercel Dashboard

Go to your project → Settings → Environment Variables

Add:

```
Name: NG_APP_API_URL
Value: https://your-backend-api.com/api
Environment: Production
```

### 2. Build Configuration

Vercel will automatically:

- Detect Angular project
- Run `npm run build`
- Use environment variables during build

### 3. Optional: Create vercel.json

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build -- --configuration=production",
  "outputDirectory": "dist/manga-universal",
  "framework": "angular",
  "env": {
    "NG_APP_API_URL": "@ng_app_api_url"
  }
}
```

### 4. Using Build Script (Alternative)

Create a build script that replaces the API URL:

**package.json:**

```json
{
  "scripts": {
    "build": "ng build",
    "build:vercel": "node replace-env.js && ng build --configuration=production"
  }
}
```

**replace-env.js:**

```javascript
const fs = require("fs");
const path = require("path");

const envFile = path.join(__dirname, "src/environments/environment.prod.ts");
const apiUrl = process.env.NG_APP_API_URL || "http://localhost:8080/api";

const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(envFile, content);
console.log("Environment file generated with API URL:", apiUrl);
```

Then in Vercel:

- Build Command: `npm run build:vercel`
- Environment Variable: `NG_APP_API_URL=https://your-api.com/api`

## Quick Setup Steps

### Option 1: Simple (Use template)

1. **Copy template:**

   ```bash
   cp src/environments/environment.prod.ts.template src/environments/environment.prod.ts
   ```

2. **Edit with your production URL:**

   ```typescript
   apiUrl: "https://your-production-api.com/api";
   ```

3. **Commit and push** (since .gitignore excludes it, only you have it)

4. **Deploy to Vercel** - it will use your local production file

### Option 2: Dynamic (Use Vercel env vars)

1. **Create `replace-env.js`** (as shown above)

2. **Update package.json** scripts

3. **In Vercel Dashboard:**

   - Set `NG_APP_API_URL` environment variable
   - Change build command to `npm run build:vercel`

4. **Commit and push**

## Recommended Approach for Vercel

Use **Option 2** (build script) because:

- ✅ API URL not in code
- ✅ Can change URL without redeploying code
- ✅ Different URLs for preview/production
- ✅ Team members don't need production URL

## Environment Variables in Vercel

### Production

```
NG_APP_API_URL = https://api.mangauniversal.com/api
```

### Preview (optional)

```
NG_APP_API_URL = https://staging-api.mangauniversal.com/api
```

### Development (optional)

```
NG_APP_API_URL = http://localhost:8080/api
```

## Testing Locally

```bash
# Test the build script
NG_APP_API_URL=https://test-api.com/api npm run build:vercel

# Check the generated file
cat dist/manga-universal/main.*.js | grep "test-api.com"
```

## Troubleshooting

**Build fails on Vercel:**

- Check Node version (should be 16+)
- Verify environment variable name matches
- Check build logs for errors

**API URL not updating:**

- Make sure to use the build:vercel script
- Clear Vercel cache and redeploy
- Check environment variable is set in correct environment

**CORS errors:**

- Backend must allow your Vercel domain
- Add Vercel domain to CORS whitelist
