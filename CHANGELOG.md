# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Historical entries were reconstructed from Git history; dates are taken from
the tagged release commits.

## [Unreleased]

## [1.4.2] - 2026-10-05

### Changed

- Updated qs, rollup, side-channel, and side-channel-list.

## [1.4.1] - 2026-10-05

### Fixed

- Install dependencies in the publishing job so the prepack bundle build can
  run. The 1.4.0 npm publication failed before uploading the package.

## [1.4.0] - 2026-10-05

### Added

- Self-contained, minified ES module bundle with source maps, built before
  packaging and used by default on UNPKG and jsDelivr.
- Documentation for bundler usage and local development.

### Changed

- Replaced CDN imports with npm dependencies for lit, dompurify,
  activitystrea.ms, and infinite-scroll-component. Direct source imports in
  browsers now require a bundler or import map; CDN users can use the bundle.
- Updated activitystrea.ms, dompurify, undici, ws, nanoid, ip-address,
  brace-expansion, and js-yaml.
- Updated chai, mocha, @web/test-runner, and @web/test-runner-mocha.
- Limited published files to the entry point, components, and bundle.
- Updated actions/checkout and actions/setup-node.
- Updated release tests to Node.js 22, 24, and 26, and publishing to Node.js 26.
- Enabled Dependabot updates and a seven-day cooldown
  for npm and GitHub Actions updates.

## [1.3.0] - 2026-04-27

### Added

- Collection titles and item counts.

## [1.2.6] - 2026-03-24

### Changed

- Separated release testing from publishing, added a Node.js test matrix,
  and enabled npm provenance.

## [1.2.5] - 2026-03-24

### Changed

- Configured npm trusted publishing.
- Updated actions/checkout and actions/setup-node.

## [1.2.4] - 2026-03-24

### Fixed

- Handled object and array values for actor page URLs.

## [1.2.3] - 2025-08-16

### Fixed

- Handled object and array values for actor item URLs.

## [1.2.2] - 2025-08-16

### Fixed

- Handled embedded objects in collection pagination links (`first` and `next`).

## [1.2.1] - 2025-08-15

### Fixed

- Corrected an import referencing the old activity module name.

## [1.2.0] - 2025-08-13

### Added

- Loading skeletons and CSS variables for minimum component dimensions.
- `ap-activity-item`, retaining the `ap-activity` element and
  `ActivityPubActivity` class for compatibility.

### Fixed

- Corrected the collection item element property name.

## [1.1.0] - 2025-06-07

### Added

- Browser tests using Web Test Runner.
- Automated npm publishing on version tags.

### Changed

- Moved object-type dispatch into `ap-object` for reuse by activity components.

## [1.0.5] - 2025-06-03

### Fixed

- Handled collections containing a single item.

## [1.0.4] - 2025-05-30

### Changed

- Documented the required module script type for browser loading.

## [1.0.3] - 2025-05-30

### Fixed

- Corrected imports in the package entry point.

## [1.0.2] - 2025-05-28

### Removed

- Unused configuration file.

## [1.0.1] - 2025-05-28

### Fixed

- Added the missing package entry point.

## [1.0.0] - 2025-05-28

### Added

- Initial public release of the ActivityPub Web Components package.
- Components for actors, profiles, avatars, notes, articles, activities,
  and collections with infinite scrolling.
- Loading from JSON or remote object URLs, with a configurable fetch function.
- HTML sanitization with DOMPurify.
- Apache License, Version 2.0.

[Unreleased]: https://github.com/social-web-foundation/ap-components/compare/v1.4.2...HEAD
[1.4.2]: https://github.com/social-web-foundation/ap-components/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/social-web-foundation/ap-components/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/social-web-foundation/ap-components/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/social-web-foundation/ap-components/compare/v1.2.6...v1.3.0
[1.2.6]: https://github.com/social-web-foundation/ap-components/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/social-web-foundation/ap-components/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/social-web-foundation/ap-components/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/social-web-foundation/ap-components/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/social-web-foundation/ap-components/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/social-web-foundation/ap-components/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/social-web-foundation/ap-components/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/social-web-foundation/ap-components/compare/v1.0.5...v1.1.0
[1.0.5]: https://github.com/social-web-foundation/ap-components/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/social-web-foundation/ap-components/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/social-web-foundation/ap-components/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/social-web-foundation/ap-components/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/social-web-foundation/ap-components/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/social-web-foundation/ap-components/releases/tag/v1.0.0
