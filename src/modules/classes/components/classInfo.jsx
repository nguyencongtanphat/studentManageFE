import React from 'react'
import { Card, Row, Col, Typography, Button, Select, Table, Input, DatePicker } from "antd";
import moment from "moment";
import { useState } from 'react';
const { Text, Link } = Typography;

function ClassInfo(props) {
  const [classes, setClasses] = useState(["10A1", "10A2"])
  const [teachers, setTeachers] = useState(["Nguyễn Văn AdADA", "Nguyễn Văn B"]);
  return (
    <Row
      style={{
        marginTop: 9,
        marginBottom: 9,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Col flex={10}>
        <Row
          style={{
            display: "flex",
            alignItems: "start",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Text>Classes: </Text>
          <Select placeholder="select class">
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
          <Select placeholder="select class's teacher">
            {teachers.map((teacher) => {
              return (
                <Select.Option value={teacher} key={"className"}>
                  {teacher}
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
          <Select placeholder="select semester">
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
            margin:"8px 0 0 0"
          }}
        >
          <Text>Year:</Text>
          <DatePicker mode="year" defaultValue={moment()} />
        </Row>
      </Col>
    </Row>
  );
}

export default ClassInfo