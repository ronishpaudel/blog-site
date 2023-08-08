import React, { ComponentType, useEffect } from "react";
import Router from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";

const PrivateRoute = (AuthComponent: ComponentType) => {
  function PrivateComponent({ children }: any) {
    const { loggedIn, tokenFetching } = useSnapshot(authStore);

    useEffect(() => {
      console.log("hello", loggedIn, tokenFetching);
      if (!loggedIn) {
        Router.push("/auth");
      }
    }, [loggedIn]);

    return <>{loggedIn && <> {children} </>} </>;
  }

  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      );
    }
  };
};

export { PrivateRoute };
