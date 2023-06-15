import React, { useState } from "react";
import { Tag, Table, Select, Card, Space, Button, AutoComplete, Row, Col } from "antd";
import { useEffect } from "react";
import ApiService from "../../ApiService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function AllTeacherPage() {
  const [teacherListView, setTeacherListView] = useState([]);
  const [classList, setClassList] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const user = useSelector((state) => {
    return state.login.value;
  });
  const navigate = useNavigate();

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const resultStudent = await ApiService.get("students/?isGetClass=true");
        const [resultStudent, classes] = await Promise.all([
          ApiService.get("teachers"),
          ApiService.get("classes"),
        ]);

        const tempStudentList = resultStudent.map((teacher) => {
          return {
            key: teacher.idTeacher,
            id: teacher.idTeacher,
            name: teacher.fullName,
            subjects: teacher.subjectName,
          };
        });
        setClassList(classes);
        setTeacherListView(tempStudentList);
        setTeacherList(tempStudentList);
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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (_, { subjects }) => (
        <>
          {subjects.map((subject) => {
            console.log("subject: ", subject);
            return <Tag key={subject}>{subject}</Tag>;
          })}
        </>
      ),
    },
  ];

  const searchHandler = () => {
    let newStudentList = teacherList;
    if (nameQuery && classQuery) {
      newStudentList = teacherList.filter((student) => {
        return (
          student.name.includes(nameQuery) &&
          student.classes.includes(classQuery)
        );
      });
    } else if (nameQuery) {
      newStudentList = teacherList.filter((student) => {
        return student.name.includes(nameQuery);
      });
    } else if (classQuery) {
      console.log("classQuery");
      newStudentList = teacherList.filter((student) => {
        return student.classes.includes(classQuery);
      });
    }

    console.log("new students: ", newStudentList);
    setTeacherListView(newStudentList);
  };

  return (
    <div>
      <Card title="All Teachers Data">
        <div>
          <Row style={{ marginTop: 9, marginBottom: 9 }}>
            <Col flex={4}></Col>
            <Col flex={1}>
            <AutoComplete
              style={{ width: '90%' }}
              onSearch={(value) => {
                setNameQuery(value);
              }}
              placeholder="Search by name"
            />
            </Col>
            <Col flex={0}>
              <Button onClick={searchHandler} htmlType="search" type="primary">
                Search
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={teacherListView}
          onRow={(record) => ({
            onClick: () => {
              if (user.role === "Admin") navigate("/app/teachers/" + record.id);
            },
          })}
        />
        <Row style={{ marginTop: 9, marginBottom: 9 }}>
          <Col flex={4}></Col>
          <Col flex={0.3}>
            <Button type="primary">
              Add new teacher
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default AllTeacherPage;
