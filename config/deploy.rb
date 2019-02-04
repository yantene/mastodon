# frozen_string_literal: true

lock '3.11.0'

set :repo_url, ENV.fetch('REPO', 'https://github.com/fla-red/mastodon.git')
set :branch, ENV.fetch('VERSION', 'fla.red')

set :application, 'mastodon'
set :rbenv_ruby, File.read('.ruby-version').strip
set :migration_role, :app

#append :linked_files, 'public/robots.txt'
append :linked_dirs, 'vendor/bundle', 'node_modules', 'public/system'
