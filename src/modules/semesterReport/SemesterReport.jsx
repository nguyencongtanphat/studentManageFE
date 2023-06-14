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
import style from "./SemesterReport.module.css";
import ApiService from "../../ApiService";
const { Option } = Select;

function SemesterReport() {
  const [semesterId, setSemesterId] = useState("");
  const [semesterData, setSemesterData] = useState([]);
  const [semesterReport, setSemesterReport] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const getSemesterData = async () => {
      try {
        const resultSemester = await ApiService.get("semesters/");
        console.log("semester data:",resultSemester);
        // const tempClassList = resultClass.filter((Class) => {
        //       return Class.idGrade == 1;
        // });
        setSemesterData(resultSemester)
      } catch (e) {
        console.log("error:", e);
      }
    };
    getSemesterData();

  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "idClass",
      key: "id",
    },
    {
      title: "Class",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NoP",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Number passed",
      dataIndex: "numPassed",
      key: "numPassed",
    },
    {
      title: "Percentage",
      dataIndex: "percent",
      key: "percent",
    },
  ];

  const searchHandler = () => {
    // let newClassList = classList;
    // if (nameQuery) {
    //   newClassList = classList.filter((Class) => {
    //     return (
    //       Class.name.includes(nameQuery) 
    //     );
    //   });
    // } else if (nameQuery) {
    //   newClassList = classList.filter((Class) => {
    //     return Class.name.includes(nameQuery);
    //   });
    // }
    // console.log("new classes: ", newClassList);
    // setClassListView(newClassList);
    const getSemesterReport = async () => {
      try {
        const id = semesterId;
        const resultSemesterReport = await ApiService.get('semesterReport/' + id);
        console.log("semester data:",resultSemesterReport);
        // const tempClassList = resultClass.filter((Class) => {
        //       return Class.idGrade == 1;
        // });
        const tempSemesterReport = resultSemesterReport.map((report) => {
          return {
            idClass: report.idClass,
            name: report.name,
            number: report.number,
            numPassed: report.passedNumber,
            percent: report.ratio * 100,
          }
        });
        setSemesterReport(tempSemesterReport)
      } catch (e) {
        console.log("error:", e);
      }
    };
    getSemesterReport();
  }
  return (
    <div className={style.Allstudent}>
      <Card title= "Semester Report">
        <div className={style.selectClass}>
          <Space>
            Semester: 
            <Select defaultValue="Chọn học kì" style={{ width: 300 }} onChange={value => setSemesterId(value)}>
                {semesterData.map(option => (
                <Option key={option.idSemester} value={option.idSemester}>Học kỳ {option.order} - Năm {option.year}</Option>
                ))}
            </Select>
            <Button onClick={searchHandler} htmlType="search" type="primary">
              Search
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={semesterReport}
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
            Print
        </Button>
      </Card>
    </div>
  );
}
export default SemesterReport;
