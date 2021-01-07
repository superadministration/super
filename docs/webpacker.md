<!--
# @title Webpacker
-->

# Installation with Webpacker

Super supports using Webpacker instead of Sprockets. You'll first need to set up
Webpacker to handle ERB templates.

After installing Super (see the [Installation guide](./installation.md)), run
one the following:

## Webpacker 4 and 5

```bash
bundle exec rails webpacker:install:erb # if you haven't already
bundle exec rails generate super:webpacker
```

## Webpacker 6

```bash
yarn add rails-erb-loader # if you haven't already
bundle exec rails generate super:webpacker
```
