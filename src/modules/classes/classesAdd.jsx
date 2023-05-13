import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table, Input } from 'antd';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import StudentListTable from './components/StudentListTable';
import ClassInfo from './components/classInfo';
const {Text, Link} = Typography;
const dataSource = [
  {
    id: "1",
    Name: "Nguyen Van A",
    Gender: "Nam",
    Birthday: "10/3/2002",
    Address: "10/4 Nguyen Hue",
  },
];
const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    flex: 1,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    flex: 1,
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender",
    flex: 1,
  },
  {
    title: "Birthday",
    dataIndex: "Birthday",
    key: "Birthday",
    flex: 1,
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
    flex: 1,
  },
];
function AddNewClass(){
     const navigate = useNavigate();
     const { Title } = Typography;
     const [filteredData, setFilteredData] = useState(dataSource);
     const [numPupils, setNumPupils] = useState(0);
     const classes = useRef([]);

     const handleNumsPupilsChange = (values) => {
       setNumPupils(values.target.value);
     };
     const handleRowClick = () => {
       navigate("/classes/id");
     };
     return (
       <div>
         <Card>
           <Row>
             <Col flex={9}>
               <Title level={3} style={{ margin: 0, padding: 0 }}>
                 Classes Information{" "}
               </Title>
             </Col>
           </Row>
           <ClassInfo
             onNumsPupilsChange={handleNumsPupilsChange}
             numPupils={numPupils}
           />
           <StudentListTable
             filteredData={filteredData}
             columns={columns}
             handleRowClick={handleRowClick}
           />
           <Row style={{ display: "flex", justifyContent: "flex-end" }}>
             <Button type="primary" style={{ marginRight: 10 }}>
               Add Student
             </Button>
             <Button type="primary">Save</Button>
           </Row>
         </Card>
       </div>
     );
}

export default AddNewClass;







