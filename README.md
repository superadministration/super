# Super

Super is a zero dependency admin framework for Ruby on Rails applications.

Its mission: to evade dependencies, to improve developer productivity and admin
efficiency, to go where no one has gone before. Most of the alternatives I tried
were either too limited or required a large and complicated DSL for
configuration.

Super is built be powerful but to stay out of your way; it should be easier to
maintain relative to other admin frameworks. Because of its lack of
dependencies, for example, it'll stay out of your way when you have to upgrade
your application's Rails version or any other gem.


## Features

* Sprockets and Webpacker compatibility
    * Note: Webpacker support depends on one additional NPM package for parsing
      ERB
* Pagination
* Configurable forms (new and edit forms)
* Configurable display (index and show tables)
* Supports Rails 5.0+, Ruby 2.3+
* Configurable without a DSL
* Looks reasonably nice and modern
* Pre-built frontend assets (doesn't require Sass, PostCSS, Babel, etc)
    * Vendored assets include
        * Stimulus JS
        * Tailwind CSS
        * Feather icons

Super was inspired in part by the admin frameworks [ActiveAdmin][activeadmin]
and [Administrate][administrate]. If Super doesn't quite fit your requirements
at this moment, one of those might meet your needs better.


## Professional edition

Super Professional is a paid add-on and provides additional benefits:

* Feature: Filtering by column values
* Priority email support
* Supporting long term development of Super
* An LGPL exemption

It will be available soon. Subscribe to the [newsletter][newsletter] to be
notified of its availability or for brief, occasional updates.


## Demos

* [Super Demo][super_demo]
    * [Super Demo source][super_demo_source]
* [Super Professional Demo][super_professional]


## Usage

### Creating new admin pages

```bash
$ bundle exec rails g super:resource Thing # check out the `--help` option!
```

The example above will create the appropriate admin controller. It generates a
`Controls` class inside the controller as well; it's where most configuration
lives. You generally won't need to edit the controller actions themselves.

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
[super_demo]: https://demo-super.herokuapp.com/admin/members
[super_demo_source]: https://github.com/zachahn/super_demo
[super_professional]: https://demo-super-professional.herokuapp.com/admin/members
