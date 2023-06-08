
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

import AddNewClassSemesterPage from "./modules/classes-semesters/screens/AddNewClassSemesterPage";
import ClassesPage from "./modules/classes-semesters/screens/ClassesSemesterPage";
import ClassSemesterDetail from "./modules/classes-semesters/screens/ClassSemesterDetailPage";


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
        path: "/edit-students",
        element: <Editstudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile-students/:id",
        element: <Profilestudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "grades",
        element: <Allgrade />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classes-semesters",
        element: <ClassesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/add-new-class-semester",
        element: <AddNewClassSemesterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/class-semester/:id",
        element: <ClassSemesterDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classes-grade/:id",
        element: <Listclassofgrade />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);