import React, { useState } from "react";
import { Select, Modal, Card, Row, Col, Typography, Button, Form } from "antd";
import { useEffect } from "react";
import ApiService from "../../../ApiService";

function AddSubjectTeacher(props) {
  const [form] = Form.useForm();
  const [subjects, setSubjects] = useState([]);
  const [isSave, setIsSave] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await ApiService.get("subjects?isIdTeacher=true");
      setSubjects(res);
    };
    fetchData();
  }, []);

  const onSubmitHandler = () => {
    console.log(form.getFieldsValue())
    let formValues = form.getFieldsValue();
    let tempList = []
    for (let key in formValues) {
        tempList.push(formValues[key]);
    }
    props.setSubjectTeacherList(tempList);
    setIsSave(true)
    
  };
  return (
    <Card title="Add Subject Teacher">
      <Form form={form} onFinish={onSubmitHandler}>
        {subjects.map((subject) => (
          <Form.Item
            name={subject.name}
            label={subject.name}
            rules={[{ required: true, message: "Please choose teacher" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select options"
              //onChange={handleChange}
            >
              {subject.teachers.map((teacher) => {
                return (
                  <Select.Option
                    value={teacher.idSubjectTeacher}
                    key={teacher.idSubjectTeacher}
                  >
                    {teacher.fullName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        ))}
       {!isSave && <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>}
      </Form>
    </Card>
  );
}

export default AddSubjectTeacher;
