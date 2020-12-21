//https://codepen.io/vasanthkay/pen/KVzYzG
//https://www.w3schools.com/howto/howto_css_flip_card.asp

// https://nnattawat.github.io/flip/

//https://codepen.io/Schmuh/pen/VYaEGd


app.controller("ticCtrl", function ($scope, $http) {
	var ROW_SIZE = 3;
	var grid = [];
	var score;
	var moves;
	var EMPTY = "&nbsp;";
	var turn = "X";
	var EMPTY_CELL = 'empty-cell';
	var FULL_CELL = 'full-cell';
	var game_over = false;


	$scope.newGame = function(){
		var board = document.createElement('table');
    	board.setAttribute("border", 1);
    	board.setAttribute("cellspacing", 0);
    	board.setAttribute("id","game-board");
    
		var identifier = 1;
		for (var i = 0; i < ROW_SIZE; i++) {
			var row = document.createElement('tr');
			board.appendChild(row);
			for (var j = 0; j < ROW_SIZE; j++) {
		        var cell = document.createElement('td');
		        var grip  = document.createElement('div');
		        grip.setAttribute('id', 'card'+identifier); 
		      	var div = document.createElement('div');
		        div.setAttribute('align', 'center');
		        div.setAttribute('valign', 'center');
				div.classList.add('col' + j,'row' + i,EMPTY_CELL,'front');
				div.innerHTML = EMPTY;	
				if (i == j) {
					div.classList.add('diagonal0');
				}
				if (j == ROW_SIZE - i - 1) {
					div.classList.add('diagonal1');
				}

 				var div2 = document.createElement('div');
		      
		        div2.setAttribute('align', 'center');
		        div2.setAttribute('valign', 'center');
				div2.classList.add('col' + j,'row' + i,FULL_CELL,'back');
				div2.innerHTML = EMPTY;	
				if (i == j) {
					div2.classList.add('diagonal0');
				}
				if (j == ROW_SIZE - i - 1) {
					div2.classList.add('diagonal1');
				}
				
				grip.identifier = identifier;
				grip.addEventListener("click", $scope.set);

				
				grip.appendChild(div);
				grip.appendChild(div2);
				cell.appendChild(grip);
				row.appendChild(cell);
				grid.push(cell);	

				identifier++;
			}
		}
		document.getElementById("tictactoe").innerHTML = '';
		document.getElementById("tictactoe").appendChild(board);
		 $scope.initBoard();
		 for(var i =1;i<=identifier;i++){
		 	$("#card"+i).flip({
				  axis: 'x'
				});
		 }
	}

	$scope.initBoard= function() {
		score = {
			"X": 0,
			"O": 0
		};
		moves = 0;
		turn = "X";
		game_over = false;
		var fullCells = document.getElementsByClassName(FULL_CELL);
		
		removeBanner();
		document.getElementById('turn').textContent = 'Player ' + turn;

		document.getElementById('startGameButton').innerHTML='Start Game';
		console.log('init');
	}

	$scope.win = function(clicked) {
		// Get all cell classes
		var memberOf = clicked.className.split(/\s+/);
		removeFromArray(memberOf,FULL_CELL);
		removeFromArray(memberOf,'back');
		removeFromArray(memberOf,turn);
		for (var i = 0; i < memberOf.length; i++) {
			var testClass = '.' + memberOf[i];
      		var items = $scope.contains('#tictactoe ' + testClass, turn);
			// winning condition: turn == N_SIZE
			if (items.length == ROW_SIZE) {
				return true;
			}
		}
		return false;
	}


	$scope.contains=function(selector, text) {
	  var elements = document.querySelectorAll(selector);
	  return [].filter.call(elements, function(element){
	    return RegExp(text).test(element.textContent);
	  });
	}


	$scope.set= function() {
		var backCell = jQuery(this).children(".back")[0];
		if (backCell.innerHTML !== EMPTY || game_over) {
			jQuery(this).prop("onclick", null).off("click");
			return;
		}

		playPageFlip();
		backCell.innerHTML=turn;
		backCell.classList.add(turn);
  		document.getElementById('startGameButton').innerHTML='Reset Game';
	
		moves += 1;
		score[turn] += this.identifier;

		if ($scope.win(backCell)) {
			setTimeout($scope.didWin, 0); //must start flip before finishing game.
		} else if (moves === ROW_SIZE * ROW_SIZE) {
			setTimeout($scope.didDraw, 0); //ditto
		} else {
			turn = turn === "X" ? "O" : "X";
			document.getElementById('turn').textContent = 'Player ' + turn;
		}


	}
	$scope.didWin = function(){
		endGame('Winner: Player ' + turn);
	}

	$scope.didDraw = function(){
		endGame('draw');
	}

	var removeFromArray = function(array,value){
		var index = array.indexOf(value);
		if(index > -1){
			array.splice(index,1);
		}
	}

	var endGame = function(end_game_message){
	 	var endBanner = document.createElement('div');
	 	endBanner.setAttribute('id', 'end-ribbon');
	 	endBanner.innerHTML=end_game_message;
	 	document.getElementById("game-board").appendChild(endBanner);

	 	var identifier = ROW_SIZE*ROW_SIZE;
		for(var i =1;i<=identifier;i++){
		 	$("#card"+i).prop("onclick", null).off("click");
		 }

	 	game_over = true;
	}

	var removeBanner =function(){
		var endBanner = document.getElementById("end-ribbon");
		if(endBanner){
			endBanner.parentNode.removeChild(endBanner);
		}
	}
	$("#card0").flip({
  		axis: 'x'
	});

	var playPageFlip= function(){
	  let audio = new Audio();
	  audio.src = "sounds/flip.mp3";
	  audio.load();
	  audio.play();
	}

});

