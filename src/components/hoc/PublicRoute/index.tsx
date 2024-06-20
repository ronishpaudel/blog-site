import React, { ComponentType } from "react";

const PublicRoute = (PublicComponent: ComponentType) => {
  function RestrictedComponent({ children }: any) {
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
