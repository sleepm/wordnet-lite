<?php
function sql($dbname)
{
    return new PDO("mysql:dbname=$dbname;host=".DBHOST,DBUSER,DBPW);
}

function word($lemma)
{
    global $sqlResources;

    $queryLemma = $sqlResources->prepare("select `offset`, `pos` from `index` where lemma = \"$lemma\"");
    $queryLemma->execute();
    $lemmaResults = $queryLemma->fetchAll(PDO::FETCH_OBJ);
    $countLemma = count($lemmaResults);
    $results = new stdClass;
    $results->lemma = $lemma;
    if($countLemma==0){
        $results->msg = 'not found';
    }else{
        $results->msg = 'success';
        for($i=0;$i<$countLemma;$i++){
            $offset = $lemmaResults[$i]->offset;
            $offset = json_decode($offset);
            $pos = $lemmaResults[$i]->pos;
            $countOffset = count($offset);
            for($j=0;$j<$countOffset;$j++){
                $queryWord = $sqlResources->query("select `ss_type`, `word`, `definition`, `sentence` from `data` where offset = \"$offset[$j]\"");
                $wordResults = $queryWord->fetchAll(PDO::FETCH_OBJ);
                $word = oneWord($wordResults, $pos);
                $results->words[] = $word;
            }
        }
    }
    return json_encode($results);
}

function oneWord($results, $pos)
{
    $result = new stdClass;
    $countWord = count($results);
    if($countWord==1){
        $result->type = $results[0]->ss_type;
        $result->word = json_decode($results[0]->word);
        $result->definition = json_decode($results[0]->definition);
        $result->sentence = json_decode($results[0]->sentence);
    }else{
        for($i=0;$i<$countWord;$i++){
            if($results[$i]->ss_type===$pos){
                $result->type = $pos;
                $result->word = json_decode($results[$i]->word);
                $result->definition = json_decode($results[$i]->definition);
                $result->sentence = json_decode($results[$i]->sentence);
            }
        }
    }
    return $result;
}

function wordList($length)
{
    global $sqlResources;
    $queryList =$sqlResources->prepare("select distinct lemma from `index` where length(lemma)=$length");
    $queryList->execute();
    $listResults = $queryList->fetchAll(PDO::FETCH_OBJ);
    $results = new stdClass;
    $results->length = $length;
    $results->msg = (count($listResults)==0)?'not found':'success';
    $listLength = count($listResults);
    for($i=0;$i<$listLength;$i++){
        $results->lemmas[] = $listResults[$i]->lemma;
    }
    $results->total = $listLength;
    return json_encode($results);
}