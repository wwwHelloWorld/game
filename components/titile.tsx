"use client";
import { useSelector } from "react-redux";
import styles from "../app/styles.module.css";
import { Loader } from "semantic-ui-react";

export default function Title() {
  const isActive = useSelector((store: any) => store.gameData.isActiveGame);
  const activeSing = useSelector((store: any) => store.gameData.activeSing);
  const sing = useSelector((store: any) => store.gameData.sing);
  const isGameOver = useSelector((store: any) => store.gameData.isGameOver);

  console.log(isGameOver)
  return (
    <>
      {!isActive && !isGameOver ? (
        <h1 className={styles["h1-title"]}>HELLO FRIEND!</h1>
      ) : activeSing === sing && activeSing !== null && !isGameOver ? (
        <h1 className={styles["h1-title"]}>MAKE YOUR MOVE!</h1>
      ) : activeSing !== sing && activeSing !== null && !isGameOver ? (
        <h1 style={{ textAlign: "center" }} className={styles["h1-title"]}>
          Waiting <Loader active inline size="large" />
        </h1>
      ) : (
        isGameOver ? (
          <h1 style={{ textAlign: "center" }} className={styles["h1-title"]}>
            GAME OVER
          </h1>
        ) : "HELLO WORLD"
      )}
    </>
  );
}
