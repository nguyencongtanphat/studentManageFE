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

import ApiService from "../../ApiService";
import { useNavigate } from "react-router-dom";

function AddTeacher() {
  const [subjects, setSubjects] = useState([])
  const [form] = Form.useForm();
    const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
        const subjects = await ApiService.get("subjects");
        console.log("Subjects", subjects)
        setSubjects(subjects)
    };
    getData();
  }, []);

  const submitHandler = async () => {
    try {
      const formValues = form.getFieldsValue();
      console.log("form values: ", formValues)
      const dayOfBirth = formValues.dayOfBirth["$d"];
      formValues.dayOfBirth = dayOfBirth;
      const startedDay = formValues.startedDay["$d"];
      formValues.startedDay = startedDay;

      console.log("Form values:", formValues);
      const res = await ApiService.post("teachers", formValues);
      message.success("Successfully created");
      form.resetFields();
      navigate("/app/teachers");

    } catch (e) {
      message.error(`${e.message}   email is used or incorrect format`);
    }
  };



  return (
    <div>
      <Card title="Add Teacher">
        <Form form={form} onFinish={submitHandler}>
          {/* fulname */}
          <Form.Item
            name={"fullName"}
            label="NAME"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input size="medium" placeholder=""></Input>
          </Form.Item>

          <Form.Item
            name={"dayOfBirth"}
            label="DATE OF BIRTH"
            rules={[
              { required: true, message: "Please choose your birth date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={"startedDay"}
            label="STARTED DATE"
            rules={[{ required: true, message: "Please choose started date!" }]}
          >
            <DatePicker />
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
          <Form.Item
            name={"userName"}
            label="USERNAME"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input size="medium" placeholder=""></Input>
          </Form.Item>
          <Form.Item
            name={"password"}
            label="PASSWORD"
            rules={[
              { required: true, message: "Please input your Password!" },
              { type: "password"},
            ]}
          >
            <Input size="medium" placeholder=""></Input>
          </Form.Item>
          <Form.Item
            name={"Subjects"}
            label="SUBJECTS"
            rules={[{ required: true, message: "Please choose subjects" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select options"
              //onChange={handleChange}
            >
              {subjects.map((subject) => {
                return (
                  <Select.Option
                    value={subject.idSubject}
                    key={subject.idSubject}
                  >
                    {subject.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
            <Row>
              <Col flex={4}>
              </Col>
              <Col flex={0}>
                <Button 
                  // onClick={()=>{
                  //   navigate("/app/teachers");
                  // }}
                  type="primary" htmlType="submit" danger>
                  Save
                </Button>
              </Col>
            </Row>
        </Form>
      </Card>
    </div>
  );
}

export default AddTeacher;
