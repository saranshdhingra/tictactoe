jQuery(document).ready(function($){
	var canvas = new fabric.Canvas('game'),
		score=[
			[-1,-1,-1],
			[-1,-1,-1],
			[-1,-1,-1]
		],
		cellSize=100,
		turn='O',
		winner=false;

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
		canvas.add(rect);

		//click handler
		rect.on("selected",function(){
			if(winner || this.hasAdded)
				return false;
			var index=this.cellIndex,
				j=parseInt(index/3),	//i and j are interchanged
				i=index%3,
				props={
				left:left+20,
				top:top+20,
				fontSize:80,
				fill:(turn=="O")?"#000":"#f00",
				fontFamily:'Verdana',
				hasControls:false,
				hasBorders:false,
				hasRotatingPoint:false,
				lockMovementX:true,
				lockMovementY:true,
			};
			score[i][j]=turn;
			if(turn=="O"){
				canvas.add(new fabric.Text('O', props));
				turn='X';
			}
			else if(turn=="X"){
				canvas.add(new fabric.Text('X', props));
				turn='O';
			}
			this.hasAdded=true;
			if(check_winner())
				alert(winner+" has won!");
		});
	}

	function init(){
		//create a grid
		// the grid is a network of rectangles which when clicked will do the computations
		for(var i=0;i<canvas.width/cellSize;i++){
			for(var j=0;j<canvas.height/cellSize;j++){
				var cell=new Cell(i*cellSize,j*cellSize,(3*i)+j);
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
				return true;
			}
		}

		//2
		for(var i=0;i<3;i++){
			if(areEqual(score[0][i],score[1][i],score[2][i]) && score[0][i]!=-1){
				winner=score[0][i];
				return true;
			}
		}

		//3
		if(areEqual(score[0][0],score[1][1],score[2][2]) && score[0][0]!=-1){
			winner=score[0][0];
			return true;
		}

		//4
		if(areEqual(score[0][2],score[1][1],score[2][0]) && score[2][0]!=-1){
			winner=score[2][0];
			return true;
		}
		return false;
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