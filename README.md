# Public assets (copied to site root when building)

Place these files here so they appear on the deployed site:

**Videos:**
- **phoneanimmob.mp4** – Hero background (mobile)
- **phoneanimpc.mp4** – Hero background (desktop)
- **chipbg.mp4** – Tech Stack section background

**Resume (opens in new tab when user clicks “Resume”):**
- **ASWIN K B ressume.pdf** – name must match exactly (including spaces)

Then commit and push:

```bash
git add public/*.mp4
git commit -m "Add video assets for GitHub Pages"
git push origin main
```
