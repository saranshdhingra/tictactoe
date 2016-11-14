<?php
if(!isset($_GET['turn']))
	die('Invalid!');
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
<h1>Current Turn: <span id="turn">O</span></h1>
<canvas id="game" width="300" height="300"></canvas>
<button id="reset">Reset Board</button>
<script src="js/jquery-3.1.1.js"></script>
<script src="js/fabric.js"></script>
<script src="https://js.pusher.com/3.2/pusher.min.js"></script>
<script type="text/javascript">
	var my_turn="<?=$_GET['turn'];?>",
		app_key='<?=getenv('APP_KEY');?>';
</script>
<script src="js/magic.js"></script>
</body>
</html>