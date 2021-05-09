# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Partials `site_header` and `site_footer` for easy overrides

### Changed

* Renamed the controller method name `#action_inquirer` to `#current_action`
* Merged `Super::Controls` into `Super::ApplicationController`
* Renamed `#scope` to `#base_scope`
* Renamed `#navigation` to `#site_navigation`

### Removed

* The orange badge, since Tailwind v2 doesn't include orange by default

## [0.0.15] - 2021-05-01

### Added

* `Super::Reset`. Include it in your controller to remove all the controller
  methods and actions that Super defines
* `<input type=hidden>` and `<input type=password>` fields
* Pill-like badges for displaying statuses
* Easy label text configurability
* A new form type for calling form methods directly

### Changed

* The `<select>` tag has its "down" icon set in CSS, instead of in HTML
* The recommended form schema types. For example, instead of `type.string`, use
  `type.text_field`.

### Removed

* The README (cheatsheet) that was added when installing Super for the first
  time. See `bin/rails super:cheat` for an up to date list

### Fixed

* Updated `bin/rails super:cheat` to print all of `Super::Controls` methods
* Mutate the current `action_inquirer` when re-rendering a form due to a
  validation failure (`#create` to `#new`, or `#update` to `#edit`)
* The navigation menu was placed behind `<select>` tags, which made it hard to
  navigate. The navigation menu shows up on top now
* A regression from upgrading to Tailwind CSS v2. It had a dotted border
  around inputs, which is unnecessary since we have custom styles

## [0.0.14] - 2021-04-22

### Added

* Navigation can be configured now. But it's still automatic by default
* Navigation can be nested one level deep
* A cheat sheet, run `bin/rails super:cheat`

### Changed

* Upgraded to Tailwind v2.1.1. This drops support for IE 11. Note that I'm still
  on v1 colors.

### Fixed

* `Super::Assets.use_sprockets`. It does what it says it does now. It used to do
  nothing.
* Handling of prerelease versions of Sprockets and Webpacker.
* Support for Webpacker v6.0.0.beta6

## [0.0.13] - 2021-04-16

### Added

* Add a time display type that only shows the time
* Add a date-, datetime-, and time-picker to forms
* Add the datetime-picker to filters

### Fixed

* ActionText fields are computed

## [0.0.12] - 2021-04-04

### Added

* Support for "virtual" fields that don't need to be correlated to a method on
  the model. Although it's not possible to sort by virtual fields (sorting is
  only done by the database), this will make it possible to show derived values
* Route generation when using `bin/rails g super:resource MyModel`. It can
  generate routes under a `namespace`, `scope`, or keep it at the top level.
* Generation of `AdminController::AdminControls`, which subclasses
  `Super::Controls`. (The name changes automatically depending on the controller
  namespace)

### Changed

* A few configuration keys
* The number of records per paginated page. It's now at 100.
* Moved generated definition of `#new_controls` into the parent class.

## [0.0.11] - 2021-03-02

### Added

* Sorting. It's now possible to sort by one or many columns

### Changed

* Renamed Controls' `build_*_view` to `*_view`
* Made `Super::Display` easier to initialize. It no longer requires any
  arguments

## [0.0.10] - 2021-01-17

### Added

* A real form builder. You can use `super_form_for` to build a form that looks
  like a Super form.
* An error when the `@view` instance variable wasn't set in the controller.
  This should help with debugging custom controllers

### Removed

* The "sticky headers" feature. It was very possible for the table to
  look bad on certain breakpoints.

## [0.0.9] - 2021-01-07

### Added

* Initial support for ActionText
* Generator for setting up ActionText. Before Super can work with ActionText,
  you'll first need to set up Webpacker and ActionText on your application
* Initial support for Webpacker 6
* Checkbox input field for forms

### Fixed

* Alignment of multi-line values on the `#show` action


## [0.0.8] - 2020-12-27

### Changed

* The `#display_schema` definition now looks like `Super::Display.new(...) do`
* The `#form_schema` definition now looks like `Super::Form.new do`
* The `#filter_schema` definition now looks like `Super::Filter.new do`
* The generators now only define required methods
* Controls must now inherit from `Super::Controls`

### Added

* Additional "schema type" helpers on Display and Form
* Schema guesser for `#display_schema`, `#form_schema`, and `#filter_schema`.
* Guesser for Strong Parameters

### Fixed

* A Ruby 3.0 error
* Displaying `nil` values
* JavaScript exports


## [0.0.7] - 2020-12-15

### Changed

* Made the table headers (on the `#index` action) sticky on larger screens.

### Added

* A "view" object in each controller action that renders something. These are
  built via Controls to allow developers to customize them as desired. The
  return value can be any object with a method `#to_partial_path` (or in newer
  versions of Rails, a view component).
* Filtering support!


## [0.0.6] - 2020-12-08

### Changed

