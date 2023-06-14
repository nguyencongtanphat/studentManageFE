import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  Row,
  Col,
  message,
} from "antd";
import style from "./Addstudent.module.css";
import ApiService from "../../../../ApiService";
import { useNavigate } from "react-router-dom";

function Addstudent() {
  const [form] = Form.useForm();
  const [classesSemester, setClassesSemester] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const classesSemesterDB = await ApiService.get(`classes-semester`);
      // const semesters = await ApiService.get(`semesters`);

      // console.log("current semesters:", semesters)
      console.log("currentClass: ", classesSemesterDB);
      setClassesSemester(classesSemesterDB);
    };
    getData();
  }, []);

  const submitHandler = async () => {
    try {
      const formValues = form.getFieldsValue();
      const dayOfBirth = formValues.dateOfBirth["$d"];
      formValues.dayOfBirth = dayOfBirth;
      console.log("Form values:", formValues);
      const res = await ApiService.post("students", formValues);
      message.success("Successfully created");
      form.resetFields();
      navigate("/app/students");

    } catch (e) {
     message.error(`${e.message}   email is used or incorrect format`);
      
    }
  };

  function disabledDate(current) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startYear = moment(`${currentYear - 18}-01-01`, "YYYY-MM-DD").startOf(
      "year"
    );
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
            <Row>
              <Col flex={4}>
              </Col>
              <Col flex={0}>
                <Button  type="primary" htmlType="submit" danger>
                  Save
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Addstudent;
