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
import style from "./Printsubjectsummary.module.css";
import ApiService from "../../ApiService";

function Printsubjectsummary() {
  const [printsubjectListView, setPrintSubjectListView] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [printsubjectList, setPrintSubjectList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultPrintsubject = await ApiService.get("classes");
        console.log("resultStudentsList:",resultPrintsubject);
        const tempPrintsubjectList = resultPrintsubject.map((subject) => {
          return {
            key: subject.idClass,
            id: subject.idClass,
            name: subject.name,
            number: subject.number,
            // teacher: CLass.Teacher,
            // year: Class.year,
          };
        });
        setPrintSubjectListView(tempPrintsubjectList);
        setPrintSubjectList(tempPrintsubjectList);
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
      title: "Standard Quantity",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Percentage",
      dataIndex: "number",
      key: "number",
    },
  ];

  return (
    <div className={style.Allstudent}>
      <Card title= "Print Subject Summary">
        <div className={style.selectClass}>
          <Space>
          <Select
              onChange={(value) => {}}
              defaultValue={"Select Subject"}
              options={[
                {
                  label: "Math",
                  value: "Math",
                },
                {
                  label: "Physics",
                  value: "Physics",
                },
                {
                  label: "Chemical",
                  value: "Chemical",
                },
                {
                  label: "Biology",
                  value: "Biology",
                },
                {
                  label: "Ethics",
                  value: "Ethics",
                },
                {
                  label: "Geography",
                  value: "Geography",
                },
                {
                  label: "History",
                  value: "History",
                },
                {
                  label: "Literature",
                  value: "Literature",
                },
                {
                  label: "PE",
                  value: "PE",
                },
              ]}
            ></Select>
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
            <Button htmlType="search" type="primary">
              Search
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={printsubjectListView}
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
export default Printsubjectsummary;
