<?php
/**
 * Plugin name: WP Libre Calendar
 * Description: Calebdar for WordPress. Event and reservation based functionalities.
 * Author: Christian Nikkanen, @k1sul1
 * Version: 0.0.1
 * Text Domain: wp-libre-calendar
 * Domain Path: /languages
 */

/**
  * The MIT License (MIT)
  *
  * Copyright (c) 2015 Niklas Lindgren
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  * THE SOFTWARE.:
 */

namespace WPLC\Boilerplate;

// Value for get_option (database name)
const SETTING_NAME = "wp-libre-calendar";

// Settings page slug
const PAGE_NAME = "wplc-settings";

// Settings page title
const PAGE_TITLE = "WP Libre Calendar settings";

// Settings page description
const PAGE_DESCRIPTION = "Settings for WP Libre Calendar";

// Menu title (in plugins menu)
const MENU_TITLE = "Settings";

// Helper for absolute path references
const HOME_DIR = __DIR__;

// Helpers for use get_plugin_data
const BASE_NAME = __FILE__;

// Capability required for managing settings
const REQUIRE_CAPS = "manage_options";

// Include settings and actions
require HOME_DIR . DIRECTORY_SEPARATOR . "lib" . DIRECTORY_SEPARATOR . "classes" . DIRECTORY_SEPARATOR . "wp-libre-calendar.php";
require HOME_DIR . DIRECTORY_SEPARATOR . "lib" . DIRECTORY_SEPARATOR . "settings.php";
require HOME_DIR . DIRECTORY_SEPARATOR . "lib" . DIRECTORY_SEPARATOR . "admin-actions.php";
require HOME_DIR . DIRECTORY_SEPARATOR . "lib" . DIRECTORY_SEPARATOR . "actions.php";
