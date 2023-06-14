import React, { useState } from "react";
import { Tag, Table, Select, Card, Space, Button, AutoComplete } from "antd";
import { useEffect } from "react";
import ApiService from "../../ApiService";

function AllTeacherPage() {
  const [teacherListView, setTeacherListView] = useState([]);
  const [classList, setClassList] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [teacherList, setTeacherList] = useState([]);

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
        <div >
          <Space>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(value) => {
                setNameQuery(value);
              }}
              placeholder="Search by name"
            />
           
            <Button onClick={searchHandler} htmlType="search" type="primary">
              Search
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={teacherListView}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
        />
        <Button type="primary">
          Add new teacher
        </Button>
      </Card>
    </div>
  );
}

export default AllTeacherPage;
