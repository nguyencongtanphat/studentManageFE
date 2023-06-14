import React, { useState } from "react";
import {Tag, Table, Select, Card, Space, Button, AutoComplete, Row, Col, Typography } from "antd";
import style from "./Allstudent.module.css";
import { useEffect } from "react";
import ApiService from "../../../../ApiService";

function Allstudent() {
  const { Title } = Typography;
  const [studentListView, setStudentListView] = useState([]);
  const [classList, setClassList] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [studentList, setStudentList] = useState([]);

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const resultStudent = await ApiService.get("students/?isGetClass=true");
        const [resultStudent, classes] = await Promise.all([
          ApiService.get("students/?isGetClass=true"),
          ApiService.get("classes"),
        ]);
        
        const tempStudentList = resultStudent.map((student) => {
          return {
            key: student.idStudent,
            id: student.idStudent,
            name: student.fullName,
            classes: student.classNames,
          };
        });
        setClassList(classes)
        setStudentListView(tempStudentList);
        setStudentList(tempStudentList);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (_, { classes }) => (
        <>
          {classes.map((className) => {
            console.log("classname: ",className)
            return <Tag key={className}>{className}</Tag>;
          })}
        </>
      ),
    },
  ];

  const searchHandler = () => {
    let newStudentList = studentList;
    if (nameQuery && classQuery) {
      newStudentList = studentList.filter((student) => {
        return (
          student.name.includes(nameQuery) &&
          student.classes.includes(classQuery)
        );
      });
    } else if (nameQuery) {
      newStudentList = studentList.filter((student) => {
        return student.name.includes(nameQuery);
      });
    } else if (classQuery) {
      console.log("classQuery")
      newStudentList = studentList.filter((student) => {
        return student.classes.includes(classQuery);
      });
    }

    console.log("new students: ", newStudentList);
    setStudentListView(newStudentList);
  };

  

  return (
    <div className={style.Allstudent}>
      <Card title="All Student Data">
        <Row style={{ marginTop: 9, marginBottom: 9 }}>
          <Col flex={4}>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(value) => {
                setNameQuery(value);
              }}
              placeholder="Search by name"
            />
          </Col>
          <Col flex={0.5}>
            <Button onClick={searchHandler} htmlType="search" type="primary">
              Search
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={studentListView}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
        />
      </Card>
    </div>
  );
}

export default Allstudent;
