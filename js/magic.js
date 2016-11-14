var cells=[
			[-1,-1,-1],
			[-1,-1,-1],
			[-1,-1,-1]
		];
jQuery(document).ready(function($){
	Pusher.logToConsole = true;

	var canvas = new fabric.Canvas('game'),
		score=[
			[-1,-1,-1],
			[-1,-1,-1],
			[-1,-1,-1]
		],
		cellSize=100,
		turn="O",	//The starting turn will always be O
		winner=false;
		pusher = new Pusher(app_key, {
			cluster: 'ap1',
			encrypted: true
		}),
		channel = pusher.subscribe('tic_tac_toe');

		channel.bind('score_changed', function(data) {
			score=data.score;
			turn=data.turn;
			sync_score();
			// if(data.turn!=my_turn)
			// 	return false;
		});

	//the cell object which will handle our clicks and posseses all the balls
	var Cell=function(left,top,index){
		var rect=new fabric.Rect({
			hasControls:false,
			hasBorders:false,
			hasRotatingPoint:false,
			lockMovementX:true,
			lockMovementY:true,
			left:left,
			top:top,
			width:cellSize,
			height:cellSize,
			fill:'rgba(0,0,0,0)',
			stroke:'#000',
			strokeWidth:1
		});
		rect.cellIndex=index;
		rect.posLeft=left;
		rect.posTop=top;
		canvas.add(rect);

		//click handler
		rect.on("selected",function(){
			if(winner || this.hasAdded || turn!=my_turn)
				return false;
			
			var index=this.cellIndex,
				i=parseInt(index/3),
				j=index%3;
			score[i][j]=my_turn;
			turn=my_turn=="O"?"X":"O";
			sync_score();

			$.post("push.php",{score:score,turn:turn});
		});

		this.rect=rect;
	}

	//draw either O or X
	function draw_obj(obj,entity){
		var index=obj.cellIndex,
			i=parseInt(index/3),
			j=index%3,
			props={
			left:obj.posLeft+10,
			top:obj.posTop+10,
			fontSize:80,
			fill:(entity=="O")?"#000":"#f00",
			fontFamily:'Cursive',
			hasControls:false,
			hasBorders:false,
			hasRotatingPoint:false,
			lockMovementX:true,
			lockMovementY:true,
		};
		
		if(entity=="O"){
			canvas.add(new fabric.Text('O', props));
		}
		else if(entity=="X"){
			canvas.add(new fabric.Text('X', props));
		}
		obj.hasAdded=true;
	}

	function init(){
		//create a grid
		// the grid is a network of rectangles which when clicked will do the computations
		//i is the row, j is the column
		for(var i=0;i<canvas.width/cellSize;i++){
			for(var j=0;j<canvas.height/cellSize;j++){
				var cell=new Cell(j*cellSize,i*cellSize,(3*i)+j);
				cells[i][j]=cell;
			}
		}
	}

	//a winner is declared if:
	//	1. all horizontal values are same
	//	2. all vertical values are same
	//	3. all main diagonal values are same
	//	4. all secondary diagonal values are same
	function check_winner(){
		//1
		for(rowKey in score){
			var row=score[rowKey];
			if(areEqual(row[0],row[1],row[2]) && row[0]!=-1){
				winner=row[0];
				winning_stroke(rowKey*3,rowKey*3+2);
				return true;
			}
		}

		//2
		for(var i=0;i<3;i++){
			if(areEqual(score[0][i],score[1][i],score[2][i]) && score[0][i]!=-1){
				winner=score[0][i];
				winning_stroke(i,6+i);
				return true;
			}
		}

		//3
		if(areEqual(score[0][0],score[1][1],score[2][2]) && score[0][0]!=-1){
			winner=score[0][0];
			winning_stroke(0,8);
			return true;
		}

		//4
		if(areEqual(score[0][2],score[1][1],score[2][0]) && score[2][0]!=-1){
			winner=score[2][0];
			winning_stroke(2,6);
			return true;
		}
		return false;
	}

	//function to draw a stroke for the wining combinations
	function winning_stroke(start,end){

		var startI=start%3,
			startJ=parseInt(start/3),
			endI=end%3,
			endJ=parseInt(end/3);
			x1=100*startI+50,
				y1=100*startJ+50,
				x2=100*endI+50,
				y2=100*endJ+50


		canvas.add(new fabric.Line([x1,y1,x2,y2],{
			stroke:(winner=="O")?"#f00":"#000",
			strokeWidth:2
		}));
	}

	//reset that bitch!
	function reset_board(){
		turn="O";
		score.forEach(function(row){
			row[0]=row[1]=row[2]=-1;
		});
		winner=false;
		canvas.clear();
		init();
	}

	//sync the board based on the score
	function sync_score(){
		for(var i=0;i<score.length;i++){
			for(var j=0;j<score[i].length;j++){
				if(score[i][j]!=-1){
					var cell=cells[i][j];
					draw_obj(cell.rect,score[i][j]);
				}
			}
		}
		check_winner();
		$("#turn").html(turn);
	}

	//check multiple value equality irrespective of their number
	function areEqual(){
		var len = arguments.length;
		for (var i = 1; i< len; i++){
		  if (arguments[i] == null || arguments[i] != arguments[i-1])
			 return false;
		}
		return true;
	}

	init();

	$("#reset").on("click",function(e){
		e.preventDefault();
		reset_board();
	});
});