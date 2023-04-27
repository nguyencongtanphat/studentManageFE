import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./modules/errorPage/ErrorPage";
import Root from "./Root";
import HomePage from "./modules/homePage/HomePage";
import AllStudent from "./modules/students/screens/AllStudent";
import ClassInformation from "./modules/classes/classInfoPage";
import ClassesPage from "./modules/classes/classesPage";

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
        path:"students",
        element:<AllStudent/>,
        errorElement:<errorpage/>
      },
      {
        path:"classes",
        element: <ClassesPage/>,
        errorElement: <errorpage/>,
        children: [
          {
            path:"id",
            element: <ClassInformation/>,
            errorElement: <errorpage/>
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);