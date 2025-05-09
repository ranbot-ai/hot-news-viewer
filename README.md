# Hot News Viewer

A modern TypeScript web app to display trending hot news from multiple sources (starting with Douyin), with a beautiful card UI and source switching. Includes GitLab CI/CD for auto-deployment.

## Features

- Hot news cards: title, rank, views, cover image, hot value, event date
- Multiple news sources (Douyin, more coming)
- Source switcher UI
- Responsive, modern design
- Auto-deploy via GitLab CI

## Getting Started

```bash
yarn install
yarn run dev
```

## Deployment

- Push to GitLab: triggers auto-deploy via `.gitlab-ci.yml`

## Extending

- Add new sources in `lib/sources/`
- Update UI in `components/`
