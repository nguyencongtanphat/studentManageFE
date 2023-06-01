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
import style from "./Gradesinformation.module.css";
import ApiService from "../../../ApiService";

function Gradesinformation() {
  const [classListView, setClassListView] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultClass = await ApiService.get("classes");
        console.log("resultStudentsList:",resultClass);
        const tempClassList = resultClass.map((Class) => {
          return {
            key: Class.idClass,
            id: Class.idClass,
            name: Class.name,
            number: Class.number,
            // teacher: CLass.Teacher,
            // year: Class.year,
          };
        });
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
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NoP",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Teacher",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Year",
      dataIndex: "number",
      key: "number",
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
      <Card title= "Grade Information">
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
              defaultValue={"Select year"}
              options={[
                {
                  label: "2010-2011",
                  value: "2010-2011",
                },
                {
                  label: "2011-2012",
                  value: "2011-2012",
                },
                {
                  label: "2012-2013",
                  value: "2012-2013",
                },
                {
                  label: "2013-2014",
                  value: "2013-2014",
                },
                {
                  label: "2014-2015",
                  value: "2014-2015",
                },
                {
                  label: "2015-2016",
                  value: "2015-2016",
                },
                {
                  label: "2016-2017",
                  value: "2016-2017",
                },
                {
                  label: "2017-2018",
                  value: "2017-2018",
                },
                {
                  label: "2018-2019",
                  value: "2018-2019",
                },
                {
                  label: "2019-2020",
                  value: "2019-2020",
                },
                {
                  label: "2020-2021",
                  value: "2020-2021",
                },
                {
                  label: "2021-2022",
                  value: "2021-2022",
                },
                {
                  label: "2022-2023",
                  value: "2022-2023",
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
export default Gradesinformation;
