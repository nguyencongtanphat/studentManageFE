import React, { useState } from "react";
import {Tag, Table, Select, Card, Space, Button, AutoComplete } from "antd";
import style from "./Allstudent.module.css";
import { useEffect } from "react";
import ApiService from "../../../../ApiService";
import { useNavigate } from "react-router-dom";

function Allstudent() {
  const [studentListView, setStudentListView] = useState([]);
  const [classList, setClassList] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [studentList, setStudentList] = useState([]);
    const navigate = useNavigate();

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
              options={classList.map((classItem) => {
                return {
                  label: classItem.name,
                  value: classItem.name,
                };
              })}
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
              navigate("/app/students/" + record.id);
            },
          })}
        />
        <Button type="primary" onClick={()=>{
          navigate("/app/add-new-student");
        }}>
          Add new student
        </Button>
      </Card>
    </div>
  );
}

export default Allstudent;
