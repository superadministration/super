# Super

![Unit tests status](https://github.com/superadministration/super/workflows/Unit%20tests/badge.svg?branch=main)
[![Gem](https://img.shields.io/gem/v/super)][gem]

Super is an admin framework for Ruby on Rails applications. It helps you make
admin pages quickly, and it provides a powerful interface for admins to use.

Check out the [demo][demo] / Read the [docs][docs]


## Features

#### Ease of use and setup

* Configurable display pages
    * Advanced filtering and sorting
    * Supports showing computed values that aren't backed by database fields
* Configurable form pages
    * Supports nested attributes using `accepts_nested_attributes_for`
    * Supports having different forms for new and edit pages
* Controllers that can automatically configure itself for any ActiveRecord model
* Compatible with Sprockets, Webpacker, jsbundling, and cssbundling
* Responsive and mobile-friendly web pages

#### Ease of customization

* Plenty of escape hatches for those very customized pages
* Builds on top of standard Rails controllers and ERB views
* No DSL. Configure your admin pages by setting attributes and returning objects

#### Ease of long-term maintainability

Each gem in your Gemfile requires some maintenance around keeping dependencies
up to date. Super works hard to keep its maintenance as simple as possible.

*Note: Super is under active development and will likely have a few more
breaking changes before 1.0.*

* Only depends on code that comes with Rails or Ruby. There are no other
  third-party dependencies
* Includes pre-built frontend assets. Super doesn't depend on Sass, PostCSS,
  Babel, etc
* Supports Rails 5.0+, 6.0+, 7.0+
* Supports Ruby 2.3+, 3.0+


See the [demo][demo] and its [source][demo_source] for an example of some of its
features. See the [docs][docs] for a walkthrough.


## Quick start

Install Super by running:

```
bundle add super
bin/rails g super:install
```

You can create admin pages by running this for all the models you want:

```
bin/rails g super:resource ModelName
```


## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md)


## License

The gem is available under the terms of the [GNU LGPLv3](./LICENSE).


[gem]: https://rubygems.org/gems/super
[discussions]: https://github.com/superadministration/super/discussions
[docs]: https://superadministration.github.io/
[demo]: https://demo-super.herokuapp.com/admin
[demo_source]: https://github.com/superadministration/super_demo
