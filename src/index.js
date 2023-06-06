import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./modules/errorPage/ErrorPage";
import Root from "./Root";
import HomePage from "./modules/homePage/HomePage";
import Allstudent from "./modules/students/screen/allstudent/Allstudent";
import Addstudent from "./modules/students/screen/addstudent/Addstudent";
import Editstudent from "./modules/students/screen/editstudent/Editstudent";
import Profilestudent from "./modules/students/screen/profilestudent/Profilestudent";


import Allgrade from "./modules/grade/Allgrade/Allgrade";
import Listclassofgrade10 from "./modules/grade/listclassofgrade/Listclassofgrade10";
import Listclassofgrade11 from "./modules/grade/listclassofgrade/Listclassofgrade11";
import Listclassofgrade12 from "./modules/grade/listclassofgrade/Listclassofgrade12";


import ClassesPage from "./modules/classes/classesPage";
import ClassesInformation from "./modules/classes/classesInformation";
import ClassesAdd from "./modules/classes/classesAdd";
import ClassesEdit from "./modules/classes/classesEdit";
import AddStudentToClass from "./modules/classes/addstudenttoclass";
import PrintStudentListPage from "./modules/classes/PrintStudentListPage";
import SubjectTable from "./modules/subject/SubjectTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/students/",
        element: <Allstudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "add-students/*",
        element: <Addstudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/editstudents",
        element: <Editstudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profilestudents/:id",
        element: <Profilestudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "grades",
        element: <Allgrade />,
        errorElement: <ErrorPage />,
      },
      {
        path:"classes",
        element:<ClassesPage/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"printstudentlist",
        element:<PrintStudentListPage/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"classesinformation",
        element:<ClassesInformation/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"classesadd",
        element:<ClassesAdd/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"classesedit",
        element:<ClassesEdit/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"addstudenttoclass",
        element:<AddStudentToClass/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"listclassofgrade10",
        element:<Listclassofgrade10/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"listclassofgrade11",
        element:<Listclassofgrade11/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"listclassofgrade12",
        element:<Listclassofgrade12/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"subjects",
        element:<SubjectTable/>,
        errorElement:<ErrorPage/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);