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


var createBoard = function(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix.push(Array(n));
    matrix[i].fill(0);
  }
  return matrix;
};


var placeQueen = function(x, y, matrix) {
  //find 4 starting positions
  // in [x,y] style
  var matrix = cloneMatrix(matrix);

  var n = matrix.length;

  var vert = [x, 0],
    horiz = [0, y],
    major = [],
    minor = [];

  if (x > y) {
    major = [0, y - x];
  } else {
    major = [x - y, 0];
  }

  if (x + y >= n) {
    minor = [n, x - n];
  } else {
    minor = [x + y, 0];
  }


  //iterate through starting positions
  var iterator = function (x, y, changeX, changeY, string) {
    if ((matrix[y] !== undefined) && (matrix[y][x] !== undefined)) {
      //continue iteration
      console.log(string);
      matrix[y][x] = -1;
      iterator(x + changeX, y + changeY, changeX, changeY);
    }
  };

  iterator(vert[0], vert[1], 0, 1, 'vert'); //vert
  iterator(horiz[0], horiz[1], 1, 0, 'horiz'); //horiz
  iterator(major[0], major[1], 1, 1, 'major'); //major
  iterator(minor[0], minor[1], -1, 1, 'minor'); //minor

  matrix[y][x] = 1;

  console.log(matrix);
  return matrix;
  //set x, y to 1
  //return matrix copy
};

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

var queenSol = function(n) {

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
