# Changelog

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
