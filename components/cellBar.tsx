"use client";
import Cell from "./сell";
import styles from "../app/styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Key,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  addSing,
  updateData,
  getData,
  resetGame,
  isActiveGame,
  setSing,
  setActiveSing,
  setIsReset,
} from "@/store/reducers";
import Button from "./button";
import { winCombinations } from "./utils/winCombinations";

function CellBar() {
  // const [endGame, setEndGame] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const isActive = useSelector((store: any) => store.gameData.isActiveGame);
  const gameData = useSelector((store: any) => store.gameData.gameData);
  const allState = useSelector((store: any) => store.gameData);
  const activeSing = useSelector((store: any) => store.gameData.activeSing);
  const sing = useSelector((store: any) => store.gameData.sing);
  const isGameOver = useSelector((store: any) => store.gameData.isGameOver);

  console.log(isActive);

  const dispatch = useDispatch();

  const moveHandler = useCallback(
    (index: number) => {
      // Обработчик клика оптимизирован с помощью useCallback, чтобы не создавать новые функции при каждом ререндере
      if (isActive && sing === activeSing) {
        dispatch(addSing({ index }));
        dispatch(setActiveSing(sing === "one" ? "null" : "one"));
        dispatch(updateData() as any);
      } else if (isActive && sing !== activeSing) {
        alert("IS NOT YOUR MOVE! WAIT!");
      } else {
        alert("PRESS START BUTTON FOR STARTING THE GAME");
      }
    },
    [isActive, sing, activeSing, dispatch]
  );

  useLayoutEffect(() => {

    setInterval(() => {
      dispatch(getData() as any);
    }, 7000);

  }, []);

  useLayoutEffect(() => {
    const win: any = winCombinations(gameData);
    console.log(win + "WIN");
    if (win[0] && !isWinner ) {
      // alert(`WIN! ${win[1]} is winner!`);
      console.log("WINWINWIN")
      setIsWinner(true);
      dispatch(isActiveGame(false));
      dispatch(updateData() as any);
    }
  }, [gameData]);

  const resetHandler = () => {
    dispatch(resetGame({}));
    dispatch(isActiveGame(false) as any);
    dispatch(setIsReset(true));
    dispatch(updateData() as any);
  };

  const startHandler = () => {
    dispatch(resetGame({}));
    dispatch(isActiveGame(true) as any);
    dispatch(setSing("one"));
    dispatch(setActiveSing("one"));
    dispatch(setIsReset(false));
    dispatch(updateData() as any);
  };

  console.log(allState);

  return (
    <>
      <div className={styles["cellBar-container"]}>
        <div className={styles.cellBar}>
          {gameData.map((el: any, i: number) => (
            <div key={i} onClick={() => moveHandler(i)}>
              <Cell type={el} />
            </div>
          ))}
        </div>
      </div>
      {isWinner && (
      <h1>{`WIN!  ${winCombinations(gameData)[1]} is winner!`}</h1>
      )
      }
      <Button action={resetHandler} text="reset" />
      <Button action={startHandler} text="Start" />
    </>
  );
}

export default memo(CellBar);
