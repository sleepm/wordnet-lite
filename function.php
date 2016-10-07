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
    $emptyObj = new stdClass;
    $emptyObj->lemma = $lemma;
    if($countLemma==0){
        $emptyObj->msg = 'not found';
    }else{
        $emptyObj->msg = 'success';
        for($i=0;$i<$countLemma;$i++){
            $offset = $lemmaResults[$i]->offset;
            $offset = json_decode($offset);
            $pos = $lemmaResults[$i]->pos;
            $countOffset = count($offset);
            for($j=0;$j<$countOffset;$j++){
                $queryWord = $sqlResources->query("select `ss_type`, `word`, `definition`, `sentence` from `data` where offset = \"$offset[$j]\"");
                $wordResults = $queryWord->fetchAll(PDO::FETCH_OBJ);
                $word = oneWord($wordResults, $pos);
                $emptyObj->words[] = $word;
            }
        }
    }
    return json_encode($emptyObj);
}

function oneWord($results, $pos)
{
    $emptyObj = new stdClass;
    $countWord = count($results);
    if($countWord==1){
        $emptyObj->type = $results[0]->ss_type;
        $emptyObj->word = json_decode($results[0]->word);
        $emptyObj->definition = json_decode($results[0]->definition);
        $emptyObj->sentence = json_decode($results[0]->sentence);
    }else{
        for($i=0;$i<$countWord;$i++){
            if($results[$i]->ss_type===$pos){
                $emptyObj->type = $pos;
                $emptyObj->word = json_decode($results[$i]->word);
                $emptyObj->definition = json_decode($results[$i]->definition);
                $emptyObj->sentence = json_decode($results[$i]->sentence);
            }
        }
    }
    return $emptyObj;
}