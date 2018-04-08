<?php
function dbConnect(){
  $servername = "localhost";
  $dbname = "nytimes";
  $username = "root";
  $password = "";
  $conn = new PDO("mysql:host=".$servername.";dbname=".$dbname, $username, $password);
  //error mode (just in case)
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $conn;
}

?>
