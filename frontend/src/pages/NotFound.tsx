import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/NavigationBar.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Variant_0 } from "./404/Variant_0.tsx";
import { Variant_1 } from "./404/Variant_1.tsx";
import { Variant_2 } from "./404/Variant_2.tsx";
import { Variant_3 } from "./404/Variant_3.tsx";
import { Variant_4 } from "./404/Variant_4.tsx";
import { Variant_5 } from "./404/Variant_5.tsx";
import { Variant_6 } from "./404/Variant_6.tsx";
export const NotFound = () => {
  const [randomPage, setRandomPage] = useState(0);
  const MaxPage = 6;

  const randomPageSelector = () => {
    const selectRandomPage = Math.floor(Math.random() * MaxPage); //starts from 0
    setRandomPage(selectRandomPage);
  };

  // useEffect(() => {
  //   randomPageSelector();
  // }, []);

  return (
    <div>
      <NavigationBar />
      {randomPage == 0 ? (
        <Variant_0 />
      ) : randomPage == 1 ? (
        <Variant_1 />
      ) : randomPage == 2 ? (
        <Variant_2 />
      ) : randomPage == 3 ? (
        <Variant_3 />
      ) : randomPage == 4 ? (
        <Variant_4 />
      ) : randomPage == 5 ? (
        <Variant_5 />
      ) : randomPage == 6 ? (
        <Variant_6 />
      ) : (
        <Variant_0 />
      )}
      <Footer />
    </div>
  );
};
