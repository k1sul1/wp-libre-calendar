<?php
namespace WPLC;

class CPT_Event {

  public static $instance;

  public static function init() {
    if (is_null(self::$instance)) {
      self::$instance = new CPT_Event();
    }


    return self::$instance;
  }

  private function __construct() {
    add_action('init', array($this, 'register_cpt'));

    add_action('add_meta_boxes', array($this, 'metaboxes'));
  }

  public static function register_cpt() {
    $labels = array(
      'name' => _x('Events', 'post type general name', 'wp-libre-calendar'),
      'singular_name' => _x('Event', 'post type singular name', 'wp-libre-calendar')
    );

    $args = array(
      'labels' => $labels,
      'public' => true,
      'publicly_queryable' => true,
      'exclude_from_search' => false,
      'show_ui' => true,
      'show_in_menu' => true,
      'menu_icon' => 'dashicons-calendar-alt',
      'query_var' => false,
      'capability_type' => 'post',
      'has_archive' => false,
      'rewrite' => array(
        'slug' => 'calendar'
      ),
      'supports' => array(
        'title',
        'editor',
        'revisions',
        //'custom-fields' // the default fields look horrible, so let's not use them
      )
    );

    register_post_type('wplc-event', apply_filters('wplc_register_cpt_event', $args));
  }

  public function metaboxes() {
    add_meta_box(
      'wplc-event-details',
      __('Event details', 'wp-libre-calendar'),
      function() {
        ?>
        <label class="wplc_event_type">
          <p><?php _e('Event type', 'wp-libre-calendar'); ?></p>
          <span><input type="radio" name="wplc_event_type" value="event"> <?php _e('Event', 'wp-libre-calendar'); ?></span><br>
          <span><input type="radio" name="wplc_event_type" value="open"> <?php _e('Open', 'wp-libre-calendar'); ?></span>
        </label>

        <div id="wplc_event_details_container">
          <!-- wplc_event_details is already occupied! -->
        </div>
        <?php
      },
      'wplc-event',
      'normal',
      'high'
    );

    add_meta_box(
      'wplc-event-attendees',
      __('Event attendees', 'wp-libre-calendar'),
      function() {
        echo "List attendees here.";
      },
      'wplc-event',
      'normal',
      'high'
    );

  }
}
