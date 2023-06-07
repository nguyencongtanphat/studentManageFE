import React from 'react';
import {
  Modal,
  Card,
  Row,
  Col,
  Typography,
  Button,
  
} from "antd";
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import StudentListTable from './components/StudentListTable';
import ClassInfo from './components/classInfo';
import AddStudent from './components/AddStudent';

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
function AddNewClass(){
     const navigate = useNavigate();
     const { Title } = Typography;
     const [studentsList, setStudentsList] = useState([]);
     const [selectedTeacher, setSelectedTeacher] = useState()
     const [selectedClass, setSelectedClass] = useState() 
     const [selectedSemester, setSelectedSemester] = useState()
     const [selectedYear, setSelectedYear] = useState()
     const handleRowClick = () => {
       navigate("/classes/id");
     };
     const onStudentListChange = (newStudentList) => {
      console.log("onStudentListChange", newStudentList);
      //setStudentsList(newStudentList);
      setStudentsList([...studentsList, ...newStudentList]);
     }
     const handlerSubmit = ()=>{
      if(studentsList.length===0){
        Modal.info({
          title: "Add student to class",
          content: (
            <div>
              <AddStudent studentsList={studentsList} onStudentListChange={onStudentListChange} />
            </div>
          ),
          width: 800,
          onOk() {},
        });
      }else{
        if (
          !selectedClass ||
          !selectedTeacher ||
          !selectedSemester ||
          !selectedYear ||
          studentsList.length===0
        ){
          Modal.error(
             {title:"Please fill all the required fields for class"}
          )
        }else{
          console.log("here submit", {
            className: selectedClass,
            numPupils: studentsList.length,
            teacher: selectedTeacher,
            semester: selectedSemester,
            year: selectedYear,
            studentList: studentsList,
          });
        }
          
      }
     }
     const handlerAddStudent = ()=>{
       Modal.info({
         title: "Add student to class",
         content: (
           <div>
             <AddStudent
               studentsList={studentsList}
               onStudentListChange={onStudentListChange}
             />
           </div>
         ),
         width: 800,
         onOk() {},
       });
     }
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
             onTeacherChange={(newTeacher) => {
               setSelectedTeacher(newTeacher);
             }}
             onClassChange={(newClass) => {
               setSelectedClass(newClass);
             }}
             onSemesterChange={(newSemester) => {
               setSelectedSemester(newSemester);
             }}
             onYearChange={(newYear) => {
               setSelectedYear(newYear.$y);
             }}
             numPupils={studentsList.length}
           />
           <StudentListTable
             filteredData={studentsList}
             columns={columns}
             handleRowClick={handleRowClick}
           />
           <Row style={{ display: "flex", justifyContent: "flex-end" }}>
             <Button
               type="primary"
               onClick={handlerAddStudent}
               style={{ marginRight: 10 }}
             >
               Add Student
             </Button>
             <Button type="primary" onClick={handlerSubmit}>
               Save
             </Button>
           </Row>
         </Card>
       </div>
     );
}

export default AddNewClass;







