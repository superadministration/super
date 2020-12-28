# Super

![Unit tests status](https://github.com/zachahn/super/workflows/Unit%20tests/badge.svg?branch=master)
[![Gem](https://img.shields.io/gem/v/super)][gem]
[![Try the demo](https://img.shields.io/badge/try-demo-blue)][super_demo]


Super is an admin framework for Ruby on Rails applications. Super helps you make
powerful admin pages quickly so that you can concentrate on the parts of your
app that make it great.

Super strives to let engineers build great admin pages quickly and easily by:

* Providing a useful CRUD interface
* Relying on Rails' built in features whenever possible
* Preferring plain Ruby objects rather than requiring DSLs
* Supporting a wide range of Ruby and Rails versions
* Having zero dependencies


Super has no dependencies. That means when you install Super, only Super gets
added to your `Gemfile.lock`. This leads to many benefits:

* Super doesn't require common Rails libraries like [Kaminari][Kaminari],
  [Devise][Devise], or [Sass][Sass], so it'll never conflict with the libraries
  you have installed. If you want to upgrade Super, you won't have to upgrade
  any of your other gems. And if you want to upgrade your other gems, you won't
  have to upgrade Super! This will greatly reduce your maintenance burden since
  your admin framework won't dictate which libraries and which versions your
  application uses.
* All code has the possibility of bugs and security issues, whether they're
  written by you or by others. Having fewer dependencies can reduce the risk of
  introducing problems into your application.


## Features

* Sprockets and Webpacker compatibility
    * Note: Webpacker support depends on one additional NPM package for parsing
      ERB
* Configurable forms (new and edit forms)
    * Nested associations are supported out of the box
* Configurable display (index and show tables)
* Pre-built frontend assets (doesn't require Sass, PostCSS, Babel, etc)
    * Vendored assets include
        * Stimulus JS
        * Rails UJS
        * Tailwind CSS
* Supports Rails 5.0+, Ruby 2.3+


## Super doesn't fit my needs. What should I look at?

There are lots of Rails admin frameworks. I've personally used
[ActiveAdmin][ActiveAdmin] and [Administrate][Administrate], and I had some
brief exposure to [RailsAdmin][RailsAdmin].

If you need a ton of features, I'd probably suggest looking at ActiveAdmin. It
relies pretty heavily on DSLs but is pretty flexible and popular.

I like Administrate as well. I found that it doesn't have quite as many features
as ActiveAdmin, but it's nice and feels like developing a normal Rails app.
There's no DSL.


## Paid editions

If you have additional requirements, there are some paid editions to consider:

**Super Premium** provides:

* Priority email support
* Ensuring long term development of Super

**Super Professional** provides everything in Premium and:

* Productivity improvements and quality of life features for admins
* An LGPL exemption

They aren't available yet. Contact me if you're interested, or subscribe to the
[newsletter][newsletter] to be notified of its availability and for brief,
occasional updates to Super.


## Demos

* [Super Demo][super_demo]
    * [Super Demo source][super_demo_source]


## Installation and Usage

See [Quick start](./docs/quick_start.md)


## Path to 1.0

See [STABILITY](./STABILITY.md)


## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md)


## License

The gem is available under the terms of the [GNU LGPLv3](./LICENSE).


[gem]: https://rubygems.org/gems/super
[Administrate]: https://github.com/thoughtbot/administrate
[ActiveAdmin]: https://github.com/activeadmin/activeadmin
[RailsAdmin]: https://github.com/sferik/rails_admin
[Kaminari]: https://github.com/kaminari/kaminari
[Devise]: https://github.com/heartcombo/devise
[Sass]: https://github.com/sass/sassc-ruby
[newsletter]: https://tinyletter.com/zachahn
[super_demo]: https://demo-super.herokuapp.com/admin/members
[super_demo_source]: https://github.com/zachahn/super_demo
