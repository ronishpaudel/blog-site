import React, { useEffect, ComponentType } from "react";
import Router from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";

const PublicRoute = (PublicComponent: ComponentType) => {
  function RestrictedComponent({ children }: any) {
    const { loggedIn, dbUser } = useSnapshot(authStore);

    useEffect(() => {
      if (loggedIn) {
        Router.push("/");
      } else {
        authStore.setLogOut();
      }
    }, [loggedIn, dbUser]);

    return <>{!loggedIn && children}</>;
  }

  return class Higher extends React.Component {
    render() {
      return (
        <RestrictedComponent>
          <PublicComponent {...this.props} />
        </RestrictedComponent>
      );
    }
  };
};

export { PublicRoute };
