"use client"

import { useEffect, useState } from "react";
import styles from "../app/styles.module.css";
import { Transition } from "semantic-ui-react";


export type CellProps = string;

export default function Cell({ type }: any) {
  const [sing, setSing] = useState<string>("empty");

  useEffect(() => {
  switch (type) {
    case "null":
      setSing("0");
      break;
    case "one":
      setSing("X");
      break;
    default:
      setSing("");
  }
}, [type]);

  return (
    <>
      <div className={styles.cell}>
      <Transition visible={true} animation='fade' duration={1000}>
        <p className={styles[type]}>{sing !== "empty" ? sing : ""}</p>
      </Transition>
      </div>
    </>
  );
}
