<?php
namespace WPLC;

class Database {

  public static $instance;

  public $db;
  public $tables;

  protected $usr;
  protected $pwd;
  protected $dbname;
  protected $host;
  protected $charset;
  protected $prefix;

  public function __construct() {
    //add_action('init', array($this, 'register_cpt'));
    global $wpdb;

    $this->usr = \DB_USER;
    $this->pwd = \DB_PASSWORD;
    $this->dbname = \DB_NAME;
    $this->host = \DB_HOST;
    $this->charset = defined("\DB_CHARSET") ? \DB_CHARSET : 'utf8mb4';
    $this->prefix = $wpdb->prefix . "wplc_";

    $this->tables = array(
      // Note that we automatically prefix the tables.
      // This is multisite aware.
      "attendees",
      "business_hours"
    );

    $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset={$this->charset}";
    $this->db = new \PDO($dsn, $this->usr, $this->pwd);

    add_action('init', array($this, 'doLaunchChecks'));
  }

  public function doLaunchChecks() {
    // Are tables present? If not, install.
    $db = $this->db;
    $pdo = $db->prepare('SHOW TABLES LIKE ?');

    foreach ($this->tables as $table) {
      $pdo->execute(array("{$this->prefix}{$table}"));
      if(!($pdo->rowCount() > 0)) {
        $action = $this->createTable($table);
        $this->log($action);
      }
    }
  }

  public function createTable($key = null) {
    if (is_null($key)) return false;

    $db = $this->db;

    switch($key) {
      case "attendees":
        // Yes, it looks interesting. But these are not user generated values.
        // If you add fields that require user input, properly prepare them.
        $pdo = $db->prepare("CREATE TABLE IF NOT EXISTS `{$this->prefix}{$key}` (
          `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
          `post_id` int(11) DEFAULT '0',
          `wp_user_id` int(11) DEFAULT '0',
          PRIMARY KEY (`ID`),
          KEY `post_id` (`post_id`)
          ) ENGINE=InnoDB DEFAULT CHARSET={$this->charset};");

        if ($pdo->execute()) {
          return "Created {$this->prefix}{$key}";
        } else {
          return "Failed to create {$this->prefix}{$key}";
        }

      break;

      case "business_hours":
        $pdo = $db->prepare("CREATE TABLE IF NOT EXISTS `{$this->prefix}{$key}` (
          `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
          PRIMARY KEY (`ID`)
          ) ENGINE=InnoDB DEFAULT CHARSET={$this->charset};");

        if ($pdo->execute()) {
          return "Created {$this->prefix}{$key}";
        } else {
          return "Failed to create {$this->prefix}{$key}";
        }

     break;

    }

  }

  public function log($message) {
    return error_log("WPLC: $message");
  }

}
