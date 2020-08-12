//https://codepen.io/vasanthkay/pen/KVzYzG

app.controller("ticCtrl", function ($scope, $http) {
	var ROW_SIZE = 3;
	var grid = [];
	var score;
	var moves;
	var EMPTY = "&nbsp;";
	var turn = "X";

	$scope.newGame = function(){
		var board = document.createElement('table');
    	board.setAttribute("border", 1);
    	board.setAttribute("cellspacing", 0);
    
		var identifier = 1;
		for (var i = 0; i < ROW_SIZE; i++) {
			var row = document.createElement('tr');
			board.appendChild(row);
			for (var j = 0; j < ROW_SIZE; j++) {
		        var cell = document.createElement('td');
		        cell.setAttribute('height', 120);
		        cell.setAttribute('width', 120);
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
		grid.forEach(function (square) {
			square.innerHTML = EMPTY;
		});
		console.log('init');
	}

	$scope.win = function(clicked) {
		// Get all cell classes
		var memberOf = clicked.className.split(/\s+/);
		for (var i = 0; i < memberOf.length; i++) {
			var testClass = '.' + memberOf[i];
      var items = $scope.contains('#tictactoe ' + testClass, turn);
			// winning condition: turn == N_SIZE
			if (items.length == N_SIZE) {
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
		moves += 1;
		score[turn] += this.identifier;
		if ($scope.win(this)) {
			alert('Winner: Player ' + turn);
			$scope.initBoard();
		} else if (moves === ROW_SIZE * ROW_SIZE) {
			alert("Draw");
			$scope.initBoard();
		} else {
			turn = turn === "X" ? "O" : "X";
			document.getElementById('turn').textContent = 'Player ' + turn;
		}
	}
});