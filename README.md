# Super

Super is a zero dependency admin framework for Ruby on Rails applications.

Super is made for developers. They will find it easy to build and modify admin
pages. It builds on top of Rails controllers and views, so it's straightforward
to customize. It's fully configurable without a DSL.

Super is made for admins. Power users and casual users alike will find the admin
pages simple and efficient. And the Professional add-on can make it even more
powerful.


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


## Installation and Usage

See [Quick start](./docs/quick_start.md)


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
