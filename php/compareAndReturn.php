<?php
  require "dbConn.php";
  require "../vendor/autoload.php";
  use \IndicoIo\IndicoIo as IndicoIo;
  IndicoIo::$config['api_key'] = 'd6ed9ae5f47eed12aba7fa40a05fc10d';

  $toAnalyze = $_POST["toAnalyze"];

  $dbConn = dbConnect();

  $selectAll = $dbConn->prepare("SELECT * FROM `article`");
  $selectAll->execute();

  $return = [];

  $allArticles = $selectAll->fetchall();

  for($i = 0; $i < count($allArticles); $i++){
    $foo = new stdClass();
    $cur = (array) $allArticles[$i];
    $articleData = [$cur["sent"], $cur["serv"],
    $cur["gree"], $cur["libe"],
    $cur["libt"], $cur["agre"],
    $cur["cons"], $cur["extr"],
    $cur["open"], $cur["ange"],
    $cur["fear"], $cur["joyy"],
    $cur["sadd"], $cur["surp"]
  ];

    $foo = (object) array_merge( (array)$foo, array( 'url' =>  $allArticles[$i]["url"], 'text' => $allArticles[$i]["abst"], 'qual' => $articleData));

    $return[] = $foo;
  }

  //get user data
  $userdata = [];
  $sentiment = IndicoIo::sentiment_hq($toAnalyze);
  $userdata[] = $sentiment;
  $political = IndicoIo::political($toAnalyze);
  $userdata[] = $political["Conservative"];
  $userdata[] = $political["Green"];
  $userdata[] = $political["Liberal"];
  $userdata[] = $political["Libertarian"];
  $personality = IndicoIo::personality($toAnalyze);
  $userdata[] = $personality["agreeableness"];
  $userdata[] = $personality["conscientiousness"];
  $userdata[] = $personality["extraversion"];
  $userdata[] = $personality["openness"];
  $emotion = IndicoIo::emotion($toAnalyze);
  $userdata[] = $emotion["anger"];
  $userdata[] = $emotion["fear"];
  $userdata[] = $emotion["joy"];
  $userdata[] = $emotion["sadness"];
  $userdata[] = $emotion["surprise"];
  $GLOBALS["userdata"] = $userdata;
  function findEucDistance($arr1, $arr2){
    $sum = 0;
    for($i = 0; $i < count($arr1); $i++){
      $sum += pow($arr1[$i] - $arr2[$i], 2);
    }
    return $sum;
  }
  function cmptwo($a, $b){
    $avals = [];
    for($i = 0; $i < count($a->qual); $i++){
      $avals[] = doubleval($a->qual[$i]);
    }
    $bvals = [];
    for($i = 0; $i < count($b->qual); $i++){
      $bvals[] = doubleval($b->qual[$i]);
    }
    $adist = findEucDistance($avals, $GLOBALS["userdata"]);
    $bdist = findEucDistance($bvals, $GLOBALS["userdata"]);
    if($adist > $bdist) return 1;
    if($adist < $bdist) return -1;
    return 0;
  }
  usort($return, "cmptwo");
  $top50 = array_slice($return, 0, 50);
  $bottom50 = array_slice($return, -50);
  shuffle($top50);
  $finalReturn = [];
  $finalReturn["goodArticles"] = $top50;
  $finalReturn["badArticles"] = $bottom50;
  $finalReturn["userAnalysis"] = $userdata;
  echo(json_encode($finalReturn));
?>
