import React, { useEffect, useState } from "react";
import { Space, Select, Table, Card, AutoComplete, Button, Tag } from "antd";
import ApiService from "../../../ApiService";
function AddStudent(props) {
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const [studentList, setStudentList] = useState([]);
  const [studentListView, setStudentListView] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
 

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      props.onStudentListChange(selectedRows);
    },
  };

  const searchHandler = () => {
    let newStudentList = studentList;
    if (nameQuery){
       newStudentList = studentList.filter((student) => {
         return student.name.includes(nameQuery);
       });
    }
    setStudentListView(newStudentList);
  };
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultStudent = await ApiService.get("students?isGetClass=true");
        console.log("resultStudentsList:", resultStudent);
        console.log("props list:", props.studentsList);

        //filter students list
        const filteredStudentList = resultStudent.filter((student) => {
          //check student is selected or not
          const found = props.studentsList.find(
            (studentInList) => studentInList.key === student.idStudent
          );
          return !found;
        });
        console.log("list filtered student data:", filteredStudentList);

        const tempStudentList = filteredStudentList.map((student) => {
          //check student is selected or not
          return {
            key: student.idStudent,
            id: student.idStudent,
            name: student.fullName,
            gender: student.gender,
            birthday: student.dayOfBirth,
            address: student.address,
          };
        });
        console.log("list student data:", tempStudentList);
        setStudentListView(tempStudentList);
        setStudentList(tempStudentList);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchData();
  }, []);
  
  return (
    <Card title="All Student Data">
      <div>
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
        dataSource={studentListView}
        onRow={(record) => ({
          onClick: () => {
            console.log(record);
          },
        })}
        rowSelection={rowSelection}
      />
    </Card>
  );
}

export default AddStudent;
