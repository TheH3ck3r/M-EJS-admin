import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const currentTheme = getCookie("theme");
    const themes = new Map([
      ["system", "theme-system"],
      ["light", "theme-light"],
      ["dark", "theme-dark"],
    ]);

    document.body.classList.add(
      themes.get(currentTheme?.toString() ?? "system") ?? "theme-system"
    );
  }, []);

  useEffect(() => {
    const currentSpectrum = getCookie("spectrum");
    const spectrums = new Map([
      ["default", "spectrum-default"],
      ["yarick", "spectrum-yarick"],
    ]);

    document.body.classList.add(
      spectrums.get(currentSpectrum?.toString() ?? "default") ??
        "spectrum-default"
    );
  }, []);

  useEffect(() => {
    const currentTableView = getCookie("tableView");
    const tableViews = new Map([
      ["full", "table-view-full"],
      ["fixed", "table-view-fixed"],
    ]);

    document.body.classList.add(
      tableViews.get(currentTableView?.toString() ?? "full") ??
        "table-view-full"
    );
  }, []);

  return (
    <>
      <Head>
        <title>Mirea EJS Admin</title>
        <meta name="description" content="M-EJS" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
