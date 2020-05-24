<!--
# @title Webpacker
-->

# Installation with Webpacker

Super supports using Webpacker instead of Sprockets. Note though that you need
to set up ERB templates under Webpacker. There are no other requirements or
dependencies.

After adding `super` to your Gemfile and running the installation generator
according to the [Quick start guide](./quickstart.md), run the following:

```bash
bundle exec rails webpacker:install:erb # if you haven't already
bundle exec rails generate super:webpacker
```
