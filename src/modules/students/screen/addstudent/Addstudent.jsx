import React from "react";
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
  const submitHandler = async () => {
    const formValues = form.getFieldsValue();
    const dateOfBirth = formValues.dateOfBirth["$d"];
    formValues.dateOfBirth = dateOfBirth
    console.log("Form values:", formValues);
    await ApiService.post("students", formValues)
  };
  
  function disabledDate(current) {
    // Tính toán ngày giới hạn
    const minDate = moment().subtract(18, "years").startOf("day");
    const maxDate = moment().add(16, "days").startOf("day");
    // Kiểm tra xem ngày hiện tại có nằm trong khoảng giới hạn không
    return !current.isBetween(minDate, maxDate, null, "[]");
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
            name={"class"}
            label="CLASS"
            rules={[{ required: true, message: "Please choose your class!" }]}
          >
            <Select placeholder="Please select class">
              {[
                "10A1",
                "10A2",
                "10A3",
                "11A1",
                "11A2",
                "11A3",
                "12A1",
                "12A2",
                "12A3",
              ].map((className) => {
                return (
                  <Select.Option value={className} key={className}>
                    {className}
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
            <DatePicker  />
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
