import React from "react";
import { Outlet } from "react-router";
import AppHeader from "./globalComponents/AppHeader/AppHeader";
import "./App.css";
import SideMenu from "./globalComponents/SideBar/SideBar";
import Breadcrumbs from "./globalComponents/BreadCrumb/BreadCrumb";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./modules/login/LoginPage";


const Root = ()=>{
  const user = useSelector((state) => {
    return state.login.value;
  });
 console.log("user", user);
    return (
      user ? <div className="App">
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <div className="PageContent">
            <Breadcrumbs />
            <Outlet />
          </div>
        </div>
      </div> : <LoginPage/>
      
    );
}

export default Root;
