<?php
$servername = "localhost";
$username = "raghuls";
$password = "sraghulmgayathri";
$dbname = "rdins";
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn)
  die("Security System Does Not Let You Access The Database");

$idno = $_POST['idno'];
$trcode = $_POST['trcode'];
$addid = $_POST['addid'];
$nam = $_POST['nam'];
$sex = $_POST['sex'];
$ph1 = $_POST['ph1'];
$ph2 = $_POST['ph2'];
$mail1 = $_POST['mail1'];
$mail2 = $_POST['mail2'];
$add1 = $_POST['add1'];
$add2 = $_POST['add2'];
$hostel = $_POST['hostel'];
$vno = $_POST['vno'];
$stage = $_POST['stage'];
$adno = $_POST['adno'];
$pan = $_POST['pan'];
$qual = $_POST['qual'];
$des = $_POST['des'];
$des2 = $_POST['des2'];
$des3 = $_POST['des3'];
$doj = $_POST['doj'];
$wexp = $_POST['wexp'];
$fnam = $_POST['fnam'];
$fp1 = $_POST['fp1'];
$fp2 = $_POST['fp2'];
$mnam = $_POST['mnam'];
$mp1 = $_POST['mp1'];
$mp2 = $_POST['mp2'];
$spnam = $_POST['spnam'];
$sp1 = $_POST['sp1'];
$sp2 = $_POST['sp2'];
$nationality = $_POST['nationality'];
$caste = $_POST['caste'];
$commu = $_POST['commu'];
$religion = $_POST['religion'];
$hoby = $_POST['hoby'];
$amb = $_POST['amb'];
$spoint = $_POST['spoint'];
$bg = $_POST['bg'];
$mediss = $_POST['mediss'];
$ht = $_POST['ht'];
$wt = $_POST['wt'];
$tnc = $_POST['tnc'];

$sql = "SELECT * FROM teachers WHERE tnc='$tnc'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) 
     echo("Sorry Login ID is Already Taken");

$tpass = $_POST['tpass'];
$tcpass = $_POST['tcpass'];

if($tpass!=$tcpass)
     echo("Password and Confirm Password does not Match");

$tcphno1 = $_POST['tcphno1'];
$tcphno2 = $_POST['tcphno2'];
$tcmail1 = $_POST['tcmail1'];
$tcmail2 = $_POST['tcmail2'];

$sql = "INSERT INTO teachers (idno, trcode, addid, nam, sex, ph1, ph2, mail1, mail2, add1, add2, hostel, vno, stage, adno, pan, qual, des, des2, des3, doj, wexp, fnam, fp1, fp2, mnam, mp1, mp2, spnam, sp1, sp2, nationality, caste, commu, religion, hoby, amb, spoint, bg, mediss, ht, wt, tnc, tpass, tcpass, tcphno1, tcphno2, tcmail1, tcmail2) 
VALUES ('$idno', '$trcode', '$addid', '$nam', '$sex', '$ph1', '$ph2', '$mail1', '$mail2', '$add1', '$add2', '$hostel', '$vno', '$stage', '$adno', '$pan', '$qual', '$des', '$des2', '$des3', '$doj', '$wexp', '$fnam', '$fp1', '$fp2', '$mnam', '$mp1', '$mp2', '$spnam', '$sp1', '$sp2', '$nationality', '$caste', '$commu', '$religion', '$hoby', '$amb', '$spoint', '$bg', '$mediss', '$ht', '$wt', '$tnc', '$tpass', '$tcpass', '$tcphno1', '$tcphno2', '$tcmail1', '$tcmail2')";

if (mysqli_query($conn, $sql)) 
  echo("Congratulations! You Are Registered");
else 
  echo("Error: " . $sql . "<br>" . mysqli_error($conn));

mysqli_close($conn);