/*global
window, document, event, history, location, localStorage, navigator, setTimeout, XMLHttpRequest
*/
(function () {
    "use strict";
    var user_lang = navigator.language.replace(/-/, "_");
    var translated = ["zh_CN", "en_US"];
    user_lang = translated.indexOf(user_lang) === -1
        ? "en_US"
        : navigator.language.replace(/-/, "_");
    var lang = {
        zh_CN: {
            placeholder: "输入点什么吧",
            search: "搜索",
            tip: "来翻我牌子啊",
            wait: "稍等哈 :)",
            not_found: "😭不高兴，没有找到您想要的",
            copyright: "数据来自 "
        },
        en_US: {
            placeholder: "type something u want",
            search: "search",
            tip: "turns me on",
            wait: "waIt a sec, i'M LoaDing... 😊",
            not_found: "sorry, i can't find it",
            copyright: "data from  "
        }
    };
    var $ = function (ele) {
        return document.querySelector(ele);
    };
    $("input.word").placeholder = lang[user_lang].placeholder;
    $(".search-btn").value = lang[user_lang].search;
    $(".center").innerText = lang[user_lang].wait;
    var base = "wordnet-lite";
    var api_url = "api/";
    var historyState = function (json, type) {
        if (type === 1) {
            var lemma = json.lemma.replace(/_/g, " ");
            history.pushState(json, "", "word/" + lemma);
            history.replaceState(json, "", "word/" + lemma);
            show.word(json);
        } else if (type === 2) {
            var page = localStorage.getItem("$page");
            history.pushState(json, "", "length/" + json.length + "/page/" + page);
            history.replaceState(json, "", "length/" + json.length + "/page/" + page);
            show.list(json, page);
        }
    };
    var getJSON = function (value, type) {
        var ajax = new XMLHttpRequest();
        var url;
        $(".mask").removeAttribute("style");
        if (type === 1) {
            url = api_url + "?word=" + value;
        } else if (type === 2) {
            url = api_url + "?length=" + value;
        }
        ajax.open("GET", url);
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                var json = JSON.parse(ajax.responseText);
                historyState(json, type);
                localStorage.setItem(json.lemma || "#" + json.length, ajax.responseText);
                $(".mask").setAttribute("style", "display: none;");
            }
        };
        ajax.send();
    };
    var isCached = function (key, type) {
        var itemKey = (type === 1)
            ? key
            : "#" + key;
        if (localStorage.getItem(itemKey)) {
            var item = localStorage.getItem(itemKey);
            historyState(JSON.parse(item), type);
        } else {
            getJSON(key, type);
        }
        document.body.scrollIntoView();
    };
    var copyright = function () {
        var div = document.createElement("div");
        var a = document.createElement("a");
        div.setAttribute("style", "text-align:center;margin:10px;");
        a.href = "http://wordnet.princeton.edu/";
        a.textContent = "wordnet";
        div.textContent = lang[user_lang].copyright;
        div.appendChild(a);
        return div;
    };
    var show = {
        word: function (json) {
            $(".cards").classList.add("hide");
            if ($(".results") !== null) {
                document.body.removeChild($(".results"));
            }
            if (json.msg === "not found") {
                this.erro(json.msg);
                return;
            }
            var lemma = json.lemma.replace(/_/g, " ");
            document.title = "wordnet: " + lemma;
            var words = json.words;
            var results = document.createElement("div");
            var i;
            var j;
            var type;
            var word;
            var result;
            var definitionEle;
            var sentence;
            var sentenceEle;
            var synonyms;
            var typeEle;
            var oneWord;
            var span;
            var a;
            var wrap;
            results.setAttribute("class", "results");
            for (i in words) {
                type = toType(words[i].type);
                word = words[i].word;
                result = document.createElement("div");
                result.setAttribute("class", "result");
                definitionEle = document.createElement("div");
                definitionEle.setAttribute("class", "definition");
                definitionEle.textContent = "Definition: " + words[i].definition;
                sentence = words[i].sentence;
                if (sentence !== null) {
                    sentenceEle = document.createElement("div");
                    sentenceEle.setAttribute("class", "sentence");
                    sentenceEle.innerHTML = "Sentence: <br>" + sentence.join(";<br>");
                } else {
                    sentenceEle = "";
                }
                synonyms = document.createElement("div");
                typeEle = document.createElement("span");
                typeEle.setAttribute("class", "type");
                typeEle.textContent = type;
                synonyms.appendChild(typeEle);
                for (j in word) {
                    oneWord = word[j][0].replace(/_/g, " ").replace(/\([aip]\)/, "");
                    if (oneWord.toLowerCase() === lemma.toLowerCase()) {
                        span = document.createElement("span");
                        span.setAttribute("class", "word");
                        span.textContent = oneWord;
                        synonyms.appendChild(span);
                    } else {
                        a = document.createElement("a");
                        wrap = document.createElement("span");
                        a.setAttribute("class", "word");
                        a.setAttribute("href", "word/" + oneWord);
                        a.textContent = oneWord;
                        wrap.appendChild(a);
                        synonyms.appendChild(wrap);
                    }
                }
                result.appendChild(synonyms);
                result.appendChild(definitionEle);
                sentenceEle !== ""
                    ? result.appendChild(sentenceEle)
                    : "";
                results.appendChild(result);
                $("body").insertBefore(results, $("style"));
            }
            results.appendChild(copyright());
        },
        erro: function (msg) {
            if (msg === "not found") {
                var div = document.createElement("div");
                var p = document.createElement("p");
                p.setAttribute("class", "center");
                p.textContent = lang[user_lang].not_found;
                p.setAttribute("style", "text-align:center;line-height:30px;margin-top:10px");
                div.setAttribute("class", "results");
                div.appendChild(p);
                document.body.appendChild(div);
            }
        },
        list: function (json, page) {
            document.title = "wordnet length " + json.length;
            $(".cards").classList.add("hide");
            if ($(".results") !== null) {
                document.body.removeChild($(".results"));
            }
            if (json.msg === "not found") {
                this.erro(json.msg);
                return;
            }
            page = parseInt(page);
            var perPage = (json.total < 20)
                ? json.total
                : 20;
            var start = (page === 1)
                ? 0
                : (perPage * page) - perPage;
            var end = (page * perPage < json.total)
                ? page * perPage
                : json.total;
            var lemmas = json.lemmas.slice(start, end);
            if (lemmas.length === 0) {
                this.erro("not found");
                return;
            }
            var i = 0;
            var a;
            var results = document.createElement("div");
            var pager = document.createElement("div");
            var last = document.createElement("button");
            last.setAttribute("class", "last");
            last.setAttribute("data-page", page - 1);
            last.textContent = "last";
            start === 0
                ? last.setAttribute("disabled", "")
                : "";
            var next = document.createElement("button");
            next.setAttribute("class", "next");
            next.setAttribute("data-page", page + 1);
            next.textContent = "next";
            end === json.total
                ? next.setAttribute("disabled", "")
                : "";
            results.setAttribute("class", "results");
            pager.setAttribute("class", "pager");
            pager.appendChild(last);
            pager.appendChild(next);
            for ( ; i < lemmas.length; i += 1) {
                a = document.createElement("a");
                a.setAttribute("class", "list");
                a.setAttribute("href", "word/" + lemmas[i]);
                a.textContent = lemmas[i].replace(/_/g, " ");
                results.appendChild(a);
            }
            $("body").insertBefore(results, $("style"));
            json.total / perPage !== 1
                ? results.appendChild(pager)
                : "";
        }
    };
    var toType = function (type) {
        return (type === "a")
            ? "adj."
            : (type === "n"
                ? "noun."
                : (type === "r"
                    ? "adv."
                    : (type === "s"
                        ? "adj."
                        : (type === "v"
                            ? "verb."
                            : "unknow"))));
    };
    var handleState = function (e) {
        if (e.state === null) {
            $("input.word").value = "";
            if ($(".results") !== undefined) {
                document.body.removeChild($(".results"));
            }
            $(".cards").classList.remove("hide");
        } else if (e.state.lemma) {
            $("input.word").value = e.state.lemma.replace(/_/g, " ");
            show.word(e.state);
        } else if (e.state.length) {
            $("input.word").value = "";
            show.list(e.state, e.target.document.location.pathname.match(/\d+/g)[1]);
        }
    };
    setTimeout(function () {
        window.addEventListener("popstate", handleState);
    }, 500); // for uc browser.
    var wordRegExp = new RegExp("/" + base + "/word/");
    var lengthRegExp = new RegExp("/" + base + "/length/");
    var pageRegExp = new RegExp("/" + base + "/length\/\\d+\/page\/");
    if (location.pathname.match(wordRegExp)) {
        $("input.word").value = decodeURIComponent(location.pathname).replace(wordRegExp, "");
        isCached($("input.word").value.replace(/\s/g, "_"), 1);
    } else if (location.pathname.match(pageRegExp)) {
        localStorage.setItem("$page", location.pathname.replace(pageRegExp, ""));
        isCached(location.pathname.match(/\d+/)[0], 2);
    } else if (location.pathname.match(lengthRegExp)) {
        localStorage.setItem("$page", 1);
        isCached(location.pathname.replace(lengthRegExp, ""), 2);
    }
    $("input.word").addEventListener("keydown", function (e) {
        if (e.keyCode === 13 && $("input.word").value !== "") {
            var key = e.target.value.trim();
            $("input.word").value = key;
            isCached(key.replace(/\s/g, "_"), 1);
        }
    });
    document.addEventListener("keydown", function (e) {
        var key = document.getSelection().toString().trim();
        if (e.keyCode === 13 && key !== "") {
            $("input.word").value = key;
            isCached(key, 1);
        }
    });
    document.addEventListener("scroll", function () {
        if (window.scrollY !== 0) {
            $("input.word").blur();
        } else {
            $("input.word").focus();
        }
    });
    document.addEventListener("click", function (e) {
        var target = e.target;
        if (target.nodeName === "A"){
            if (target.pathname.match(/word/)) {
                e.preventDefault();
                $("input.word").value = target.textContent;
                isCached(target.textContent.replace(/\s/g, "_"), 1);
            } else if (target.pathname.match(/length/)) {
                e.preventDefault();
                isCached(target.textContent, 2);
            }
        } else if (target.nodeName === "BUTTON") {
            localStorage.setItem("$page", target.dataset.page);
            isCached(location.pathname.match(/\d+/)[0], 2);
        } else if (target === $(".search-btn")) {
            e.preventDefault();
            var key = target.previousSibling.value.trim();
            $("input.word").value = key;
            if (key !== "") {
                isCached(key.replace(/\s/g, "_"), 1);
            }
        } else if (target.className === "card") {
            var length = target.dataset.length;
            target.style.backgroundColor = "black";
            target.style.color = "white";
            target.innerText = length;
            localStorage.setItem("$page", 1);
            setTimeout(function () {
                isCached(length, 2);
            }, 500);
        }
    });
})();