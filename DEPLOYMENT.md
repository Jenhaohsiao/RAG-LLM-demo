# 🚀 Quick Deployment Guide

## Prerequisites
- GitHub account
- Gemini API Key ([Get here](https://aistudio.google.com/app/apikey))

## Option 1: Deploy to Vercel (Recommended - 5 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `VITE_API_KEY`
     - Value: Your Gemini API Key
   - Click "Deploy"
   - Done! Your app will be live at `<project-name>.vercel.app`

## Option 2: Deploy to Netlify (5 minutes)

1. **Push to GitHub** (same as above)

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variable:
     - Key: `VITE_API_KEY`
     - Value: Your Gemini API Key
   - Click "Deploy site"
   - Done! Your app will be live at `<site-name>.netlify.app`

## Option 3: Deploy to Azure Static Web Apps (10 minutes)

1. **Prerequisites**
   - Azure account ([Free tier available](https://azure.microsoft.com/free/))
   - Azure CLI installed

2. **Deploy**
   ```bash
   # Login to Azure
   az login

   # Create resource group
   az group create --name rag-demo-rg --location eastus

   # Create static web app
   az staticwebapp create \
     --name rag-storyteller \
     --resource-group rag-demo-rg \
     --source https://github.com/<your-username>/<your-repo> \
     --location eastus \
     --branch main \
     --app-location "/" \
     --output-location "dist" \
     --login-with-github
   ```

3. **Set environment variable**
   - Go to Azure Portal
   - Find your Static Web App
   - Click "Configuration" → "Application settings"
   - Add: `VITE_API_KEY` = Your Gemini API Key
   - Save

## Testing Your Deployment

After deployment, test your app:

1. ✅ Navigate to your deployment URL
2. ✅ Select a book from the left panel
3. ✅ Configure AI role and tone
4. ✅ Ask a question about the book
5. ✅ Verify AI responds appropriately
6. ✅ Test layout controls (hover, lock, maximize)

## Troubleshooting

### Issue: "API Key missing" error
**Solution**: Ensure `VITE_API_KEY` is set in your deployment platform's environment variables

### Issue: Build fails
**Solution**: 
- Check Node.js version (requires v18+)
- Verify `package.json` dependencies
- Check build logs for specific errors

### Issue: White screen after deployment
**Solution**:
- Clear browser cache
- Check browser console for errors
- Verify all files in `dist/` were deployed

### Issue: API quota exceeded
**Solution**: Check your Gemini API quota at [Google AI Studio](https://aistudio.google.com/)

## Custom Domain (Optional)

### Vercel
1. Go to project settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

### Azure
1. Go to Static Web App → Custom domains
2. Add custom domain
3. Validate ownership

## Performance Optimization

After deployment, consider:

1. **Enable CDN**: All platforms provide this by default
2. **Monitor API usage**: Set up alerts in Google AI Studio
3. **Analytics**: Add Google Analytics or similar
4. **Error tracking**: Integrate Sentry or LogRocket

## Cost Estimation

- **Hosting**: Free on all platforms (with limits)
- **Gemini API**: Free tier includes 15 requests/minute
- **Custom domain**: ~$10-15/year (optional)

**Total**: $0/month (free tier) or ~$1/month (paid tier)

## Next Steps

1. 🎨 Customize book content in `constants.ts`
2. 🔧 Implement real Vector DB (Pinecone, Weaviate)
3. 📊 Add analytics and monitoring
4. 🔐 Implement API key proxy for security
5. 🌐 Add internationalization (i18n)

---

**Need help?** Check the main [README_ZH.md](README_ZH.md) or create an issue on GitHub.
