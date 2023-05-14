import React, { useEffect } from 'react'
import { Card, Row, Col, Typography, Button, Select, Table, Input, DatePicker } from "antd";
import moment from "moment";
import { useState } from 'react';
import ApiService from '../../../ApiService';
const { Text, Link } = Typography;

function ClassInfo(props) {
  const [classes, setClasses] = useState([
    "10A1",
    "10A2",
    "10A3",
    "10A4",
    "11A1",
    "11A2",
    "11A3",
    "12A1",
    "12A2",
  ]);
  const [teachers, setTeachers] = useState(["Nguyễn Văn AdADA", "Nguyễn Văn B"]);
  useEffect(()=>{
    const fetchData = async ()=>{
      const teachers =await ApiService.get("teachers")
      setTeachers(teachers);
      console.log("teachers:",teachers)
    }
    fetchData()
  },[])
   
  return (
    <Row
      style={{
        marginTop: 9,
        marginBottom: 9,
        display: "flex",
        alignItems: "start",
      }}
    >
      <Col flex={10}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Text>Classes: </Text>
          <Select placeholder="select class"
            onChange={props.onClassChange}
          >
            {classes.map((classItem) => {
              return (
                <Select.Option value={classItem} key={"className"}>
                  {classItem}
                </Select.Option>
              );
            })}
          </Select>
        </Row>
      </Col>
      <Col flex={10}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Text>NoP: </Text>
          <Input
            mode="tags"
            style={{ width: "20%", marginLeft: 10, height: "100%" }}
            value={props.numPupils}
            onChange={props.onNumsPupilsChange}
            disabled={true}
          />
        </Row>
      </Col>
      <Col flex={10}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Text>Teacher:</Text>
          <Select onChange={props.onTeacherChange} placeholder="select class's teacher">
            {teachers.map((teacher) => {
              return (
                <Select.Option value={teacher.idTeacher} key={"className"}>
                  {teacher.fullName}
                </Select.Option>
              );
            })}
          </Select>
        </Row>
      </Col>
      <Col flex={10}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Text>Semester:</Text>
          <Select placeholder="select semester" 
            onChange={props.onSemesterChange}>
            {["First", "Second"].map((classItem) => {
              return (
                <Select.Option value={classItem} key={"className"}>
                  {classItem}
                </Select.Option>
              );
            })}
          </Select>
        </Row>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
            margin: "8px 0 0 0",
          }}
        >
          <Text>Year:</Text>
          <DatePicker onChange={props.onYearChange} picker="year" />
        </Row>
      </Col>
    </Row>
  );
}

export default ClassInfo