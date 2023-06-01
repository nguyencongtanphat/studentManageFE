import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchingClasses from './ClassComponents/SearchingClass';
import ClassesTable from './ClassComponents/TableOfClasses';
import { useEffect } from 'react';
import ApiService from '../../ApiService';



const yearOptions = [
  {
    label: '2021-2022',
    value: 2021
  },
  {
    label: '2022-2023',
    value: 2022
  }
];
const dataSource = [
  {
    idClassSemester: 9,
    idClass: 5,
    idSemester: 6,
    idTeacher: 2,
    semester: "2 - 2024",
    number: 4,
    updatedAt: "2023-05-20T02:02:49.000Z",
    createdAt: "2023-05-20T02:02:49.000Z",
    name: "11A1",
    idGrade: 2,
    order: 2,
    year: 2024,
    teacherName: "Nguyễn Văn B",
  },
];

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
  const navigate = useNavigate();
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
     const classesSemesters = await ApiService.get("classes-semester");
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

  const handleRowClick = () => {
    // navigate('/classes/id');
    // props.setFlag(!props.flag);
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
          <Col flex={2}>
            <Button type="primary" className="Button">
              Add Class
            </Button>
          </Col>
        </Row>
        <SearchingClasses
          onClassesChange={handleClassesChange}
          selectClassOptions={classOptions}
          onSemesterChange={handleSemesterChange}
          selectSemesterOptions={semesterOptions}
          onSearchingClick={handleSearchingClick}
          classes={classes}
        />
        <ClassesTable
          filteredData={classesSemestersFilter}
          columns={columns}
          handleRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
}

export default ClassesList;