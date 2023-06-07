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
import Listclassofgrade from "./modules/grade/listclassofgrade/Listclassofgrade";


import ClassesPage from "./modules/classes-semesters/classesPage";
import ClassesInformation from "./modules/classes-semesters/classesInformation";
import ClassesAdd from "./modules/classes-semesters/classesAdd";
import ClassesEdit from "./modules/classes-semesters/classesEdit";
import AddStudentToClass from "./modules/classes-semesters/addstudenttoclass";
import PrintStudentListPage from "./modules/classes-semesters/PrintStudentListPage";

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
      // {
      //   path: "gradesinformation",
      //   element: <Gradesinformation/>,
      //   errorElement: <ErrorPage />,
      // },
      {
        path: "classes-semesters",
        element: <ClassesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "printstudentlist",
        element: <PrintStudentListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classesinformation",
        element: <ClassesInformation />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classesadd",
        element: <ClassesAdd />,
        errorElement: <ErrorPage />,
      },
      {
        path:"add-class-semester",
        element:<ClassesAdd/>,
        errorElement:<ErrorPage/>
      },
      {
        path: "classesedit",
        element: <ClassesEdit />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classesedit",
        element: <ClassesEdit />,
        errorElement: <ErrorPage />,
      },
      {
        path: "addstudenttoclass",
        element: <AddStudentToClass />,
        errorElement: <ErrorPage />,
      },
      {
        path:"classes-grade/:id",
        element:<Listclassofgrade/>,
        errorElement:<ErrorPage/>
      },
     
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);