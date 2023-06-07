import React, { useEffect } from 'react'
import { Card, Row, Col, Typography, Button, Select, Table, Input, DatePicker } from "antd";
import moment from "moment";
import { useState } from 'react';
import ApiService from '../../../ApiService';
const { Text, Link } = Typography;

function ClassInfo(props) {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const teachers =await ApiService.get("teachers")
      const classes =await ApiService.get("classes");
      const semesters = await ApiService.get("semesters");
      setTeachers(teachers);
      setClasses(classes);
      setSemesters(semesters);
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
                <Select.Option value={classItem.idClass} key={"className"}>
                  {classItem.name}
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
            {semesters.map((semester) => {
              return (
                <Select.Option value={semester.idSemester} key={"className"}>
                  {semester.order}-{semester.year}
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
        </Row>
      </Col>
    </Row>
  );
}

export default ClassInfo