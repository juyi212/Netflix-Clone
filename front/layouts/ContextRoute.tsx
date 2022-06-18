import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

type ContextRouterProps = {
    path: string;
    exact: boolean;
    Provider: any;
    Component: any;
  }
  
  const ContextRoute = (props: ContextRouterProps) => {
    const { Provider, Component } = props;
  
    return (
      <Route path={props.path}>
        <Provider>
          <Component />
        </Provider>
      </Route>
    );
  }
  
  export default ContextRoute;