<?php
require('vendor/autoload.php');

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$options = array(
'cluster' => 'ap1',
'encrypted' => true
);
$pusher = new Pusher(
	getenv('APP_KEY'),
	getenv('APP_SECRET'),
	getenv('APP_ID'),
	$options
);

if(!isset($_POST['event'])){
	die('Invalid!');
}

$event=trim($_POST['event']);

if($event=="joined"){
	$pusher->trigger('tic_tac_toe', 'joined'.$_POST['hash'],[]);
	die('done');
}
else if($event=="score_changed"){
	//use proper validations here
	if(!isset($_POST['score']) || ($_POST['turn']!="O" && $_POST['turn']!="X") )
		die('invalid');
	$pusher->trigger('tic_tac_toe', 'score_changed'.$_POST['hash'],[
		'score'=>$_POST['score'],
		'turn'=>$_POST['turn']
	]);

	die('hey');
}


//return i,j,turn
//receive i,j,turn