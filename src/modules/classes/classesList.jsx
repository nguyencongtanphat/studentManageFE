import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchingClasses from './ClassComponents/SearchingClass';
import ClassesTable from './ClassComponents/TableOfClasses';

const classOptions = [
  {
    label: '10A1',
    value: 1
  },
  {
    label: '10A2',
    value: 2
  },
  {
    label: '10A3',
    value: 3
  }
];

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
    id: '1',
    name: '10A1',
    year: '2021-2022',
    studentnums: 30
  },
  {
    id: '2',
    name: '10A2',
    year: '2021-2022',
    studentnums: 30
  },
  { 
    id: '3',
    name: '10A3',
    year: '2021-2022',
    studentnums: 30
  },
  { 
    id: '4',
    name: '10A1',
    year: '2022-2023',
    studentnums: 30
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Number of Students',
    dataIndex: 'studentnums',
    key: 'studentnums',
  },
];

function ClassesList(props) {
  const navigate = useNavigate();
  const { Title } = Typography;
  const [ filteredData, setFilteredData ] = useState(dataSource);
  const classes = useRef([]);
  const years = useRef([]);

  const handleSearchingClick = (classes) => {
    let filtered = []
    if (classes.current.length === 0 && years.current.length === 0) {
      filtered = dataSource;
    }
    else {
      if (classes.current.length !== 0)
        filtered = dataSource.filter(
          (record) =>
            classes.current.includes(record.name)
        );
      if (years.current.length !== 0) {
        if (filtered.length === 0)
          filtered = dataSource;
        filtered = filtered.filter(
          (record) =>
            years.current.includes(record.year)
        );
      }
    }
    setFilteredData(filtered);
  }

  const handleRowClick = () => {
    navigate('/classes/id');
    props.setFlag(!props.flag);
  }

  const handleClassesChange = (values) => {
    const idClassesArr = [];
    for (let i = 0; i < classOptions.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (classOptions[i].value === values[j])
          idClassesArr.push(classOptions[i].label);
      }
    }
    classes.current = idClassesArr;
  };

  const handleYearsChange = (values) => {
    const idYearsArr = [];
    for (let i = 0; i < yearOptions.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (yearOptions[i].value === values[j])
          idYearsArr.push(yearOptions[i].label);
      }
    }
    years.current = idYearsArr;
    console.log(years.current);
  };


  return (
    <div>
        <Card>
            <Row>
                <Col flex={9} >
                  <Title level={3} style={{ margin: 0, padding: 0}}>Classes Data</Title>
                </Col>
                <Col flex={2}>
                  <Button type='primary' className='Button'>Add Class</Button>
                </Col>
            </Row> 
            <SearchingClasses
              onClassesChange={handleClassesChange}
              selectClassOptions={classOptions}
              onYearsChange={handleYearsChange}
              selectYearOptions={yearOptions}
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
  )
}

export default ClassesList;
