import Image from "next/image";
import RootLayout from "./layout";
import Title from "@/components/titile";
import CellBar from "@/components/cellBar";
import styles from "../app/styles.module.css";

export default function Home() {
  return (

      <RootLayout>
        <main className="main flex min-h-screen flex-col items-center p-24">
          <Title />
          <CellBar />
        </main>
      </RootLayout>

  );
}
