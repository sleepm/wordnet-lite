<?php
require('../config.php');
header("Content-Type: application/json");
if(isset($_GET['word'])){    
    $word = urldecode($_GET['word']);
    echo word($word);
}
