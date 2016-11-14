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
	<link rel="stylesheet" href="reset.css" />
	<link rel="stylesheet" href="style.css" />
</head>
<body>
<h1>Current Turn: <span id="turn">O</span></h1>
<canvas id="game" width="300" height="300"></canvas>
<button id="reset">Reset Board</button>
<script src="jquery-3.1.1.js"></script>
<script src="fabric.js"></script>
<script src="https://js.pusher.com/3.2/pusher.min.js"></script>
<script type="text/javascript">
	var my_turn="<?=$_GET['turn'];?>";
</script>
<script src="magic.js"></script>
</body>
</html>