* Consolidated the controller's two "permitted params" methods into one
* Merged `Super::Step` into `Super::Controls`
* Define `Super::Link#to_s` which returns an `<a href>` tag. Any of a Link's
  fields can be a proc; they are resolved as necessary when called. `Controls`
  was updated to handle these new `Link`s
* Moved `Super::ClientError` out of `Super::Error`. `ClientError` does NOT
  inherit from `Super::Error` since they're different categories of errors
  (`Error` are generally developer errors, not user errors)
* Bypasses `ActionView::Base.field_error_proc` (which by default wraps erroneous
  form fields with a `<div class="field_with_errors">`. Sadly this currently
  monkey patches `ActionView::Helpers::Tags::Base`
* Allow `Super::Controls#display_schema` to return any object that defines
  `#to_partial_path`. This will allow developers to bypass the form builder if
  it's too limited.
* Upgraded Tailwind CSS to 1.9.6
* Redesigned the index table
* Renamed lots of methods with the word "resource" in it. In most cases, the
  word "resources" meant "records" or "collection" (or in the singular case,
  "record" or "member")
* Upgraded Stimulus to 2.0.0 (no breaking changes, only warnings)

### Added

* Allow `Super::Controls#form_schema` to return any object that defines
  `#to_partial_path`. This will allow developers to bypass the form builder if
  it's too limited.
* Allow `Super::Display` fields to be objects that respond to `to_partial_path`.
  This will allow developers to partially bypass the display schema
* Allow `Super::Display` to work with "fields" that aren't methods part of an
  instance of `ActiveRecord::Base`
* A footer

### Fixed

* The `apply-template` Stimulus controller now correctly raises an error when
  the eponymous `<template>` tag is missing
* Fixed `Super::ViewHelper.classes` which used to return the stringified value
  of the conditional. It now only returns the classes without the conditionals
* A deprecation warning under Rails 6.1


## [0.0.5] - 2020-06-01

### Changed

* Replaced the `Super::Action` framework with regular controller actions
* Improved the index table to be a bit more responsive by default
* Updated `super:webpacker` generator to automatically update the initializer
* Upgraded Tailwind CSS from v1.2.0 to 1.4.6
* Improved documentation!


## [0.0.4] - 2020-03-09

### Changed

* Major redesign!
* Replaced the links to various actions (the "New", "View", "Edit", "Destroy"
  links) with configurable ones. See `Super::Controls#resource_actions` and
  `Super::Controls#resources_actions`
* Replaced `Super::InlineCallback` with `Super::Action`. A `Super::Action` is
  built of two parts, the business logic of the controller action and its
  respective view.
* Upgraded Tailwind CSS from v1.1.4 to v1.2.0. This is unlikely to be a breaking
  change.
  * Added `first:` variants for the padding classes
* Conditionally show pagination links

### Added

* Some CSS classes for various form elements
* Meta tags for responsive views on mobile
* Configurable links to actions
* Default behavior for `Super::Controls#title` and `Super::Controls#scope`
* Utility classes for building views `Super::Layout`, `Super::Partial`, and
  `Super::Panel`


## [0.0.3] - 2020-01-24

### Changed

* Renamed `form_generic_text` and `form_generic_select` views to
  `form_field_text` and `form_field_select`, respectively
* Renamed `Super::Controls#dashboard` to `#actual`

### Added

* Nested attributes form builder. It's now possible to build "sub-forms" for
  `accepts_nested_attributes_for`.
* "Add new" button for `has_many` nested attributes


## [0.0.2] - 2019-11-24

### Changed

* Place controller's "dashboard" class inside its respective controller.
  Existing installations must rename their controllers' `dashboard` method into
  `new_controls`.
* Merged several methods under "Controls" to keep things a little less
  repetitive.
  * `scope(action:)` instead of
    * `index_scope`
    * `new_scope`
    * `create_scope`
    * `show_scope`
    * `edit_scope`
    * `update_scope`
  * `permitted_params(params, action:)` instead of
    * `create_permitted_params`
    * `update_permitted_params`
  * `display_schema(action:)` instead of
    * `index_schema`
    * `show_schema`
  * `form_schema(action:)` instead of
    * `new_schema`
    * `edit_schema`

### Added

* Flash message support
* User-facing error handling


## [0.0.1] - 2019-09-17

### Added

* Default implementations for resourceful actions
* Pagination on `index` action
* Generators for installation and resource (`super:install` and
  `super:resource`, respectively)
* Tailwind CSS
* Sprockets and Webpacker support. Defaults to Sprockets
* Navigation bar with links to all admin controllers

[Unreleased]: https://github.com/zachahn/super/compare/v0.0.15...HEAD
[0.0.15]: https://github.com/zachahn/super/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/zachahn/super/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/zachahn/super/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/zachahn/super/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/zachahn/super/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/zachahn/super/compare/v0.0.9...v0.0.10
[0.0.8]: https://github.com/zachahn/super/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/zachahn/super/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/zachahn/super/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/zachahn/super/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/zachahn/super/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/zachahn/super/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/zachahn/super/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/zachahn/super/compare/v0.0.0...v0.0.1
