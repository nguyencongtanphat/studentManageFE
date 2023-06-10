
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
import LoginPage from "./modules/login/LoginPage";
import AllTeacherPage from "./modules/teacher/AllTeacherPage";
import TeacherDetailPage from "./modules/teacher/TeacherDetailPage";
import AddNewTeacherPage from "./modules/teacher/AddNewTeacherPage"
import { Provider } from "react-redux";
import { store } from "./store";

import ScoreAverage from "./modules/score/scoreaverage";
import ScoreDetails from "./modules/score/scoredetails";
import AddingScore from "./modules/score/addScorePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
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
        path: "/students/:id",
        element: <Profilestudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/teachers",
        element: <AllTeacherPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/teachers/:id",
        element: <TeacherDetailPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/add-new-teacher",
        element: <AddNewTeacherPage />,
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
        path:"classes-grade/:id",
        element:<Listclassofgrade/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"scores",
        element:<ScoreAverage/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"scores/details",
        element:<ScoreDetails/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"add-score",
        element:<AddingScore />,
        errorElement: <ErrorPage/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {" "}
    <RouterProvider router={router} />
  </Provider>
);