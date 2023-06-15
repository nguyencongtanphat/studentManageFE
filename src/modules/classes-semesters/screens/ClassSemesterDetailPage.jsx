import React from "react";
import { Modal, Card, Row, Col, Typography, Button } from "antd";
import StudentListTable from "../components/StudentListTable";
import ClassInfo from "../components/classInfo";
import AddStudent from "../components/AddStudentsDetailPage";
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
  const [selectedNewStudent, setSelectedNewStudent] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteStudentHandler = async (idStudent) => {
    try {
     
      const response = await ApiService.delete(`classes-semester/${id}/${idStudent}`);
      console.log(idStudent)
      Modal.success({
        title: "Success",
        content: "Delete student successfully",
        okText: "OK",
        onOk() {
          fetchData()
        },
      });

    } catch (e) {
      Modal.error({
        title: "Fail",
        content: "Create class fail, please try again",
        okText: "OK",
        onOk() {},
      });
    }
  };

  const onStudentListChange = (newStudentList) => {
    console.log("onStudentListChange", newStudentList);
    setSelectedNewStudent(newStudentList);
  };
  const closeModal = () => {
    console.log("closeModal",);
    Modal.destroyAll()
  }
  const addStudentHandler = () => {
    Modal.info({
      title: "Add student to class",
      content: (
        <div>
          <AddStudent
            idClassSemester={id}
            studentsList={studentsList}
            onStudentListChange={onStudentListChange}
            closeModal={closeModal}
            fetchData = {fetchData}
          />
        </div>
      ),
      width: 800,
      okButtonProps: { style: { display: "none" } },
    });
  };

  const handlerSubmit = async () => {
    let isClassExist = classSemesters.some(
      (classSemester) =>{
        console.log(
          classSemester.idClass , selectedClass ,
            classSemester.idSemester ,selectedSemester
        );
        return (
          classSemester.idClass === selectedClass &&
          classSemester.idSemester === selectedSemester
        );
      }
       
    );
    console.log("isClassExist", isClassExist, classSemesters);
    if (isClassExist) {
      Modal.error({
        title: "Error",
        content: "Class is already exist in this semester",
        okText: "OK",
        onOk() {},
      });
    } else {
      const data = {
        idClass: selectedClass || classInfo.idClass,
        number: studentsList.length,
        idTeacher: selectedTeacher || classInfo.idTeacher,
        idSemester: selectedSemester || classInfo.idSemester,
      };
      console.log("submit here:", data);
      await ApiService.put(
        `classes-semester/${classInfo.idClassSemester}`,
        data
      );
      Modal.success({
        title: "Success",
        content: "Update class successfully",
        okText: "OK",
        onOk() {},
      });
      setIsEdit(false);
    }
  };
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
  //fetch class-semester data
  useEffect(() => {
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
              danger = {isEdit}
              onClick={
                !isEdit
                  ? () => {
                      setIsEdit(true);
                    }
                  : handlerSubmit
              }
            >
              {!isEdit ? "Edit" :  "Save" }
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ClassSemesterDetail;
