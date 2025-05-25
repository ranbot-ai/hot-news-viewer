module.exports = {
  apps: [
    {
      name: "hot-news-viewer",
      script: "yarn",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      out_file: `${process.env.DEPLOY_PATH || "/var/www/production/hot-news-viewer"}/current/log/out.log`,
      error_file: `${process.env.DEPLOY_PATH || "/var/www/production/hot-news-viewer"}/current/log/error.log`,
      log_date_format: "YYYY-MM-DD HH:mm Z"
    }
  ]
}