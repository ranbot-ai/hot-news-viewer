# Hot News Viewer

Web app built with Next.js and TypeScript to display trending hot news from multiple sources (抖音, B 站, 网易新闻) in a beautiful, responsive card UI.

## Features

- **Multiple News Sources**: Douyin, Bilibili, and 163 News (网易新闻) with easy source switching and prominent, icon-labeled tabs.
- **Unified Card Layout**: Each news card shows title, rank (with frosted badge), views, likes, comments, cover image, hot value, event date, recommendation reason, and location.
- **Backend Normalization**: All sources normalized to a unified structure for easy extension.
- **Image Proxy**: Handles hotlinking issues (esp. Bilibili) for reliable image display.
- **Error Handling & Deduplication**: Robust fallback logic for missing/invalid data, deduplication, and user-friendly error messages.
- **Extensible & Modular**: Easily add new sources or card fields.
- **Production Ready**: Clean, maintainable codebase with CI/CD support.

## Getting Started

```bash
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

- Push to GitLab: triggers auto-deploy via `.gitlab-ci.yml`
- Standard Next.js build: `yarn build && yarn start`

## Extending & Contributing

- Add new sources in `lib/sources/` and corresponding API routes in `pages/api/`.
- Update card UI in `components/NewsCard.tsx`.
- Utilities for formatting are in `lib/`.
- PRs and suggestions welcome!

## Credits

- Built by Encore Shao
- [GitHub](https://github.com/ranbot-ai) | [LinkedIn](https://linkedin.com/in/ranbot-ai) | [RanBOT](https://ranbot.online)
