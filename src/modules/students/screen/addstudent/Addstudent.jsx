import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  Typography,
  Space,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
} from "antd";
import style from "./Addstudent.module.css";
import ApiService from "../../../../ApiService";

function Addstudent() {
  const [form] = Form.useForm();
  const [classCurrentSemester, setClassCurrentSemester] = useState([]);
  const [currentSemesterId, setCurrentSemester] = useState();
  useEffect(() => {
    const getData = async () => {
      const currentSemesterId = await ApiService.get(
        "parameters?name=CurrentSemesterId"
      );
      setCurrentSemester(currentSemesterId.value);
      const classes = await ApiService.get(
        `classes?semesterId=${currentSemesterId.value}`
      );
      console.log("currentClass: ", classes);
      setClassCurrentSemester(classes);
    };
    getData();
  }, []);
  const submitHandler = async () => {
    const formValues = form.getFieldsValue();
    const dateOfBirth = formValues.dateOfBirth["$d"];
    formValues.dateOfBirth = dateOfBirth
    formValues.currentSemesterId = currentSemesterId;
    console.log("Form values:", formValues);
    await ApiService.post("students", formValues)
  };
  
  function disabledDate(current) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
   const startYear = moment(`${currentYear-18}-01-01`, 'YYYY-MM-DD').startOf('year');
  // Lấy năm cuối cùng trong khoảng giới hạn
  const endYear = moment(`${currentYear - 16}-12-31`, "YYYY-MM-DD").endOf(
    "year"
  );
  // Nếu năm được chọn nằm trong khoảng giới hạn thì cho phép chọn năm đó, ngược lại không cho phép
  return !(current >= startYear && current <= endYear);
  }
  
  return (
    <div className={style.Addstudent}>
      <Card title="Add Students">
        <Form form={form} onFinish={submitHandler}>
          <Form.Item
            name={"fullName"}
            label="NAME"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input size="medium" placeholder=""></Input>
          </Form.Item>
          <Form.Item
            name={"classId"}
            label="CLASS"
            rules={[{ required: true, message: "Please choose your class!" }]}
          >
            <Select placeholder="Please select class">
              {classCurrentSemester.map((item) => {
                return (
                  <Select.Option value={item.idClass} key={item.idClass}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={"dateOfBirth"}
            label="DATE OF BIRTH"
            rules={[
              { required: true, message: "Please choose your birth date!" },
            ]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            name={"gender"}
            label="GENDER"
            rules={[{ required: true, message: "Please input your gender!" }]}
          >
            <Select placeholder="Please select gender">
              {["Nam", "Nữ"].map((gender) => {
                return (
                  <Select.Option value={gender} key={gender}>
                    {gender}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={"address"}
            label="ADDRESS"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input size="medium" placeholder=""></Input>
          </Form.Item>
          <Form.Item
            name={"Email"}
            label="EMAIL"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input size="medium" placeholder=""></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Addstudent;
