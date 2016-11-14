Tic Tac Toe
A simple snippet to create a Tic Tac Toe game in multiplayer. The front end is taken care of by Canvas/FabricJs. In order to sync the scores, I use Pusher.

To play:
Simply open the index.php?turn=O and index.php?turn=X in 2 different browsers/tabs to play the game. Rest should be simple enough :P

To do:
	- Create a hash token for every game so that people can play with a specific person.
	- Invoke/subscribe to a custom event for every game.
	- Don't start the game until the event is subscribed from Pusher.