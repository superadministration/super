# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
