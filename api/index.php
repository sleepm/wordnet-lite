<?php
require('../config.php');
header("Content-Type: application/json");
if(isset($_GET['word'])){    
    $word = urldecode($_GET['word']);
    echo word($word);
}else if(isset($_GET['length'])&&is_numeric($_GET['length'])){
    $length = $_GET['length'];
    echo wordList($length);
}