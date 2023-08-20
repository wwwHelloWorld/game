import { DataItem } from "@/store/reducers";

export const winCombinations  = (gameData: DataItem) => {
  const winCombinations = [
    [0, 1, 2], // Первая горизонталь
    [3, 4, 5], // Вторая горизонталь
    [6, 7, 8], // Третья горизонталь
    [0, 3, 6], // Первая вертикаль
    [1, 4, 7], // Вторая вертикаль
    [2, 5, 8], // Третья вертикаль
    [0, 4, 8], // Первая диагональ
    [2, 4, 6], // Вторая диагональ
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    console.log(gameData[a], gameData[b], gameData[c])
    if (gameData[a] === gameData[b] && gameData[b] === gameData[c] && gameData[a] !== "empty") {
      return [true, gameData[a]]; // Игрок выиграл
    }

  }
  return false;
}
