// LoadingBar.tsx
import React, { useEffect, useRef } from "react";
import Router from "next/router";
import TopLoadingBar from "react-top-loading-bar";

const LoadingBar = () => {
  const ref = useRef<any>(null); // Use 'any' type for ref

  useEffect(() => {
    const handleStart = () => {
      ref.current?.continuousStart();
    };

    const handleComplete = () => {
      ref.current?.complete();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return <TopLoadingBar ref={ref} />;
};

export default LoadingBar;
