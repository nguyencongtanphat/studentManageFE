import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./modules/errorPage/ErrorPage";
import Root from "./Root";
import HomePage from "./modules/homePage/HomePage";
import Allstudent from "./modules/students/screen/allstudent/Allstudent";
import Addstudent from "./modules/students/screen/addstudent/Addstudent";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:<HomePage/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/students",
        element:<Allstudent/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/addstudents",
        element:<Addstudent/>,
        errorElement:<ErrorPage/>
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);