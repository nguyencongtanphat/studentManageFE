import React from "react";

import { Modal, Card, Row, Col, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import StudentListTable from "../components/StudentListTable";
import ClassInfo from "../components/classInfo";
import AddStudent from "../components/AddStudent";
import ApiService from "../../../ApiService";

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
function AddNewClass() {
  const navigate = useNavigate();
  const { Title } = Typography;
  const [studentsList, setStudentsList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [classSemesters, setClassSemesters] = useState();

  //load class semester
  useEffect(() => {
    const fetchData = async () => {
      const classSemesters = await ApiService.get("classes-semester");
      console.log("classSemesters:", classSemesters);
      setClassSemesters(classSemesters);
    };
    fetchData();
  }, []);

  const handleRowClick = () => {
    navigate("/classes/id");
  };
  const onStudentListChange = (newStudentList) => {
    console.log("onStudentListChange", newStudentList);
    //setStudentsList(newStudentList);
    setStudentsList([...studentsList, ...newStudentList]);
  };
  const handlerSubmit = async () => {
    if (studentsList.length === 0) {
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
    } else {
      if (
        !selectedClass ||
        !selectedTeacher ||
        !selectedSemester ||
        studentsList.length === 0
      ) {
        Modal.error({ title: "Please fill all the required fields for class" });
      } else {
        
        let isClassExist = classSemesters.some(
          (classSemester) =>
            classSemester.idClass === selectedClass &&
            classSemester.idSemester === selectedSemester
        );
        if(isClassExist){
         Modal.error({
           title: "Error",
           content: "Class is already exist in this semester",
           okText: "OK",
           onOk() {},
         });
        }else{
          const idStudentsList = studentsList.map(student=>student.id);
          const data = {
            idClass: selectedClass,
            number: studentsList.length,
            idTeacher: selectedTeacher,
            idSemester: selectedSemester,
            listIdStudent: idStudentsList,
          };
          console.log("submit here:",data)
          const response = await ApiService.post("classes-semester", data);
           Modal.success({
             title: "Success",
             content: "Create class successfully",
             okText: "OK",
             onOk() {},
           });
          navigate("/classes-semesters");
        }
      }
    }
  };
  const handlerAddStudent = () => {
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
          isEdit = {true}
          onTeacherChange={(newTeacher) => {
            setSelectedTeacher(newTeacher);
          }}
          onClassChange={(newClass) => {
            setSelectedClass(newClass);
          }}
          onSemesterChange={(newSemester) => {
            setSelectedSemester(newSemester);
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
