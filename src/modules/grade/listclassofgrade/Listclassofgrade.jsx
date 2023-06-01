import React from "react";
import {
  Table,
  Select,
  Card,
  Typography,
  Space,
  Button,
  AutoComplete,
  Form,
} from "antd";
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from "./Listclassofgrade10.module.css";
import ApiService from "../../../ApiService";

function Listclassofgrade10() {
  const [classListView, setClassListView] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [classList, setClassList] = useState([]);
  const [Class, setClass] = useState({}); 


  const {id} = useParams();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("id param:", id)
        const resultClass = await ApiService.get("classes");
        console.log("resultStudentsList:",resultClass);
        const tempClassList = resultClass.filter((Class) => {
              return Class.idGrade == id;
        });
        console.log(tempClassList)
        setClassListView(tempClassList);
        setClassList(tempClassList);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchData();
  }, []);

// const HandleSubmit = () => {
//     const {name,idgrade,gradename} = prompt.getFieldsValue();
//     if (!name && !idgrade && !gradename)
//         console.log('dien it nhat 1 thong tin di pa');
//     else {
//         const newClass = {
//             name: name ? name: Class.name,
//             idGrade: idgrade ? idgrade: Class.idgrade,
//             gradeName: gradename ? gradename: Class.gradename,
//         }
//         const putClass = async (data) => {
//             const putdata = await ApiService.put(requrl, data)        
//             console.log(putdata);
//         }
//         putClass(newClass);
//     }
// }

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

  const searchHandler = () => {
    let newClassList = classList;
    if (nameQuery) {
      newClassList = classList.filter((Class) => {
        return (
          Class.name.includes(nameQuery) 
        );
      });
    } else if (nameQuery) {
      newClassList = classList.filter((Class) => {
        return Class.name.includes(nameQuery);
      });
    }
    console.log("new classes: ", newClassList);
    setClassListView(newClassList);
  }

  return (
    <div className={style.Allstudent}>
      <Card title= "List class of grade 10">
        <div className={style.selectClass}>
          <Space>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(value) => {
                setNameQuery(value);
              }}
              placeholder="Search by name"
            />
            <Select
              onChange={(value) => {}}
              defaultValue={"Select Semester"}
              options={[
                {
                  label: "I",
                  value: "I",
                },
                {
                  label: "II",
                  value: "II",
                },
              ]}
            ></Select>
            <Button onClick={searchHandler} htmlType="search" type="primary">
              Search
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
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
        <Space wrap>
          <Button
            htmlType='submit'
            type='primary'
          >
            Edit
          </Button>
        </Space>
      </Card>
    </div>
  );
}
export default Listclassofgrade10;
