//https://codepen.io/vasanthkay/pen/KVzYzG
//https://stackoverflow.com/questions/40218942/css-flip-animation-on-click

// https://nnattawat.github.io/flip/

app.controller("ticCtrl", function ($scope, $http) {
	var ROW_SIZE = 3;
	var grid = [];
	var score;
	var moves;
	var EMPTY = "&nbsp;";
	var turn = "X";
	var EMPTY_CELL = 'empty-cell';
	var FULL_CELL = 'full-cell';


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
		        cell.setAttribute('class', EMPTY_CELL);
		        cell.setAttribute('align', 'center');
		        cell.setAttribute('valign', 'center');
				cell.classList.add('col' + j,'row' + i);

				if (i == j) {
					cell.classList.add('diagonal0');
				}
				if (j == ROW_SIZE - i - 1) {
					cell.classList.add('diagonal1');
				}
				cell.identifier = identifier;
				cell.addEventListener("click", $scope.set);
				row.appendChild(cell);
				grid.push(cell);

				identifier += identifier;
			}
		}
		document.getElementById("tictactoe").innerHTML = '';
		document.getElementById("tictactoe").appendChild(board);
		 $scope.initBoard();
	}

	$scope.initBoard= function() {
		score = {
			"X": 0,
			"O": 0
		};
		moves = 0;
		turn = "X";
		var fullCells = document.getElementsByClassName(FULL_CELL);
		
		while(fullCells.length>0){
			var cell = fullCells[0];
			cell.classList.remove(FULL_CELL);
			cell.classList.add(EMPTY_CELL);
		}
			
		
		

		document.getElementById('turn').textContent = 'Player ' + turn;
		grid.forEach(function (square) {
			square.innerHTML = EMPTY;
		});
		document.getElementById('startGameButton').innerHTML='Start Game';
		console.log('init');
	}

	$scope.win = function(clicked) {
		// Get all cell classes
		var memberOf = clicked.className.split(/\s+/);
		removeFromArray(memberOf,FULL_CELL);
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
		if (this.innerHTML !== EMPTY) {
			return;
		}
		this.innerHTML = turn;
  		this.classList.remove(EMPTY_CELL);
  		this.classList.add(FULL_CELL);
  		document.getElementById('startGameButton').innerHTML='Reset Game';
	

		moves += 1;
		score[turn] += this.identifier;
		if ($scope.win(this)) {
			setTimeout($scope.didWin, 200);
		} else if (moves === ROW_SIZE * ROW_SIZE) {
			endGame('draw');
			$scope.initBoard();
		} else {
			turn = turn === "X" ? "O" : "X";
			document.getElementById('turn').textContent = 'Player ' + turn;
		}
	}
	$scope.didWin = function(){
		endGame('Winner: Player ' + turn);
		$scope.initBoard();
	}

	var removeFromArray = function(array,value){
		var index = array.indexOf(value);
		if(index > -1){
			array.splice(index,1);
		}
	}

	var endGame = function(end_game_message){
	 	var endBanner = document.createElement('div');
	 	endBanner.setAttribute('class', 'end-ribbon');
	 	endBanner.innerHTML=end_game_message;
	 	document.getElementById("game-board").appendChild(endBanner);
	}


});

