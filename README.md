# Super

![Unit tests status](https://github.com/zachahn/super/workflows/Unit%20tests/badge.svg?branch=master)
[![Gem](https://img.shields.io/gem/v/super)][gem]
[![Try the demo](https://img.shields.io/badge/demo-try-blue)][demo]
[![Read the docs](https://img.shields.io/badge/docs-available-brightgreen)][docs]


Super is an admin framework for Ruby on Rails applications. Super helps you make
admin pages quickly and provides a powerful interface for admins to use.

It's distinguishing feature is that it's easy for you to maintain in your
application. It does this by having zero dependencies—this lets you update your
app's dependencies without worrying about breaking your admin pages, and vice
versa, update your admin pages without breaking your app.

Note: Super is under active development and will likely have a few more breaking
changes before 1.0.


## Features

* Responsive and mobile-friendly web pages
* Automatic controllers that work without any configuration
* Configurable forms
    * Supports nested attributes `accepts_nested_attributes_for`
    * New and edit forms can be totally different
* Configurable display (index and show tables)
    * Supports showing computed values that aren't backed by database fields
* Advanced filtering/search
* Compatible with Sprockets and Webpacker
* Pre-built frontend assets. Super doesn't depend on Sass, PostCSS, Babel, etc
* Carefully chosen, vendored frontend assets
    * Stimulus JS v2
    * Tailwind CSS v2
    * Rails UJS
    * Flatpickr
* Builds on top of standard Rails controllers and ERB views
* Plenty of escape hatches for those very customized pages
* No DSL. Configure your admin pages by setting methods and returning objects
* Supports Rails 5.0+, 6.0+
* Supports Ruby 2.3+, 3.0+


See the [demo][demo] and its [source][demo_source] for an example of some of its
features. See the [docs][docs] for a walkthrough.


## Quick start

Add this line anywhere in your Gemfile:

```ruby
gem "super"
```

Then install Super by running:

```
bundle install
bin/rails g super:install
```

You can create admin pages by running this for all the models you want:

```
bin/rails g super:resource ModelName
```


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
[docs]: https://superadministration.github.io/
[demo]: https://demo-super.herokuapp.com/admin
[demo_source]: https://github.com/zachahn/super_demo
