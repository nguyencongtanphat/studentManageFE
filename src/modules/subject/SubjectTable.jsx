import React from "react";
import {
  Modal,
  Table,
  Select,
  Card,
  Tag,
  Typography,
  Space,
  Button,
  AutoComplete,
  Input,
  Form,
} from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./SubjectTable.module.css";
import ApiService from "../../ApiService";
import { DeleteOutlined } from "@ant-design/icons";

function Listclassofgrade() {
  const [subjectListView, setSubjectListView] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [allSubjectDb, setAllSubjectDb] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form] = Form.useForm();
  const [tempSubjectName, setTempSubjectName] = useState("");
  const [idInputEditing, setIdInputEditing] = useState();
  // const [subjects, setSubjects] = useState([]);

  const fetchData = async () => {
    try {
      //const resultStudent = await ApiService.get("students/?isGetClass=true");
      const resSubject = await ApiService.get("subjects");
      const resTeacher = await ApiService.get("teachers");
      const subjectList = resSubject.map((subject) => {
        return {
          idSubject: subject.idSubject,
          name: subject.name,
          teachers: subject.teachersName,
        };
      });
      console.log("result subject: ", subjectList);
      console.log("teachers: ", resTeacher);
      // setSubjects(subjectList);
      setTeachers(resTeacher);
      setSubjectList(subjectList);
      setAllSubjectDb(subjectList);
      setSubjectListView(subjectList);
    } catch (e) {
      console.log("error:", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "idSubject",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Teachers",
      dataIndex: "teachers",
      key: "teachers",
      render: (_, { teachers }) => (
        <>
          {teachers.map((teacher) => {
            return <Tag key={teacher}>{teacher}</Tag>;
          })}
        </>
      ),
    },
  ];

  const columnsEdit = [
    {
      title: "#",
      dataIndex: "idSubject",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Input
          style={{ width: 100 }}
          placeholder={text}
          onBlur={(event) => {
            setTempSubjectName(event.target.value);
          }}
          onClick={(event) => {
            setTempSubjectName("");
            setIdInputEditing(record.idSubject);
          }}
        ></Input>
      ),
    },
    {
      key: "action",
      render: (text, record) => {
        //console.log("check disabled:", record.idClass, idInputEditing);
        return (
          <Button
            disabled={record.idSubject !== idInputEditing}
            type="primary"
            onClick={() => {
              //deleteStudentHandler(record.key);
              updateClassHandler();
            }}
          >
            Save
          </Button>
        );
      },
    },
    {
      key: "action",
      render: (text, record) => (
        <Button
          danger
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => {
            //deleteStudentHandler(record.key);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const updateClassHandler = async () => {
    //check subject is exists
    const isExist = allSubjectDb.some(
      (subject) => subject.name === tempSubjectName
    );
    if (isExist) {
      Modal.error({
        title: "Error",
        content: "Subject is already exist in the database",
        okText: "OK",
        onOk() {},
      });
    } else {
      const data = {
        name: tempSubjectName,
      };
      const response = await ApiService.put(`subjects/${idInputEditing}`, data);
      Modal.success({
        title: "Success",
        content: "Update subject successfully",
        okText: "OK",
        onOk() {},
      });
      setIdInputEditing(null);
      fetchData();
    }
  };
  const searchHandler = () => {
    let newSubjectList = subjectList;
    if (nameQuery) {
      newSubjectList = subjectList.filter((subject) => {
        return subject.name.includes(nameQuery);
      });
    } else if (nameQuery) {
      newSubjectList = subjectList.filter((Class) => {
        return Class.name.includes(nameQuery);
      });
    }
    console.log("new classes: ", newSubjectList);
    setSubjectListView(newSubjectList);
  };

  const editHandler = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };
  const addSubjectHandler = () => {
    Modal.info({
      title: "Add new subject",
      content: (
        <div>
          <Card>
            <Form form={form}>
              {/* fulname */}
              <Form.Item
                name={"name"}
                label="NAME"
                rules={[
                  { required: true, message: "Please input the subject name!" },
                ]}
              >
                <Input size="medium" placeholder=""></Input>
              </Form.Item>
              <Form.Item
                name={"teachers"}
                label="TEACHERS"
                rules={[{ required: true, message: "Please choose teacher!" }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select options"
                  //onChange={handleChange}
                >
                  {teachers.map((teacher) => {
                    return (
                      <Select.Option
                        value={teacher.idTeacher}
                        key={teacher.idTeacher}
                      >
                        {teacher.fullName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ),
      width: 500,
      async onOk() {
        const newSubjectInfo = form.getFieldsValue();
        console.log("data", newSubjectInfo)
        if (!newSubjectInfo.name) return false;
        const isSubjectExist = allSubjectDb.some(
          (subjectItem) => subjectItem.name === newSubjectInfo.name
        );
        if (isSubjectExist) {
          Modal.error({
            title: "Error",
            content: "Subject is already exist in the database",
            okText: "OK",
            onOk() {},
          });
        } else {
          //const response =  await ApiService.post
          
          const response = await ApiService.post("subjects", newSubjectInfo);
          Modal.success({
            title: "Success",
            content: "Create subject successfully",
            okText: "OK",
            onOk() {},
          });
          form.resetFields();
          await fetchData();
        }
      },
    });
  };

  return (
    <div className={style.Allstudent}>
      <Card title="List subject">
        <div className={style.selectSuject}>
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
          columns={!isEdit ? columns : columnsEdit}
          dataSource={subjectListView}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
          pagination={{
            pageSize: 7,
          }}
        ></Table>
        <Space wrap>
          {isEdit && (
            <Button
              htmlType="submit"
              type="primary"
              onClick={addSubjectHandler}
            >
              Add New Subject
            </Button>
          )}
          <Button
            htmlType="submit"
            type="primary"
            onClick={editHandler}
            danger={!isEdit ? false : true}
          >
            {!isEdit ? "Edit" : "Close"}
          </Button>
        </Space>
      </Card>
    </div>
  );
}
export default Listclassofgrade;
