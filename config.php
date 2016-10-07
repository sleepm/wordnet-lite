<?php
require('function.php');
define("DBHOST","localhost");
define("DBUSER","root");
define("DBPW","passwoRd");
define("DBNAME",'wordnet');
define("APP_HOME",basename(__DIR__));

$sqlResources = sql(DBNAME);