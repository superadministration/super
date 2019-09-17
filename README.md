# Super

Super is a single dependency admin framework for Ruby on Rails applications.

Its mission: to evade dependencies, to improve developer productivity and admin
efficiency, to go where no one has gone before. Most of the alternatives I tried
were either too limited or required a large and complicated DSL for
configuration.

Super is built be powerful but to stay out of your way; it should be easier to
maintain relative to other admin frameworks. Because of its lack of
dependencies, for example, it'll stay out of your way when you have to upgrade
your application's Rails version or any other gem.


## Features

* Fully compatible with both Sprockets and Webpacker
  * Note: Webpacker support depends on one additional NPM package for parsing
    ERB
* Built in pagination
* Configurable forms (new and edit forms)
* Configurable display (index and show tables)
* Supports Rails 5.0+, Ruby 2.3+
* Configurable without a DSL
* Looks reasonably nice and modern
* All assets are vendored (doesn't require Sass, PostCSS, Babel, etc)

Super was inspired in part by the admin frameworks [ActiveAdmin](activeadmin)
and [Administrate](administrate). If Super doesn't quite fit your requirements
at this moment, one of those might meet your needs better.


## Professional edition

Super Professional is a paid add-on and provides additional benefits:

* Feature: Filtering by column values
* Priority email support
* Supporting long term development of Super
* An LGPL exemption

It will be available soon. Subscribe to the [newsletter](newsletter) to be
notified of its availability or for brief, occasional updates.


## Demos

* [Super Demo](https://demo-super.herokuapp.com/admin/members)
  * [Super Demo source](https://github.com/zachahn/super_demo)
* [Super Professional Demo](https://demo-super-professional.herokuapp.com/admin/members)


## Usage

### Creating new admin pages

```bash
$ bundle exec rails g super:resource Thing # check out the `--help` option!
```

In the example above, it will create two files, the appropriate admin controller
and its related "dashboard" file. The dashboard file is where most configuration
lives, so it's unlikely you'll need to modify the controller.

In addition, you'll have to manually update your routes file. It'll probably
look something like the following:

```ruby
namespace :admin do
  resources :things
end
```


## Installation

Add this line to your application's Gemfile:

```ruby
gem "super"
```

And then execute:

```bash
$ bundle install
$ bundle exec rails g super:install # check out the `--help` option!
```

Super supports using Webpacker instead of Sprockets. Note though that you need
to set up ERB templates under Webpacker. There are no other requirements or
dependencies.

```bash
$ bundle exec rails webpacker:install:erb # if you haven't already
$ bundle exec rails g super:webpacker
```

Lastly, update your Super initializer

```ruby
Super.configuration do |c|
  # ...
  c.asset_handler = Super::Assets.webpacker
end
```


## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md)


## License

The gem is available under the terms of the [GNU LGPLv3](./LICENSE).


[administrate]: https://github.com/thoughtbot/administrate
[activeadmin]: https://github.com/activeadmin/activeadmin
[newsletter]: https://tinyletter.com/zachahn
