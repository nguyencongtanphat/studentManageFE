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
  const [ filteredData, setFilteredData ] = useState([]);
  const [classOptions, setClassOptions] = useState([])
  const [semesterOptions, setSemesterOptions] = useState([]);
  const classes = useRef([]);
  const years = useRef([]);

  useEffect(()=>{
   const fetchData =async ()=>{
     const classesSemesters = await ApiService.get("classes-semester");
     setFilteredData(classesSemesters);
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



  const handleSearchingClick = (classes) => {
    // let filtered = []
    // if (classes.current.length === 0 && years.current.length === 0) {
    //   filtered = dataSource;
    // }
    // else {
    //   if (classes.current.length !== 0)
    //     filtered = dataSource.filter(
    //       (record) =>
    //         classes.current.includes(record.name)
    //     );
    //   if (years.current.length !== 0) {
    //     if (filtered.length === 0)
    //       filtered = dataSource;
    //     filtered = filtered.filter(
    //       (record) =>
    //         years.current.includes(record.year)
    //     );
    //   }
    // }
    // setFilteredData(filtered);
  }

  const handleRowClick = () => {
    // navigate('/classes/id');
    // props.setFlag(!props.flag);
  }

  const handleClassesChange = (values) => {
    // const idClassesArr = [];
    // for (let i = 0; i < classOptions.length; i++) {
    //   for (let j = 0; j < values.length; j++) {
    //     if (classOptions[i].value === values[j])
    //       idClassesArr.push(classOptions[i].label);
    //   }
    // }
    // classes.current = idClassesArr;
  };

  const handleYearsChange = (values) => {
    // const idYearsArr = [];
    // for (let i = 0; i < yearOptions.length; i++) {
    //   for (let j = 0; j < values.length; j++) {
    //     if (yearOptions[i].value === values[j])
    //       idYearsArr.push(yearOptions[i].label);
    //   }
    // }
    // years.current = idYearsArr;
    // console.log(years.current);
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
            <Button  type="primary" className="Button">
              Add Class
            </Button>
          </Col>
        </Row>
        <SearchingClasses
          onClassesChange={handleClassesChange}
          selectClassOptions={classOptions}
          onYearsChange={handleYearsChange}
          selectSemesterOptions={semesterOptions}
          onSearchingClick={handleSearchingClick}
          classes={classes}
        />
        <ClassesTable
          filteredData={filteredData}
          columns={columns}
          handleRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
}

export default ClassesList;
