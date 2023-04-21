import React from 'react'
import { BellFilled, MailOutlined, CaretDownOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Image,
  List,
  Typography,
  Avatar,
  Space,
  Divider
} from "antd";
import style from './AppHeader.module.css';
import Search from 'antd/es/input/Search';

function AppHeader() {
  return (
    <div className={style.AppHeader}>
      <div className={style.logo}>Student management</div>
      <div className={style.searchContainer}>
        <Search
          placeholder="input search text"
          style={{
            width: 500,
          }}
          onSearch={() => {}}
          enterButton
        />
      </div>

      <Space>
        <Badge count={3} dot>
          <BellFilled
            style={{ fontSize: 24 }}
            //   onClick={() => {
            //     setNotificationsOpen(true);
            //   }
            // }
          />
        </Badge>
        <Divider type="vertical" style={{ width: 3, height: 30 }} />
        <Avatar size={36} icon={<UserOutlined />} />
        <CaretDownOutlined />
      </Space>
    </div>
  );
}

export default AppHeader