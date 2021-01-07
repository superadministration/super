# Super

![Unit tests status](https://github.com/zachahn/super/workflows/Unit%20tests/badge.svg?branch=master)
[![Gem](https://img.shields.io/gem/v/super)][gem]
[![Try the demo](https://img.shields.io/badge/try-demo-blue)][demo]


Super is an admin framework for Ruby on Rails applications. Super helps you make
powerful admin pages quickly so that you can concentrate on the parts of your
app that make it great.

Super strives to let engineers build great admin pages quickly and easily by:

* Providing a configurable CRUD interface with usable defaults
* Building on top of standard Rails controllers and ERB views
* Preferring plain Ruby objects and initializers instead of DSLs


Super's distinguishing feature is that it's easy to maintain in your
application. It does this by:

* Supporting a wide range of Ruby (2.3–3.0+) and Rails (5.0–6.1+) versions,
  which makes it easy to upgrade your Ruby and Rails versions without breaking
  your admin pages
* Having zero dependencies, so that you can upgrade your app's dependencies
  without affecting your admin pages (or upgrade your admin pages without
  worrying it might break your app)


Note: There may be lots of breaking changes since Super is still fairly young.
See the [stability doc](./STABILITY.md) for an idea of what might be changed.


## Features

* Responsive and mobile-friendly
* Compatible with Sprockets and Webpacker
* Configurable forms
    * Supports nested attributes `accepts_nested_attributes_for`
* Configurable display (index and show tables)
* Advanced filtering for ActiveRecord
* Pre-built frontend assets (doesn't require Sass, PostCSS, Babel, etc)
    * Vendored assets include
        * Stimulus JS
        * Tailwind CSS
        * Rails UJS
* Supports Rails 5.0+, Ruby 2.3+


See the [demo][demo] and its [source][demo_source] for an example of some of its
features.


## Installation and Usage

See [Installation](./docs/quick_start.md) and
[Quick start](./docs/quick_start.md)


## Editions

There are several editions to consider.

**Super FOSS** provides:

* A great admin framework that's free and easy to maintain
* Community support, see the [discussion forum][discussions]

**Super Premium** (not available yet) provides:

* Private email support
* Ensuring long term development of Super

**Super Professional** (not available yet) provides everything in Premium and:

* Productivity improvements and quality of life features for admins
* An LGPL exemption

Subscribe to the [newsletter][newsletter] to be notified of their availabilities
and for brief, quarterly-at-most updates to Super.


## Super doesn't fit my needs. What are some alternatives?

[ActiveAdmin](https://github.com/activeadmin/activeadmin) is great if you need
lots of features. It relies heavily on DSLs but is flexible and popular.

[Administrate](https://github.com/thoughtbot/administrate) doesn't have as many
features as ActiveAdmin, but it feels like developing a normal Rails app.


## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md)


## License

The gem is available under the terms of the [GNU LGPLv3](./LICENSE).


[gem]: https://rubygems.org/gems/super
[discussions]: https://github.com/zachahn/super/discussions
[newsletter]: https://tinyletter.com/zachahn
[demo]: https://demo-super.herokuapp.com/admin/members
[demo_source]: https://github.com/zachahn/super_demo
