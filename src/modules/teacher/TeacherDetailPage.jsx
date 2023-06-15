import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  Tag,
  message,
  Row,
  Col
} from "antd";

import ApiService from "../../ApiService";
import { useParams } from "react-router-dom";


function TeacherDetailPage() {
  const [teacherInfo, setTeacherInfo] = useState();
  const {id} = useParams()
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const teacher = await ApiService.get("teachers/" + id);
      console.log("Teacher", teacher);
      setTeacherInfo(teacher);
    };
    getData();
  }, []);

 

  const editHandler = async ()=>{
    const formValues = form.getFieldsValue();
    let data ={}
    for (const key in formValues) {
      if(formValues[key])
        data[key] = formValues[key];
    }
    if (Object.keys(data).length !== 0) {
      const response = await ApiService.put("teachers/"+id, data)
      message.success("update successfully")
    }
    setIsEdit((prev)=>!prev)
  }

  return (
    <div>
      <Card title="Teacher Information">
        <Form form={form} >
          {/* fulname */}
          <Form.Item name={"fullName"} label="NAME" pl>
            <Input
              disabled={!isEdit}
              size="medium"
              placeholder={teacherInfo?.fullName}
              style={{ fontWeight: "bold" }}
            ></Input>
          </Form.Item>

          <Form.Item name={"dayOfBirth"} label="DATE OF BIRTH">
            <DatePicker
              disabled={!isEdit}
              placeholder={teacherInfo?.dayOfBirth}
            />
          </Form.Item>
          <Form.Item name={"startedDay"} label="STARTED DATE">
            <DatePicker
              disabled={!isEdit}
              placeholder={teacherInfo?.startedDay}
            />
          </Form.Item>
          <Form.Item name={"gender"} label="GENDER">
            <Select
              disabled={!isEdit}
              placeholder={teacherInfo?.gender}
              style={{ fontWeight: "bold" }}
            >
              {["Nam", "Nữ"].map((gender) => {
                return (
                  <Select.Option value={gender} key={gender}>
                    {gender}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name={"address"} label="ADDRESS">
            <Input
              style={{ fontWeight: "bold" }}
              disabled={!isEdit}
              size="medium"
              placeholder={teacherInfo?.address}
            ></Input>
          </Form.Item>
          <Form.Item name={"Email"} label="EMAIL">
            <Input
              style={{ fontWeight: "bold" }}
              disabled={!isEdit}
              size="medium"
              placeholder={teacherInfo?.email}
            ></Input>
          </Form.Item>
          <Form.Item name={"Subjects"} label="SUBJECTS">
            <div>
              {teacherInfo?.subjects.map((subject) => {
                return <Tag key={subject}>{subject}</Tag>;
              })}
            </div>
          </Form.Item>
          <Row>
            <Col flex={4}>
            </Col>
            <Col flex={0}>
              <Button onClick={editHandler} type="primary" danger={isEdit}>
                {isEdit ? "Save" : "Edit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default TeacherDetailPage;
