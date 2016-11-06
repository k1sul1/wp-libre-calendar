# WP Libre Calendar

[![Build Status](https://travis-ci.org/k1sul1/wp-libre-calendar.svg?branch=master)](https://travis-ci.org/k1sul1/wp-libre-calendar)

WP Libre Calendar will eventually be the best calendar plugin for WordPress.

Features:
  - Simultaneous event and reservation based modes
  - Ability to set up closing and opening times, on a per day basis
  - Pluggable
  - Supports user accounts
  - Should work without issues with multilingual plugins such as Polylang
  - Exporting data is easy, and adding your own export format is easy

[![specs](http://i.imgur.com/7FewxFL.png)](https://github.com/k1sul1/wp-libre-calendar/issues/1)

# Building

There probably is going to be a lot of custom CSS and JS going on, so build steps are preconfigured.
This plugin uses Yarn for JS package management, which is supposed to help with npm hell.

That being said, having Yarn installed is not required to build the files. Yarn manages package.json for us,
and `npm install` works just fine. However, if you want to contribute, and add new JS packages, use the
[getting started instructions](https://yarnpkg.com/en/docs/usage) for Yarn.

To the point:

Clone this project as usual. Then run either `npm install` or `yarn install` to get the necessary packages.

Enable code compilation with `npm run watch`. Your changes are watched and compiled automatically.
