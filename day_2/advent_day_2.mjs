import { readFileSync } from "node:fs";

// A -> Rock
// B -> Paper
// C -> Scissors
// X -> Rock -> 1
// Y -> Paper -> 2
// Z -> Scissors -> 3

// A = X
// A < Y
// A > Z

// B > X
// B = Y
// B < Z

// C < X
// C > Y
// C = Z

// // Part 2
// X -> lose
// Y -> draw
// Z -> win

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const symbolToPoints = {
  X: 1,
  Y: 2,
  Z: 3,
};

const resultPredictedToPoints = {
  X: 0,
  Y: 3,
  Z: 6,
};

const decideWinner = (a, b) => {
  let matchPoints = 0;
  matchPoints += symbolToPoints[b];

  if (a === "A") {
    b === "X"
      ? (matchPoints += DRAW)
      : b === "Y"
      ? (matchPoints += WIN)
      : (matchPoints += LOSE);
  } else if (a === "B") {
    b === "X"
      ? (matchPoints += LOSE)
      : b === "Y"
      ? (matchPoints += DRAW)
      : (matchPoints += WIN);
  } else {
    b === "X"
      ? (matchPoints += WIN)
      : b === "Y"
      ? (matchPoints += LOSE)
      : (matchPoints += DRAW);
  }
  return matchPoints;
};

const decideWinnerPartII = (a, b) => {
  let matchPoints = 0;
  matchPoints += resultPredictedToPoints[b];

  if (b === "X") {
    a === "A"
      ? (matchPoints += symbolToPoints["Z"])
      : a === "B"
      ? (matchPoints += symbolToPoints["X"])
      : (matchPoints += symbolToPoints["Y"]);
  } else if (b === "Y") {
    a === "A"
      ? (matchPoints += symbolToPoints["X"])
      : a === "B"
      ? (matchPoints += symbolToPoints["Y"])
      : (matchPoints += symbolToPoints["Z"]);
  } else {
    a === "A"
      ? (matchPoints += symbolToPoints["Y"])
      : a === "B"
      ? (matchPoints += symbolToPoints["Z"])
      : (matchPoints += symbolToPoints["X"]);
  }

  return matchPoints;
};

try {
  const input = readFileSync("./advent_day_2.txt", "utf8");
  let points = 0;
  let pointsPartII = 0;

  for (let i = 0; i < input.length + 1; i++) {
    let tmpPoints = 0;
    let tmpPointsPartII = 0;
    if (input[i] === "\n" || i === input.length) {
      tmpPoints += decideWinner(input[i - 3], input[i - 1]);
      tmpPointsPartII += decideWinnerPartII(input[i - 3], input[i - 1]);

      points += tmpPoints;
      pointsPartII += tmpPointsPartII;
    }
  }
  console.log(points, pointsPartII);
} catch (e) {
  console.error(e);
}
