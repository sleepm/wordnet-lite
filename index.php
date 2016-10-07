<?php
require('config.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <base href="/<?=APP_HOME?>/">
    <title>wordnet lite</title>
</head>
<body>
    <div class="search center">
        <input class="word" type="text" name="word" id="" value="book"><input type="button" value="search" class="search-btn">
    </div>
    <style>
        html, body{
            height: 100%;
            padding: 0;
            margin: 0;
            background-color: #fff;
        }
        input{
            vertical-align: top;
            height: 20px;
        }
        input:focus{
            outline: none;
        }
        input.word{
            border-radius: 4px 0 0 4px;
            border: 1px solid #ccc;
            padding: 4px 6px;
            margin: 0;
            width: 150px
        }
        .search-btn{
            border-radius: 0 4px 4px 0;
            border: 1px solid #ccc;
            margin-left: -1px;
            background: linear-gradient(to bottom,#fff,#e6e6e6);
            line-height: 20px;
            width: 52.9px;
            height: 30px;
        }
        .center{
            height: 30px;
            width: 217px;
            position: relative;
            top: 50%;
            margin: 0 auto;
            margin-top: -15px;
        }
        .results{
            margin: 0 auto;
            padding: 10px;
            max-width: 720px;
        }
        .result{
            margin: 10px 0;
        }
        .result:hover{
            background-color: #f1f1f1;
        }
        span.word{
            padding: 4px 6px;
        }
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: #fff;
        }
    </style>
    <div class="mask" style="display: none;">
        <div class="center" style="text-align: center;">waIt a sec, i'M LoaDing... 😊</div>
    </div>
    <script src="js/common.js"></script>
</body>
</html>
