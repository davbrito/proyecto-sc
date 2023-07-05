import { NextUIProvider } from "@nextui-org/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import ChangeTheme from "~/components/ChangeTheme";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/NavBar";
import { useThemes } from "~/hooks/useThemes";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { theme, toggleTheme } = useThemes();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Sistema de Censo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="shortcut icon" href="/venezuela.ico" />
      </Head>

      <NextUIProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </NextUIProvider>
      <ChangeTheme toggleTheme={toggleTheme} theme={theme.className} />
    </SessionProvider>
  );
};

export default api.withTRPC(App);
