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
        <input class="word" type="text" placeholder="type something u want"><input type="button" value="search" class="search-btn">
    </div>
    <div class="cards">
        <div class="card" data-length="1"></div>
        <div class="card" data-length="2"></div>
        <div class="card" data-length="3"></div>
        <div class="card" data-length="4"></div>
        <div class="card" data-length="5"></div>
        <div class="card" data-length="6"></div>
        <div class="card" data-length="7"></div>
        <div class="card" data-length="8"></div>
        <div class="card" data-length="9"></div>
        <div class="card" data-length="10"></div>
        <div class="card" data-length="11"></div>
        <div class="card" data-length="12"></div>
        <div class="card" data-length="13"></div>
        <div class="card" data-length="14"></div>
        <div class="card" data-length="15"></div>
        <div class="card" data-length="16"></div>
        <div class="card" data-length="17"></div>
        <div class="card" data-length="18"></div>
        <div class="card" data-length="19"></div>
        <div class="card" data-length="20"></div>
        <div class="card" data-length="21"></div>
        <div class="card" data-length="22"></div>
        <div class="card" data-length="23"></div>
        <div class="card" data-length="24"></div>
        <div class="card" data-length="25"></div>
        <div class="card" data-length="26"></div>
        <div class="card" data-length="27"></div>
        <div class="card" data-length="28"></div>
        <div class="card" data-length="29"></div>
        <div class="card" data-length="30"></div>
        <div class="card" data-length="31"></div>
        <div class="card" data-length="32"></div>
        <div class="card" data-length="33"></div>
        <div class="card" data-length="34"></div>
        <div class="card" data-length="35"></div>
        <div class="card" data-length="36"></div>
        <div class="card" data-length="37"></div>
        <div class="card" data-length="38"></div>
        <div class="card" data-length="39"></div>
        <div class="card" data-length="40"></div>
        <div class="card" data-length="41"></div>
        <div class="card" data-length="42"></div>
        <div class="card" data-length="43"></div>
        <div class="card" data-length="44"></div>
        <div class="card" data-length="45"></div>
        <div class="card" data-length="46"></div>
        <div class="card" data-length="47"></div>
        <div class="card" data-length="48"></div>
        <div class="card" data-length="49"></div>
        <div class="card" data-length="50"></div>
        <div class="card" data-length="51"></div>
        <div class="card" data-length="52"></div>
        <div class="card" data-length="53"></div>
        <div class="card" data-length="54"></div>
        <div class="card" data-length="55"></div>
        <div class="card" data-length="56"></div>
        <div class="card" data-length="59"></div>
        <div class="card" data-length="60"></div>
        <div class="card" data-length="61"></div>
        <div class="card" data-length="63"></div>
        <div class="card" data-length="64"></div>
        <div class="card" data-length="69"></div>
        <div class="card" data-length="71"></div>
    </div>
    <style>
        html, body{
            padding: 0;
            margin: 0;
            background-color: #fff;
            font-family: 'Lucida Console', Monaco, monospace;
        }
        .search{
            margin: 10px auto;
            width: 216px;
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
            line-height: 30px;
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
            padding: 0 10px;
            max-width: 720px;
        }
        .result{
            margin: 10px 0;
        }
        .result:hover{
            background-color: #f1f1f1;
        }
        .results .word{
            padding: 4px 6px;
        }
        .word a, a.word, span.word{
            display: inline-block;
        }
        .cards{
            margin: 10px auto;
            display: table;
            max-width: 640px;
        }
        .card{
            width: 62px;
            height: 62px;
            background-color: transparent;
            border: 1px solid #f9f9f9;
            display: inline-block;
            font-size: 2em;
            line-height: 62px;
            text-align: center;
            vertical-align: middle;
        }
        .list{
            display: block;
            margin: 5px auto;
        }
        .list:hover{
            background-color: #eee;
        }
        .last, .next{
            padding: 4px 6px;
            margin: 2px;
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
        .hide{
            display: none;
        }
        @media (max-width: 600px){
            .cards{
                margin: 10px auto;
                width: 320px;
            }
        }
    </style>
    <div class="mask" style="display: none;">
        <div class="center" style="text-align: center;">waIt a sec, i'M LoaDing... 😊</div>
    </div>
    <script src="js/common.js"></script>
</body>
</html>