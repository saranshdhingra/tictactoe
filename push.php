<?php
require('vendor/autoload.php');

$options = array(
'cluster' => 'ap1',
'encrypted' => true
);
$pusher = new Pusher(
'YOUR_APP_KEY',
'YOUR_APP_SECRET',
'YOUR_APP_ID',
$options
);

//use proper validations here
if(!isset($_POST['score']) || ($_POST['turn']!="O" && $_POST['turn']!="X") )
	die('invalid');
$pusher->trigger('tic_tac_toe', 'score_changed',[
	'score'=>$_POST['score'],
	'turn'=>$_POST['turn']
]);

die('hey');
//return i,j,turn
//receive i,j,turn