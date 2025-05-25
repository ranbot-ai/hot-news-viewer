# frozen_string_literal: true

require 'mina/deploy'
require 'mina/git'
require 'mina/yarn'

set :env, 'production'
set :branch, ENV['BRANCH'] || 'main'
set :domain, 'ranbot.online'

set :execution_mode, :system
set :application_name, 'hot-news-viewer'

set :repository, "https://github.com/ranbot-ai/#{fetch(:application_name)}.git"
set :deploy_to, "/var/www/#{fetch(:env)}/#{fetch(:application_name)}"

set :nodejs_version, '22.16.0'
set :user, ENV['SSH_USER'] || `whoami`.chop
set :forward_agent, true

set :shared_dirs, fetch(:shared_dirs, []).push('node_modules', 'log', 'config', 'yarn_cache')
set :shared_files, fetch(:shared_files, []).push('.env')

set :yarn_cache_folder, "#{fetch(:shared_path)}/yarn_cache"

task :remote_environment do
  command %{export NVM_DIR="$HOME/.nvm"}
  command %{[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"}
  command %{nvm use #{fetch(:nodejs_version)}}
end

task :yarn_install do
  command %{yarn config set cache-folder "#{fetch(:yarn_cache_folder)}"}
  command %{export YARN_CACHE_FOLDER=#{fetch(:yarn_cache_folder)}}

  command %{$(which yarn) install --frozen-lockfile}
  command %{$(which yarn) build}
end

task :restart_pm2 do
  command %{$(which pm2) restart "hot-news-viewer" || $(which pm2) start ecosystem.config.js}
end

desc 'Deploys the current version to the server.'
task :deploy do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'remote_environment'
    invoke :'yarn_install'
    invoke :'restart_pm2'
  end
end