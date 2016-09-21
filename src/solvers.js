/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


var cloneMatrix = function(matrix) {
  var result = [];
  for (var x in matrix) {
    result[x] = matrix[x].slice();
  }
  return result;
};

var rookSol = function(n) {
  //returns a list of solution matrixies
  //input only accepts n > 0
  var sol = [];
  var size = n;
  var board = new Board({n: size});

  var recursor = function(b, depth, cols) {
    if (depth < size) {
      //add children to solution tree
      for (var i = 0; i < size; i++) {
        //make new board with piece set down in valid position
        if (cols.indexOf(i) === -1) {
          //add col to personal col;
          var arr = cols.concat([i]);
          var matrix = b.rows();
          matrix = cloneMatrix(matrix);
          matrix[depth][i] = 1;
          var currBoard = new Board(matrix);
          recursor(currBoard, depth + 1, arr);
        }
      }
    } else {
      var matrix = b.rows();
      sol.push(matrix);
    }
  };
  recursor(board, 0, []);
  return sol;
};



window.findNRooksSolution = function(n) {
  if (n === 0) {
    return [[]];
  }
  var arr = rookSol(n);
  var solution = arr[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 0;
  }
  var arr = rookSol(n);
  var solutionCount = arr.length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
