import React from "react";
import {
  Modal,
  Table,
  Select,
  Card,
  Typography,
  Space,
  Button,
  AutoComplete,
  Input,
  Row,
  Col
} from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Listclassofgrade10.module.css";
import ApiService from "../../../ApiService";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";


function Listclassofgrade() {
  const [classListView, setClassListView] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classList, setClassList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [allClassesDb, setAllClassesDb] = useState([]);
  const [tempClassName, setTempClassName] = useState("")
  const [idInputEditing, setIdInputEditing] = useState()

  const { id } = useParams();
  const user = useSelector((state) => {
    return state.login.value;
  });
  const fetchData = async () => {
    try {
      console.log("id param:", id);
      const resultClass = await ApiService.get("classes");
      console.log("resultStudentsList:", resultClass);
      const tempClassList = resultClass.filter((classItem) => {
        return classItem.idGrade == id;
      });
      console.log(tempClassList);
      setAllClassesDb(resultClass);
      setClassListView(tempClassList);
      setClassList(tempClassList);
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
      dataIndex: "idClass",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Grade",
      dataIndex: "gradeName",
      key: "gradename",
    },
  ];

  const columnsEdit = [
    {
      title: "#",
      dataIndex: "idClass",
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
            setTempClassName(event.target.value);
          }}
          onClick={(event) => {
            setTempClassName("");
            setIdInputEditing(record.idClass);
          }}
        ></Input>
      ),
    },
    {
      title: "Grade",
      dataIndex: "gradeName",
      key: "gradename",
    },
    {
      key: "action",
      render: (text, record) => {
        //console.log("check disabled:", record.idClass, idInputEditing);
        return (
          <Button
            disabled={(record.idClass !== idInputEditing)}
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

  const updateClassHandler = async () =>{
     console.log("hehhe", tempClassName, idInputEditing);
     //check class is exists
     const isExist =  allClassesDb.some((classItem)=> classItem.name === tempClassName);
     if(isExist)
     {
        Modal.error({
          title: "Error",
          content: "Class is already exist in the database",
          okText: "OK",
          onOk() {},
        });
     }else{
        const data = {
          name:tempClassName,
          idGrade: id
        }
        const response =  await ApiService.put(`classes/${idInputEditing}`, data)
        Modal.success({
          title: "Success",
          content: "Create class successfully",
          okText: "OK",
          onOk() {},
        });
        setIdInputEditing(null)
        fetchData()
     }
  }
  const searchHandler = () => {
    let newClassList = classList;
    if (nameQuery) {
      newClassList = classList.filter((Class) => {
        return Class.name.includes(nameQuery);
      });
    } else if (nameQuery) {
      newClassList = classList.filter((Class) => {
        return Class.name.includes(nameQuery);
      });
    }
    console.log("new classes: ", newClassList);
    setClassListView(newClassList);
  };

  const editHandler = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };
  const addClassHandler = () => {
    let newClass = "";
    Modal.info({
      title: "Add new class to grade",
      content: (
        <div>
          <Card title="Add new class">
            <Input
              onChange={(event) => {
                newClass = event.target.value;
              }}
              size="medium"
              placeholder=""
            ></Input>
          </Card>
        </div>
      ),
      width: 500,
      async onOk() {
        console.log("new class: ", newClass);
        if(!newClass) return false
        const isClassExist = allClassesDb.some(
          (classItem) => classItem.name === newClass
        );
        if (isClassExist) {
          Modal.error({
            title: "Error",
            content: "Class is already exist in the database",
            okText: "OK",
            onOk() {},
          });
        } else {
          //const response =  await ApiService.post
          const data = {
            className: newClass,
            idGrade: id,
          };
          const response = await ApiService.post("classes", data);
          Modal.success({
            title: "Success",
            content: "Create class successfully",
            okText: "OK",
            onOk() {},
          });
          await fetchData()
        }
      },
    });
  };
  return (
    <div className={style.Allstudent}>
      <Card title="List class">
        <div className={style.selectClass}>

          <Row>
            <Col flex={4}>
            </Col>
            <Col flex={0.2}>
              <AutoComplete
                style={{ width: 200 }}
                onSearch={(value) => {
                  setNameQuery(value);
                }}
                placeholder="Search by name"
              />
            </Col>
            <Col flex={0}>\
              <Button onClick={searchHandler} htmlType="search" type="primary">
                Search
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          columns={!isEdit ? columns : columnsEdit}
          dataSource={classListView}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
          pagination={{
            pageSize: 7,
          }}
        ></Table>
        <Row>
          <Col flex={4}>
          </Col>
          <Col flex={0.2}>
            {isEdit && (
              <Button htmlType="submit" type="primary" onClick={addClassHandler}>
                Add New Class
              </Button>
            )}
          </Col>
          <Col flex={0}>
            <Button
              htmlType="submit"
              type="primary"
              onClick={editHandler}
              danger={!isEdit ? false : true}
            >
              {!isEdit ? "Edit" : "Close"}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
export default Listclassofgrade;
