import React, { ComponentType, useEffect } from "react";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { modalStore } from "@/store/modalStore";

const PrivateRoute = (AuthComponent: ComponentType) => {
  function PrivateComponent({ children }: any) {
    const { loggedIn, tokenFetching } = useSnapshot(authStore);

    useEffect(() => {
      if (!loggedIn && !tokenFetching) {
        modalStore.signInModal.setOpen(true);
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
