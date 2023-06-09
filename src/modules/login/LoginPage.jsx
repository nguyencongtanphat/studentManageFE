import React, { useState } from "react";
import {Modal, Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./LoginPage.module.css"
import ApiService from "../../ApiService";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setState } from "../../loginSlice";
import { useLocation, useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    console.log("statue here", state);
    return state.login.value;
  });
  const onFinish = async (values) => {
    try{
      console.log("Received values of form: ", values);
      setLoading(true);
      // Thực hiện xử lý đăng nhập tại đây
      const response = await ApiService.post("user/login", values);
      console.log("data", response);
      dispatch(setState(response));
      Modal.success({
        title: "Fail",
        content: "login success",
        okText: "OK",
        onOk() {
          setLoading(false);
          navigate("/");
        },
      });
    }catch(e){
      Modal.error({
        title: "Fail",
        content: e.message,
        okText: "OK",
        onOk() {setLoading(false);},
      });
    }
  };

  return (
    <div className={style.container}>
      <Card>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              style={{ width: "300px" }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "300px" }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={loading}
              className="login-form-button"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
