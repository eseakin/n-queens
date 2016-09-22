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
  // console.log('placing queen at x:' + x + " y: " + y);
  var matrix = cloneMatrix(matrix);

  var n = matrix.length;

  var vert = [x, 0],
    horiz = [0, y],
    major = [],
    minor = [];

  if (x > y) {
    major = [x - y, 0];
  } else {
    major = [0, y - x];
  }

//the holy grail
  if ((x + y) >= n) {
    minor = [(n - 1), (x + y - n + 1)];
  } else {
    minor = [x + y, 0];
  }
  // console.log(vert);
  // console.log(horiz);
  // console.log(major);
  // console.log(minor);
  var counter = 0;
  //iterate through starting positions
  var iterator = function (x, y, changeX, changeY, string) {
    if ((matrix[y] !== undefined) && (matrix[y][x] !== undefined)) {
      counter++;
      // console.log('iteration #' + counter);
      //continue iteration
      // console.log(string);
      matrix[y][x] = -1;
      iterator(x + changeX, y + changeY, changeX, changeY);
    }
  };

  iterator(vert[0], vert[1], 0, 1, 'vert'); //vert
  iterator(horiz[0], horiz[1], 1, 0, 'horiz'); //horiz
  iterator(major[0], major[1], 1, 1, 'major'); //major
  iterator(minor[0], minor[1], -1, 1, 'minor'); //minor

  matrix[y][x] = 1;

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
  //for each elem in first row, placequeen there
  //recursively call queensol n - 1 times on each matrix
  //if unable to add queen before end of calls, do not add to solutions
  var sol = [];
  var myBoard = createBoard(n);

  var recursor = function(b, depth) {
    if (depth < n) {
      for (var i = 0; i < n; i++) {
        //if it finds a empty spot
        if (b[depth][i] === 0) {
          var newBoard = placeQueen(i, depth, b);
          recursor(newBoard, depth + 1);
        }
      }
    } else {
      sol.push(b);
    }
  };

  recursor(myBoard, 0);


  return sol;
};

//remove the -1s from a solutions array of matrices
var cleanSol = function(sol) {
  var cleanedSol = [];
  var newMatrix = [];

  for (var mat = 0; mat < sol.length; mat++) {
    newMatrix = cloneMatrix(sol[mat]);
    cleanedSol.push(newMatrix);
  }

  for (var m = 0; m < cleanedSol.length; m++) {
    for (var y = 0; y < cleanedSol[m].length; y++) {
      for (var x = 0; x < cleanedSol[m][y].length; x++) {
        if (cleanedSol[m][y][x] === -1) {
          cleanedSol[m][y][x] = 0;
        }
      }
    }
  }

  return cleanedSol;
};

//GET ALL SOLUTIONS
var myRookSols = Array(9);
var myQueenSols = Array(9);

var getSols = function() {

  for (var i = 0; i < 9; i++) {
    myRookSols[i] = cleanSol(rookSol(i));
    myQueenSols[i] = cleanSol(queenSol(i));
  }
};

getSols();

window.findNRooksSolution = function(n) {
  if (n === 0) {
    return [[]];
  }
  var solution = myRookSols[n][0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 0;
  }
  var solutionCount = myRookSols[n].length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  if (myQueenSols[n].length === 0) {
    return createBoard(n);
  }

  var solution = myQueenSols[n][0];
  console.log('solutions for n:' + n + ' =');
  console.log(myQueenSols[n]);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  console.log(myQueenSols);
  var solutionCount = myQueenSols[n].length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
