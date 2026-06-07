# Bradley Family Bath 2026 — Trip Website

Private family trip organiser. Access via GitHub Pages URL only — keep it private.

---

## 1. Create the GitHub repo

1. Go to **github.com → New repository**
2. Name it exactly: `bradley-bath-2026-r4f8jk2m`
3. Set visibility to **Public** (GitHub Pages requires this on free accounts — the URL is the secret)
4. Push the files in this folder to `main`

```bash
cd bradley-bath-2026-r4f8jk2m
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/YOUR_USERNAME/bradley-bath-2026-r4f8jk2m.git
git push -u origin main
```

## 2. Enable GitHub Pages

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch**, Branch: `main`, Folder: `/ (root)`
3. Save — site will be live at:

```
https://YOUR_USERNAME.github.io/bradley-bath-2026-r4f8jk2m/
```

Share this URL with the family. Don't post it publicly.

---

## 3. Set up Google Sheets sync (Shopping List)

### 3a. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet
2. Name it **"Bradley Bath 2026 — Shopping"** (or anything you like)

### 3b. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**
2. Delete the default `function myFunction() {}` placeholder
3. Copy the entire contents of `apps-script/Code.gs` from this repo and paste it in
4. Click **Save** (disk icon), name the project anything you like

### 3c. Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" → select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorise when prompted (it needs access to your spreadsheet)
6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXX/exec`

### 3d. Wire it into the website

Open `index.html` and find this line near the bottom:

```js
const SCRIPT_URL = '';
```

Replace it with your URL:

```js
const SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXXXX/exec';
```

Commit and push:

```bash
git add index.html
git commit -m "Add Apps Script URL"
git push
```

### 3e. Test it

- Open the live site, scroll to Shopping List — items should load from the sheet
- Add an item in the browser → it appears in the Google Sheet within seconds
- Tick a checkbox → the sheet updates
- Add a row directly in Google Sheets → refresh the page to see it

---

## Updating the site

Edit `index.html` directly (schedule changes, notes, etc.) and push to `main`. GitHub Pages deploys automatically within ~60 seconds.

---

## Map embed note

The property map uses a placeholder Google Maps embed. For a sharper embed, replace the iframe `src` in `index.html` with a proper embed from [google.com/maps](https://www.google.com/maps) → Share → Embed a map.
