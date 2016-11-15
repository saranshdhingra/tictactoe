# Tic Tac Toe
A simple snippet to create a Tic Tac Toe game in multiplayer. The front end is taken care of by **Canvas/FabricJs**. In order to sync the scores, I use **Pusher**.

## To play:
Simply open the **index.php** in 2 different browsers/tabs to play the game. Rest should be simple enough :P

## To do:
	- Subscribe to only those channels that have joined the game based on the custom hash.
	- Don't start the game until the event is subscribed from Pusher.(Implement loaders for the same)