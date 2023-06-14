
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

import SemesterReport from "./modules/semesterReport/SemesterReport";
import ScoreAverage from "./modules/score/scoreaverage";
import ScoreDetails from "./modules/score/scoredetails";
import AddingScore from "./modules/score/addScorePage";
import ChangeRules from "./modules/rule/ruleChange";
import SubjectTable from "./modules/subject/SubjectTable";
import Semester from "./modules/semester/semester";
import Error from "./modules/Error/error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/app",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "students",
        element: <Allstudent />,
        errorElement: <Error />,
      },
      {
        path: "add-students/*",
        element: <Addstudent />,
        errorElement: <Error />,
      },
      {
        path: "teachers",
        element: <AllTeacherPage />,
        errorElement: <Error />,
      },
      {
        path: "teachers/:id",
        element: <TeacherDetailPage />,
        errorElement: <Error />,
      },
      {
        path: "add-new-teacher",
        element: <AddNewTeacherPage />,
        errorElement: <Error />,
      },
      {
        path: "grades",
        element: <Allgrade />,
        errorElement: <Error />,
      },
      {
        path: "classes-grade/:id",
        element: <Listclassofgrade />,
        errorElement: <Error />,
      },
      {
        path: "classes-semesters",
        element: <ClassesPage />,
        errorElement: <Error />,
      },
      {
        path: "add-new-class-semester",
        element: <AddNewClassSemesterPage />,
        errorElement: <Error />,
      },
      {
        path: "classes-semesters/:id",
        element: <ClassSemesterDetail />,
        errorElement: <Error />,
      },
      {
        path: "scores",
        element: <ScoreAverage />,
        errorElement: <Error />,
      },
      {
        path: "scores/details",
        element: <ScoreDetails />,
        errorElement: <Error />,
      },
      {
        path: "add-score",
        element: <AddingScore />,
        errorElement: <Error />,
      },
      {
        path: "subjects",
        element: <SubjectTable />,
        errorElement: <Error />,
      },
      {
        path: "students/:id",
        element: <Profilestudent />,
        errorElement: <Error />,
      },
      {
        path: "semester",
        element: <Semester />,
        errorElement: <Error />,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path:"change-rules",
        element: <ChangeRules/>,
        errorElement: <ErrorPage/>
      },
      {
        path:"semesterReport",
        element:<SemesterReport/>,
        errorElement:<ErrorPage/>
      },
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