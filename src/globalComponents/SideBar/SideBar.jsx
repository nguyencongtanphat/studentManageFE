import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  GroupOutlined,
  InsertRowLeftOutlined,
  BookOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./SideBar.module.css";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className={style.SideMenu}>
      <Menu
        className={style.SideMenuVertical}
        mode="inline"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/app",
          },
          {
            label: "Students",
            key: "students",
            icon: <UserOutlined />,
          },
          {
            label: "Teacher",
            key: "teachers",
            icon: <UserOutlined />,
          },
          {
            label: "Classes-semesters",
            key: "classes-semesters",
            icon: <GroupOutlined />,
          },
          {
            label: "Grades",
            key: "grades",
            icon: <InsertRowLeftOutlined />,
          },
          {
            label: "Scores",
            key: "scoregroup",
            icon: <CheckCircleOutlined />,
            children: [
              {
                label: "Score Average",
                key: "scores",
              },
              {
                label: "Add Score",
                key: "add-score",
              },
            ],
          },
          {
            label: "Report",
            key: "report",
            icon: <BarChartOutlined />,
          },
          {
            label: "Rules",
            key: "/change-rules",
            icon: <GroupOutlined />,
            children: [
              {
                label: "All Rules",
                key: "rules",
              },
              {
                label: "Edit Rules",
                key: "editrules",
              },
            ],
          },
          {
            label: "Subjects",
            key: "subjects",
            icon: <BookOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
