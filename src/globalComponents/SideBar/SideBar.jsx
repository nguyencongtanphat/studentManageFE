import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  GroupOutlined,
  InsertRowLeftOutlined 
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
            key: "/",
          },
          {
            label: "Students",
            key: "/students",
            icon: <UserOutlined />,
          },
          {
            label: "Teacher",
            key: "/teachers",
            icon: <UserOutlined />,
          },
          {
            label: "Classes-semesters",
            key: "/classes-semesters",
            icon: <GroupOutlined />,
          },
          {
            label: "Grades",
            key: "/grades",
            icon: <InsertRowLeftOutlined />,
          },
          {
            label: "Scores",
            key: "/scores",
            icon: <CheckCircleOutlined />,
          },
          {
            label: "Report",
            key: "/report",
            icon: <BarChartOutlined />,
          },
          {
            label: "Rules",
            key: "/rules",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
