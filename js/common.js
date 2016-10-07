(function () {
    var $ = function (ele) {
            return document.querySelector(ele);
    },
        api_url = 'api/?word=',
        getJSON = function (url) {
            var ajax = new XMLHttpRequest();
            $('.mask').removeAttribute('style');
            ajax.open('GET', url);
            ajax.onreadystatechange = function () {
                if(ajax.readyState==4 && ajax.status==200){
                    var json = JSON.parse(ajax.responseText);
                    localStorage.setItem(json.lemma, ajax.responseText);
                    $('.mask').setAttribute('style','display: none;');
                    historyState(json);
                }
            }
            ajax.send();
    };
    $('.search-btn').onclick = function (e) {
        $('.center').style['position']='static';
        $('.center').style['margin-top']='15px';
        e.preventDefault();
        isCached();
    };
    var historyState = function (json) {
        var lemma = json.lemma.replace(/_/g, ' ');
        history.pushState(json,'','word/'+lemma);
        history.replaceState(json,'','word/'+lemma);
        show(json);
    };
    var isCached = function () {
        if(localStorage.getItem($('input.word').value.toLowerCase().replace(/ /g, '_'))){
            var json = localStorage.getItem($('input.word').value.toLowerCase().replace(/ /g, '_'));
            historyState(JSON.parse(json));
        }else{
            getJSON(api_url + $('input.word').value.replace(/ /g,'_'));
        }
        window.scroll(0,0);
    };
    var show = function (json) {
        if($('.results')!=undefined){
            document.body.removeChild($('.results'));
        }
        if(json.msg=='not found'){
            var result = document.createElement('div'),
                p = document.createElement('p');
            p.setAttribute('class', 'center');
            p.textContent='sorry, i can\'t find it';
            p.setAttribute('style', 'text-align:center;line-height:30px');
            result.setAttribute('class', 'results');
            result.appendChild(p);
            document.body.appendChild(result);
        }
        var lemma = json.lemma.replace(/_/g, ' ');
        document.title = 'wordnet: ' + lemma;
        var words = json.words, length = words.length, i = 0, results = document.createElement('div');results.setAttribute('class', 'results');
        for(;i<length;i++){
            var type = words[i].type;
            type = toType(type);
            var word = words[i].word;
            var result = document.createElement('div');result.setAttribute('class', 'result');
            var definitionEle = document.createElement('div');
            definitionEle.setAttribute('class', 'definition');
            definitionEle.textContent = 'Definition: ' + words[i].definition;
            var sentence = words[i].sentence;
            if(sentence!=null){
                sentenceEle = document.createElement('div');
                sentenceEle.setAttribute('class', 'sentence');
                sentenceEle.innerHTML = 'Sentence: <br>' + sentence.join(';<br>');    
            }else{
                sentenceEle = '';
            }
            var synonyms = document.createElement('div'),
                br = document.createElement('br'),
                typeEle = document.createElement('span');
            typeEle.setAttribute('class', 'type');
            typeEle.textContent = type;
            synonyms.appendChild(typeEle);
            for(var j=0,wordsLength=word.length;j<wordsLength;j++){
                var oneWord = word[j][0].replace(/_/g, ' ').replace(/\([aip]\)/, '');
                var s = document.createElement('span');
                s.setAttribute('class', 'word');
                if(oneWord.toLowerCase()==lemma.toLowerCase()){
                    s.textContent = oneWord;
                    synonyms.appendChild(s);
                }else{
                    var a = document.createElement('a');
                    var wrap = document.createElement('span');
                    wrap.setAttribute('class', 'word');
                    a.setAttribute('href', 'word/'+oneWord);
                    a.setAttribute('data-url', word[j][0]);
                    a.text = oneWord;
                    a.onclick = function (e) {
                        $('input.word').value = e.target.innerText;
                        e.preventDefault();
                        isCached();
                    };
                    wrap.appendChild(a);
                    synonyms.appendChild(wrap);
                }
            }
            result.appendChild(synonyms);
            result.appendChild(definitionEle);
            sentenceEle!=''?result.appendChild(sentenceEle):'';
            results.appendChild(result);
            $('body').appendChild(results);
        }
    };
    var toType = function(type){
        var result = type=='a'?'adj.':
        (type=='n'?'noun.':
        (type=='r'?'adv.':
        (type=='s'?'adj.':
        (type=='v'?'verb.':'unknow'))));
        return result;
    };
    window.onpopstate = function(e){
        $('input.word').value=e.state.lemma.replace(/_/g, ' ');
        show(e.state);
    };
    if(decodeURIComponent(location.pathname).replace(/\/wordnet-lite\/word\//,'')!='/wordnet-lite/'){
        $('input.word').value=decodeURIComponent(location.pathname).replace(/\/wordnet-lite\/word\//,'');
        $('.center').style['position']='static';
        $('.center').style['margin-top']='15px';
        isCached();
    };
})();
