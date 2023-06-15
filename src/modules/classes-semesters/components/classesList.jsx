import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchingClasses from '../ClassComponents/SearchingClass';
import ClassesTable from '../ClassComponents/TableOfClasses';
import { useEffect } from 'react';
import ApiService from '../../../ApiService';
import { useSelector, useDispatch } from "react-redux";

const columns = [
  {
    title: "id",
    dataIndex: "idClassSemester",
    key: "idClassSemester",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Semester",
    dataIndex: "semester",
    key: "idSemester",
  },
  {
    title: "Number of Students",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Teacher Name",
    dataIndex: "teacherName",
    key: "idTeacher",
  },
];

function ClassesList(props) {
 
  const user = useSelector((state) => {
    return state.login.value;
  });
  const { Title } = Typography;
  const [classesSemesters, setClassesSemesters] = useState([]);
  const [classesSemestersFilter, setClassesSemestersFilter] = useState([]);
  const [classOptions, setClassOptions] = useState([])
  const [semesterOptions, setSemesterOptions] = useState([]);
  const classes = useRef([]);
  const years = useRef([]);
  const [classSelected, setClassSelected] = useState("")
  const [semesterSelected, setSemesterSelected] = useState("");

  useEffect(()=>{
   const fetchData =async ()=>{
     let classesSemesters = await ApiService.get("classes-semester");
     console.log("classesSemesters", classesSemesters)
     if(user.role !== "Admin"){
       const newClassesSemesters = classesSemesters.filter(
         (classSemester) => classSemester.idTeacher === user.idTeacher
       );
       classesSemesters = newClassesSemesters;
     }
     setClassesSemesters(classesSemesters);
     setClassesSemestersFilter(classesSemesters);
     //get class options
     let tempClassOptions = [];
     classesSemesters.forEach((item)=>{

      //check class options is existing
      const isClassExist = tempClassOptions.some((classOption)=>{
        return classOption.label === item.name
      })
      if (!isClassExist) {
        tempClassOptions.push({ label: item.name, value: item.name });
      }
     })
     setClassOptions(tempClassOptions)
     //get semester options
     let tempSemesterOptions = [];
     classesSemesters.forEach((item)=>{
      //check semesters is existing
      const isSemesterExist = tempSemesterOptions.some((semesterOption) => {
        return semesterOption.label === item.semester;
      });

      if(!isSemesterExist){
        tempSemesterOptions.push({
          label:item.semester,
          value:item.semester,
        })
      }
    })
     setSemesterOptions(tempSemesterOptions)
   }
   fetchData()
  },[])

  const handleSearchingClick = () => {
    console.log("click search")
    let tempClassFilter = []
    if (classSelected !== "" && semesterSelected !== "") {
      tempClassFilter = classesSemesters.filter((classItem) => {
        return (
          classItem.name === classSelected &&
          classItem.semester === semesterSelected
        );
      });
    } else if (classSelected !== "") {
      tempClassFilter = classesSemesters.filter((classItem) => {
        return classItem.name === classSelected;
      });
    } else if (semesterSelected !== "") {
      tempClassFilter = classesSemesters.filter((classItem) => {
        return classItem.semester === semesterSelected;
      });
    }else{
      tempClassFilter = classesSemesters;
    }

    setClassesSemestersFilter(tempClassFilter);
  }

  

  const handleClassesChange = (values) => {
    console.log("click class changes:", values)
    setClassSelected(values)
  };

  const handleSemesterChange = (values) => {
    console.log("click semester changes:", values);
    setSemesterSelected(values);
  };


  return (
    <div>
      <Card>
        <Row>
          <Col flex={9}>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              Classes Data
            </Title>
          </Col>
        {user.role === "Admin" && </Row>
        <Row>
          <Col flex={4}>
          </Col>}
          <Col flex={1.5}>
            <SearchingClasses
            style ={{with:'150%'}}
            onClassesChange={handleClassesChange}
            selectClassOptions={classOptions}
            onSemesterChange={handleSemesterChange}
            selectSemesterOptions={semesterOptions}
            onSearchingClick={handleSearchingClick}
            classes={classes}
          />
          </Col>
        </Row>
        <ClassesTable
          filteredData={classesSemestersFilter}
          columns={columns}
         
        />
        <Row>
          <Col flex={4}></Col>
          <Col flex={0.5}>
            <Button 
              onClick={() =>{
                navigate("add-class");
              }}
              style={{width:'80%'}}
              type="primary" className="Button"
            >
              Add Class
            </Button>
          </Col>
        </Row>
      </Card>
      
    </div>
  );
}

export default ClassesList;
