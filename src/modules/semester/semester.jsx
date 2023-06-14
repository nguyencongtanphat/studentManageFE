import React, { useState } from "react";
import { Table, Card, Space, Button, AutoComplete, Modal, Input } from "antd";
import style from "./semester.module.css";
import { useEffect } from "react";
import ApiService from "../../ApiService";

function Semester() {
  const [semesterListView, setSemesterListView] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [allSemesterDb, setAllSemesterDb] = useState([]);

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultSemester = await ApiService.get("semesters");
        console.log(resultSemester);
        const tempSemesterList = resultSemester.map((semester) => {
          return {
            key: semester.idSemester,
            idSemester: semester.idSemester,
            order: semester.order,
            year: semester.year,
          };
        });
        setSemesterListView(tempSemesterList);
        setSemesterList(tempSemesterList);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "idSemester",
      key: "idSemester",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
  ];

  const searchHandler = () => {
    let newSemesterList = semesterList;
    if (nameQuery) {
        newSemesterList = semesterList.filter((semester) => {
        return semester.year.includes(nameQuery) 
      });
    }

    console.log("new semester: ", newSemesterList);
    setSemesterListView(newSemesterList);
  };
  
  const addSemesterHandler = () => {
    let newSemester ='';
    Modal.info({
        title: "Add new Semester",
        content: (
          <div>
            <Card title="Add new class">
              <Input
                onChange={(event) => {
                  newSemester = event.target.value;
                }}
                size="medium"
                placeholder=""
              ></Input>
            </Card>
          </div>
        ),
        width: 500,
        async onOk() {
        console.log("new semester: ", newSemester);
        if(!newSemester) return false
        const isClassExist = allSemesterDb.some(
          (semesterItem) => semesterItem.name === newSemester
        );
        if (isClassExist) {
          Modal.error({
            title: "Error",
            content: "Class is already exist in the database",
            okText: "OK",
            onOk() {},
          });
        } else {
          //const response =  await ApiService.post
          const data = {
            seName: newSemester,
            idGrade: id,
          };
          const response = await ApiService.post("classes", data);
          Modal.success({
            title: "Success",
            content: "Create class successfully",
            okText: "OK",
            onOk() {},
          });
          await fetchData()
        }
      },
  })
};

  return (
    <div className={style.Semester}>
      <Card title="All Semester Data">
        <div className={style.selectClass}>
          <Space>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(value) => {
                setNameQuery(value);
              }}
              placeholder="Search by year"
            />
          <Button onClick={searchHandler} htmlType="search" type="primary">
            Search
          </Button>
          </Space>
          
        </div>
        <Table
          columns={columns}
          dataSource={semesterListView}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
        />
        <Space wrap>
            <Button htmlType="submit" type="primary" onClick={addSemesterHandler}>
              Add New Class
            </Button>
        </Space>
      </Card>
    </div>
  );
}

export default Semester;
