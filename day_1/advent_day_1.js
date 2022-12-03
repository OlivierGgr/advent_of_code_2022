// import { readFileSync } from "node:fs";
const { readFileSync } = require("node:fs");

const addValuesInArray = (arr) => arr.reduce((prev, curr) => prev + curr, 0);

try {
  const input = readFileSync("./advent_day_1.txt", "utf8");
  const data = [];
  let tmp = [];

  let tmpStr = "";

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "\n" && !/^\s*$/.test(input[i])) {
      tmpStr += input[i];
    } else if (input[i] === "\n") {
      if (input[i + 1] === "\n") {
        tmpStr !== "" && tmp.push(+tmpStr);
        data.push(addValuesInArray(tmp));
        tmpStr = "";
        tmp = [];
      }
      tmpStr !== "" && tmp.push(+tmpStr);
      tmpStr = "";
    }
  }

  const topCarrier = data.reduce((prev, curr) => {
    if (curr > prev) return curr;
    else return prev;
  }, 0);

  const topThreeCarriers = data.sort().slice(data.length - 3);

  console.log({
    topCarrier,
    topThreeCarriers: addValuesInArray(topThreeCarriers),
  });
} catch (e) {
  console.error(e);
}
