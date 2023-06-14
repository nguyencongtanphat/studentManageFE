import React, { useState } from "react";
import { Table, Card, Space, Button, Select, Modal, Input, Form, Row, Col, message } from "antd";
import style from "./semester.module.css";
import { useEffect } from "react";
import ApiService from "../../ApiService";

function Semester() {
  const [semesterListView, setSemesterListView] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [yearQuery, setYearQuery] = useState("");
  const [form] = Form.useForm();

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultSemester , year ] = await Promise.all([
          ApiService.get("semesters"),
        ]);
        console.log(resultSemester);
        const tempSemesterList = resultSemester.map((semester) => {
          return {
            key: semester.idSemester,
            idSemester: semester.idSemester,
            order: semester.order,
            year: semester.year,
          };
        });
        setYearList(year)
        setSemesterListView(tempSemesterList);
        setSemesterList(tempSemesterList);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "idSemester",
      key: "idSemester",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
  ];

  const searchHandler = () => {
    let newYearList = yearList;
    if (yearQuery) {
      newYearList = yearList.filter((semester) => {
        return semester.year.includes(yearQuery);
      });
    }
  };

  const submitHandler = async () => {
    try {
      const formValues = form.getFieldsValue();
      console.log("Form values:", formValues);
      const res = await ApiService.post("semesters", formValues);
      if (res.ErrorCode === 0)  message.success("Successfully created");
      form.resetFields();
    } catch (e) {
     message.error(`${e.message}   email is used or incorrect format`);
    }
  };
  
  const addSemesterHandler = () => {
    let newSemester ='';
    Modal.info({
        title: "Add new Semester",
        content: (
          <div>
            <Card title="Add new Semester">
              <Form form={form} onFinish={submitHandler}>
                <Form.Item  
                  name={"order"}
                  label="Order"
                  rules={[{ required: true, message: "Please input order!" }]}
                >
                  <Input size="medium" placeholder=""></Input>
                </Form.Item>
                <Form.Item
                  name={"year"}
                  label="Year"
                  rules={[{ required: true, message: "Please input year!" }]}
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
        ),
  })
};


  return (
    <div className={style.Semester}>
      <Card title="All Semester Data">
        <div className={style.selectClass}>
          <Row style={{ marginTop: 9, marginBottom: 9 }}>
            <Col flex={4}>
              <Select
                style={{width:'30%'}}
                onChange={(value) => {
                  setYearQuery(value);
                }}
                defaultValue={"Select year"}
                options={semesterList.map(semesterItem=>{
                  return {
                    label: semesterItem.year,
                    value: semesterItem.year,
                  };
                })}
              ></Select>
            </Col>
            <Col flex={0.5}>
              <Button onClick={searchHandler} htmlType="search" type="primary">
                Search
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={semesterListView}
          pagination={{
            pageSize: 7,
          }}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
        />
        <Row style={{ marginTop: 9, marginBottom: 9 }}>
          <Col flex={4}>
          </Col>
          <Col flex={0.3}>
            <Button htmlType="submit" type="primary" onClick={addSemesterHandler}>
              Add New Semester
            </Button>
          </Col>
        </Row>
      </Card>
      
    </div>
  );
}

export default Semester;