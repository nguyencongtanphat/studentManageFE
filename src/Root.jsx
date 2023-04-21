import React from "react";
import { Outlet } from "react-router";
import AppHeader from "./globalComponents/AppHeader/AppHeader";
import "./App.css";


const Root = ()=>{
    return (
      <div className="App">
        <AppHeader />
        <Outlet />
      </div>
    );
}

export default Root;
