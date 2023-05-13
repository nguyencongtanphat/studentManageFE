import React, { useState } from "react";
import {Tag, Table, Select, Card, Space, Button, AutoComplete } from "antd";
import style from "./Allstudent.module.css";
import { useEffect } from "react";
import ApiService from "../../../../ApiService";

function Allstudent() {
  const [studentListView, setStudentListView] = useState([]);
  const [classList, setClassList] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [studentList, setStudentList] = useState([]);

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultStudent = await ApiService.get("students?isGetClass=true");
        console.log("resultStudentsList:",resultStudent);
        const tempStudentList = resultStudent.map((student) => {
          return {
            key: student.idStudent,
            id: student.idStudent,
            name: student.fullName,
            classes: student.classNames,
          };
        });
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
            return <Tag key={className}>{className.toUpperCase()}</Tag>;
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
        <div className={style.selectClass}>
          <Space>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(value) => {
                setNameQuery(value);
              }}
              placeholder="Search by name"
            />
            <Select
              onChange={(value) => {
                setClassQuery(value);
              }}
              defaultValue={"Select class"}
              options={[
                {
                  label: "10A1",
                  value: "10A1",
                },
                {
                  label: "10A2",
                  value: "10A2",
                },
                {
                  label: "10A3",
                  value: "10A3",
                },
                {
                  label: "11A1",
                  value: "11A1",
                },
                {
                  label: "11A2",
                  value: "11A2",
                },
                {
                  label: "11A3",
                  value: "11A3",
                },
                {
                  label: "12A1",
                  value: "12A1",
                },
                {
                  label: "12A2",
                  value: "12A2",
                },
                {
                  label: "12A3",
                  value: "12A3",
                },
              ]}
            ></Select>
            <Button onClick={searchHandler} htmlType="search" type="primary">
              Search
            </Button>
          </Space>
        </div>
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
