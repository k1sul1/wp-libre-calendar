<?php
namespace WPLC;

class WP_Libre_Calendar {
  public static $instance;

  public static function init() {
    if (is_null(self::$instance)) {
      self::$instance = new WP_Libre_Calendar();
    }

    return self::$instance;
  }

  private function __construct() {
    require_once 'cpt-event.php';
    CPT_Event::init();

    require_once 'db.php';
    $db = new Database();

    add_action('plugins_loaded', array($this, 'load_plugin_textdomain'));

    /*add_action('after_setup_theme', function() {
      // $translations = get_translations_for_domain('wp-libre-calendar');
      // seems like it's impossible to get all strings easily.
      // just read the values from the json.
      // global $l10n;
      // error_log(print_r($translations, true));

      add_action('admin_head', function(){
      ?>
        <script>
        // Just a placeholder. Optimal solution:
        // Load all strings from text domain in bulk and put them here.

        var wplc = {
          localization: {
            'Select date': '<?php _e('Select date', 'wp-libre-calendar'); ?>'
          }
        };
        </script>
      <?php
      });

    });*/
  }

  public static function load_plugin_textdomain() {
    // Source: https://github.com/anttiviljami/wp-libre-form/blob/e29268dd78e0e2f31d5894c280138354fa4ee8f4/wp-libre-form.php#L85-L91
    $loaded = load_plugin_textdomain('wp-libre-calendar', false, dirname(plugin_basename(Boilerplate\BASE_NAME)) . '/languages/');

    if(!$loaded) {
      $loaded = load_muplugin_textdomain('wp-libre-calendar', dirname(plugin_basename(Boilerplate\BASE_NAME)) . '/languages/');
    }

    if(!$loaded) {
      throw new \Exception('WP Libre Calendar failed to load text domain! Path: ' +  dirname(plugin_basename(Boilerplate\BASE_NAME)) . '/languages/');
    }
  }
}
