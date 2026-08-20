# Ylyssa Kaye Cepriano — Portfolio

Interactive Next.js portfolio for online job applications.

## Included

- MAO CertGen with real UI gallery
- Pabili Po! mobile UI gallery
- Manukan Tracker mobile UI gallery
- Classroom Suite UI gallery + live Vercel link
- Professional experience, education, credentials, skills, and contact details
- Scroll-reveal animations, hover motion, interactive galleries, and screenshot lightbox
- `Ctrl + Y` developer terminal Easter egg
- Responsive desktop and mobile layouts
- Reduced-motion accessibility support

## Run locally on Windows

Open the project folder in VS Code. The terminal must be inside the folder that contains `package.json`.

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

To stop the local server, press `Ctrl + C`.

## Edit personal information

Most portfolio text and links are centralized in:

```text
src/data/portfolio.ts
```

Change the temporary email, social links, project descriptions, skills, or status there.

## Project screenshots

Screenshots used by the project galleries are stored in:

```text
public/projects/
├── certgen/
├── pabili/
├── manukan/
└── classroom/
```

The public gallery intentionally avoids MAO CertGen screenshots containing visible farmer/AEW personal records and avoids Pabili Po!/Manukan profile screenshots containing contact/account details.

## Production check

Before deployment, run:

```powershell
npm.cmd run build
```

If the build succeeds, the project is ready for GitHub/Vercel deployment.

## Personal contact configuration

Edit `src/data/portfolio.ts` → `contactChannels` to add your public SMS number, Facebook profile/page, Instagram profile, and Telegram username/link. Gmail and LinkedIn are already configured.

Recommended link formats:

- SMS: `sms:+639XXXXXXXXX`
- Facebook: `https://www.facebook.com/your.username`
- Instagram: `https://www.instagram.com/your.username/`
- Telegram: `https://t.me/yourusername`

## Diploma & certificates

Training-certificate previews are stored in `public/credentials/`.

The actual BSIT diploma was not included in the supplied files, so the project contains an explicit placeholder at `public/credentials/bsit-diploma-placeholder.svg`. When you have your scanned diploma, save it as `public/credentials/bsit-diploma.png` and update the BSIT education item in `src/data/portfolio.ts` from the placeholder path to `/credentials/bsit-diploma.png`, then set `documentPlaceholder: false`.
