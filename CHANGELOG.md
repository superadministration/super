# Changelog

## [Unreleased]

### Changed

* Place controller's "dashboard" class inside its respective controller.
  Existing installations must rename their controllers' `dashboard` method into
  `new_controls`.

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
