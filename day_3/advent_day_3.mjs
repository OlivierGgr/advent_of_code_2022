import { readFileSync } from "node:fs";

const lowerCaseChars = Array.from(Array(26)).map((_, i) => i + 97);
const upperCaseChars = Array.from(Array(26)).map((_, i) => i + 65);
const alphabet = [
  ...lowerCaseChars.map((x) => String.fromCharCode(x)),
  ...upperCaseChars.map((x) => String.fromCharCode(x)),
];

const findCommonItemInStr = (str) => {
  const firstHalf = str.substring(0, str.length / 2);
  const secondHalf = str.substring(str.length / 2);
  let commonItem = "";

  for (let i = 0; i < firstHalf.length; i++) {
    if (secondHalf.includes(firstHalf[i])) commonItem = firstHalf[i];
  }

  return alphabet.findIndex((el) => el === commonItem) + 1;
};

const findCommonItemInTriplet = (strings) => {
  const tmpStrings = strings.split("\n", 3).sort((a, b) => b.length - a.length);
  let commonItem = "";
  for (let i = 0; i < tmpStrings[0].length; i++) {
    if (
      tmpStrings[1].includes(tmpStrings[0][i]) &&
      tmpStrings[2].includes(tmpStrings[0][i])
    )
      commonItem = tmpStrings[0][i];
  }
  return alphabet.findIndex((el) => el === commonItem) + 1;
};

try {
  const input = readFileSync("./advent_day_3.txt", "utf-8");

  let tmp = "";
  let prioritiesSum = 0;

  let tmpGroups = "";
  let lineCount = 0;
  let prioritiesSumTriplet = 0;
  for (let i = 0; i < input.length + 1; i++) {
    if (input[i] !== "\n" || i !== input.length) {
      tmp += input[i] ?? "";
      tmpGroups += input[i] ?? "";
    }
    if (input[i] === "\n" || i === input.length) {
      prioritiesSum += findCommonItemInStr(tmp);
      tmp = "";
      lineCount++;
    }
    if (lineCount === 3) {
      prioritiesSumTriplet += findCommonItemInTriplet(tmpGroups);
      tmpGroups = "";
      lineCount = 0;
    }
  }
  console.log(prioritiesSum, prioritiesSumTriplet);
} catch (e) {
  console.error(e);
}
