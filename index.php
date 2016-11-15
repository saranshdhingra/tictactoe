<?php
require('vendor/autoload.php');

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

?>
<!DOCTYPE html>
<html>
<head>
	<title>Tic Tac Toe</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
<div id="welcome_frame" class="frame grid vertical align-center justify-center cover left-cor">
	<button id="start_game" class="btn1">Start Game</button>
	<button id="join_game" class="btn2">Join Game</button>
</div>
<div id="game_frame" class="frame cover left-cor">
	<h1>Game Code: <span id="hash"></span></h1>
	<h1>Game State: <span id="game_state">Waiting for someone to join!</span></h1>
	<canvas id="game" width="300" height="300"></canvas>
	<button id="reset" class="btn2">Reset Board</button>
</div>
<script src="js/jquery-3.1.1.js"></script>
<script src="js/fabric.js"></script>
<script src="https://js.pusher.com/3.2/pusher.min.js"></script>
<script type="text/javascript">
	var app_key='<?=getenv('APP_KEY');?>';
</script>
<script src="js/magic.js"></script>
</body>
</html>