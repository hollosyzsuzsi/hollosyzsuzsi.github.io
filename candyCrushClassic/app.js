document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const startBtn = document.querySelector("#startgame");
  const timeLeft = document.querySelector("#time-left");
  const width = 8;
  const squares = [];
  let score = 0;
  let currentTime = 60;
  let newScore = 0;

  const candyColors = [
    "url(images/red-candy.png)",
    "url(images/yellow-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/green-candy.png)",
    "url(images/blue-candy.png)",
  ];

  //create board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      square.style.backgroundSize = "cover";
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();

  function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    //currentTime = Math.max(currentTime - 1, 0);

    if (currentTime === 0) {
      //clearInterval(currentTime);
      alert("TIME'S UP! Your final score is " + score);
    }
  }

  //drag the candies
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  //function dragStart() {
  //  colorBeingDragged = this.style.backgroundImage;
  //  squareIdBeingDragged = parseInt(this.id);
  //  console.log(colorBeingDragged);
  //  console.log(this.id, "dragstart");
  //}

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    const [row, col] = getRowAndCol(squareIdBeingDragged);
    initialRow = row;
    initialCol = col;
    console.log(colorBeingDragged);
    console.log(this.id, "dragstart");
  }

  function getRowAndCol(squareId) {
    const row = Math.floor(squareId / width);
    const col = squareId % width;
    return [row, col];
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    //what is a valid move?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
      //} else
      //  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  function dragDrop() {
    console.log(this.id, "dragdrop");

    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares.style.backgroundImage = colorBeingReplaced;
  }

  //function dragDrop() {
  //  console.log(this.id, "dragdrop");
  //
  //  colorBeingReplaced = this.style.backgroundImage;
  //  squareIdBeingReplaced = parseInt(this.id);
  //  this.style.backgroundImage = colorBeingDragged;
  //
  //  const [row, col] = getRowAndCol(squareIdBeingReplaced);
  //
  //  const isValidMove =
  //    (Math.abs(initialRow - row) === 1 && initialCol === col) ||
  //    (Math.abs(initialCol - col) === 1 && initialRow === row);
  //
  //  if (!isValidMove || !isMatch()) {
  //    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
  //    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  //  }
  //}

  function isMatch() {
    return (
      checkRowForThree() ||
      checkColumnForThree() ||
      checkRowForFour() ||
      checkColumnForFour()
    );
  }

  // drop candies once some have been cleared
  function moveDown() {
    for (i = 0; i < 63; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // function moveDown() {
  //   for (let i = squares.length - 1; i >= 0; i--) {
  //     const currentSquare = squares[i];
  //     const nextRowSquare = squares[i + width];
  //
  //     if (nextRowSquare && nextRowSquare.style.backgroundImage === "") {
  //       nextRowSquare.style.backgroundImage =
  //         currentSquare.style.backgroundImage;
  //       currentSquare.style.backgroundImage = "";
  //
  //       // Check if it's the first row and the current cell is empty
  //       const isFirstRow = i < width;
  //       if (isFirstRow && currentSquare.style.backgroundImage === "") {
  //         let randomColor = Math.floor(Math.random() * candyColors.length);
  //         currentSquare.style.backgroundImage = candyColors[randomColor];
  //       }
  //     }
  //   }
  // }
  //
  //check for matches
  //check for row of four
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowForFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowForFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowForFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkRowForFour();

  //check column for four
  function checkColumnForFour() {
    for (i = 0; i < 47; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFour.every((index) =>
          squares[index]
            ? squares[index].style.backgroundImage === decidedColor && !isBlank
            : ""
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkColumnForFour();

  //check for row of three
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkRowForThree();

  //check column for three
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkColumnForThree();

  startBtn.addEventListener("click", () => {
    setInterval(function () {
      moveDown();
      checkRowForFour();
      checkColumnForFour();
      checkRowForThree();
      checkColumnForThree();
    }, 100);

    startBtn.style.display = "none";
    let currentTime = setInterval(countDown, 1000);

    //countDown();
  });

  //if (newScore === score) {
  //  squareIdBeingDragged = colorBeingDragged;
  //} else {
  //  score = newScore;
  //}
});
