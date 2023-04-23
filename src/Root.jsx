import React from "react";
import { Outlet } from "react-router";
import AppHeader from "./globalComponents/AppHeader/AppHeader";
import "./App.css";
import SideMenu from "./globalComponents/SideBar/SideBar";
import Breadcrumbs from "./globalComponents/BreadCrumb/BreadCrumb";


const Root = ()=>{
    return (
      <div className="App">
        <AppHeader />

        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <div className="PageContent">
            <Breadcrumbs />
            <Outlet />
          </div>
        </div>
      </div>
    );
}

export default Root;
