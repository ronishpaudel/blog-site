import React, { ComponentType } from "react";

const PublicRoute = (PublicComponent: ComponentType) => {
  function RestrictedComponent({ children }: any) {
    // const { loggedIn, dbUser } = useSnapshot(authStore);

    // useEffect(() => {
    //   if (loggedIn) {
    //     Router.push("/");
    //   } else {
    //     authStore.setLogOut();
    //   }
    // }, [loggedIn, dbUser]);

    return <>{children}</>;
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
