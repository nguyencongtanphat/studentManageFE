import React from "react";
import {
  Table,
  Select,
  Card,
  Typography,
  Space,
  Button,
  AutoComplete,
} from "antd";
import { useEffect, useLayoutEffect, useState } from 'react';
import style from "./Listclassofgrade10.module.css";
import ApiService from "../../../ApiService";

function Listclassofgrade10() {
  const [classListView, setClassListView] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultClass = await ApiService.get("classes");
        console.log("resultStudentsList:",resultClass);
        const tempClassList = resultClass.filter((Class) => {
              return Class.idGrade == 1;
        });
        console.log(tempClassList)
        setClassListView(tempClassList);
        setClassList(tempClassList);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "idClass",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Grade",
      dataIndex: "gradeName",
      key: "gradename",
    },
  ];

  const searchHandler = () => {
    let newClassList = classList;
    if (nameQuery) {
      newClassList = classList.filter((Class) => {
        return (
          Class.name.includes(nameQuery) 
        );
      });
    } else if (nameQuery) {
      newClassList = classList.filter((Class) => {
        return Class.name.includes(nameQuery);
      });
    }
    console.log("new classes: ", newClassList);
    setClassListView(newClassList);
  }

  return (
    <div className={style.Allstudent}>
      <Card title= "List class of grade 10">
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
              onChange={(value) => {}}
              defaultValue={"Select Semester"}
              options={[
                {
                  label: "I",
                  value: "I",
                },
                {
                  label: "II",
                  value: "II",
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
          dataSource={classListView}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
          pagination={{
            pageSize: 7,
          }}
        ></Table>
        <Button htmlType="search" type="primary">
            Edit
        </Button>
      </Card>
    </div>
  );
}
export default Listclassofgrade10;
