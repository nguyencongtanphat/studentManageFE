import React from "react";
import { Modal, Card, Row, Col, Typography, Button } from "antd";
import StudentListTable from "../components/StudentListTable";
import ClassInfo from "../components/classInfo";
import AddStudent from "../components/AddStudent";
import ApiService from "../../../ApiService";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";


function ClassSemesterDetail() {
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
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
    {
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => {
            deleteStudentHandler(record.key);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const coulumsEdit = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
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
  const { Title } = Typography;
  const [studentsList, setStudentsList] = useState([]);
  const [classInfo, setClassInfo] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [classSemesters, setClassSemesters] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteStudentHandler = (idStudent)=>{
    const newStudentList = studentsList.filter(
      (student) =>{
        console.log("check", student.key !== idStudent);
        return student.key !== idStudent;
      }
    );
    console.log("new student list", newStudentList)
    setStudentsList(newStudentList);
  }

  const onStudentListChange = (newStudentList) => {
    console.log("onStudentListChange", newStudentList);
    //setStudentsList(newStudentList);
    setStudentsList([...studentsList, ...newStudentList]);
  };
  const addStudentHandler = () => {
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
  const handlerSubmit = async () => {
    let isClassExist = classSemesters.some(
      (classSemester) =>
        classSemester.idClass === selectedClass &&
        classSemester.idSemester === selectedSemester
    );
    if (isClassExist) {
      Modal.error({
        title: "Error",
        content: "Class is already exist in this semester",
        okText: "OK",
        onOk() {},
      });
    } else {
      const idStudentsList = studentsList.map((student) => student.key);
      const data = {
        idClass: selectedClass || classInfo.idClass,
        number: studentsList.length,
        idTeacher: selectedTeacher || classInfo.idTeacher,
        idSemester: selectedSemester || classInfo.idSemester,
        listIdStudent: idStudentsList,
      };
      console.log("submit here:", data);
      await ApiService.put(`classes-semester/${classInfo.idClassSemester}`, data);
      Modal.success({
        title: "Success",
        content: "Create class successfully",
        okText: "OK",
        onOk() {},
      });
      setIsEdit(false)
    }
  };
  //fetch class-semester data
  useEffect(() => {
    const fetchData = async () => {
      const response = await ApiService.get("classes-semester/" + id);
      console.log("response info: ", response.classInfo);
      const tempStudentsList = response.studentsList.map((student) => {
        return {
          key: student.idStudent,
          name: student.fullName,
          address: student.address,
          gender: student.gender,
          birthday: student.dayOfBirth,
        };
      });
      const classSemesters = await ApiService.get("classes-semester");
      console.log("classSemesters:", classSemesters);
      setClassSemesters(classSemesters);
      setStudentsList(tempStudentsList);
      setClassInfo(response.classInfo);
    };
    fetchData();
  }, []);
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
          isEdit={isEdit}
          defaultValue={classInfo || ""}
          onTeacherChange={(newTeacher) => {
            setSelectedTeacher(newTeacher);
          }}
          onClassChange={(newClass) => {
            setSelectedClass(newClass);
          }}
          onSemesterChange={(newSemester) => {
            setSelectedSemester(newSemester);
          }}
        />
        <StudentListTable
          filteredData={studentsList}
          columns={isEdit ? columns : coulumsEdit}
          handleRowClick={() => {}}
        />
        <Row
          gutter={16}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Col>
            {isEdit && (
              <Button type="primary" onClick={addStudentHandler}>
                Add students
              </Button>
            )}
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={
                !isEdit
                  ? () => {
                      setIsEdit(true);
                    }
                  : handlerSubmit
              }
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ClassSemesterDetail;
