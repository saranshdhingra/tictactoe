<?php
require('vendor/autoload.php');

$options = array(
'cluster' => 'ap1',
'encrypted' => true
);
$pusher = new Pusher(
'c26af291eb975bd35118',
'45420ff47a8f07a673cc',
'269113',
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