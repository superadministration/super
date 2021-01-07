<!--
# @title Quick start
-->

# Quick start

See [Installation](./installation.md) for the installation guide.


## Usage

### Creating new admin pages

```bash
bundle exec rails generate super:resource Thing # check out the `--help` option!
```

The example above will create a controller called `Admin::ThingsController`. It
generates a `Controls` class inside the controller as well; it's where most
configuration lives. See the documentation on [Controls](./controls.md) for more
info.

You'll have to manually update your routes file. It'll probably look something
like the following:

```ruby
namespace :admin do
  resources :things
end
```
