import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./modules/errorPage/ErrorPage";
import Root from "./Root";
import HomePage from "./modules/homePage/HomePage";
<<<<<<< Updated upstream
import Allstudent from "./modules/students/screen/allstudent/Allstudent";
import Addstudent from "./modules/students/screen/addstudent/Addstudent";
import Editstudent from "./modules/students/screen/editstudent/Editstudent";
import Profilestudent from "./modules/students/screen/profilestudent/Profilestudent";
import Allgrade from "./modules/grade/Allgrade/Allgrade";
import Gradesinformation from "./modules/grade/Gradesinformation/Gradesinformation";

=======
import AllStudent from "./modules/students/screens/AllStudent";
import ClassInformation from "./modules/classes/classInfoPage";
import ClassesPage from "./modules/classes/classesPage";
import classesAdd from "./modules/classes/classesAdd";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        path:"/addstudents",
        element:<Addstudent/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/editstudents",
        element:<Editstudent/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/profilestudents",
        element:<Profilestudent/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"grades",
        element:<Allgrade/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"gradesinformation",
        element:<Gradesinformation/>,
        errorElement:<ErrorPage/>
      },
=======
        path:"classes",
        element: <ClassesPage/>,
        errorElement: <errorpage/>,
        children: [
          {
            path:"id",
            element: <ClassInformation/>,
            errorElement: <errorpage/>,
            Children: [
              {
                path:"addclass",
                element: <classesAdd/>,
                errorElement: <errorpage/>
              },
            ]
          },
        ]
      }
>>>>>>> Stashed changes
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);