import React, { ComponentType, useEffect } from "react";
import Router from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";

const PrivateRoute = (AuthComponent: ComponentType) => {
  function PrivateComponent({ children }: any) {
    const { loggedIn, tokenFetching } = useSnapshot(authStore);

    useEffect(() => {
      if (!loggedIn && !tokenFetching) {
        Router.push("/auth/login");
      }
    }, [loggedIn, tokenFetching]);

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
