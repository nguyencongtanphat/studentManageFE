import React from 'react';
import { Card, Row, Col, Typography, Button, Table, Form } from 'antd';
import '../../App.css';
import { useState, useRef, useEffect } from 'react';
import ApiService from '../../ApiService';

const columns = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }
  ];

function SubjectTable() {
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
              //const resultStudent = await ApiService.get("students/?isGetClass=true");
              const result = await ApiService.get("subjects");
              
              const subjectList = result.map((subject) => {
                return {
                  key: subject.idSubject,
                  order: subject.idSubject,
                  name: subject.name,
                };
              });
              setSubjects(subjectList);
            } catch (e) {
              console.log("error:", e);
            }
          };
          fetchData();
    }, []);
    return (
        <>
            <Card>
                <Typography.Title style={{marginTop: 'auto'}} level={2}>Subject List</Typography.Title>
                <Table
                    rowClassName="custom-row"
                    dataSource={subjects}
                    columns={columns}
                />
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Button type= 'primary'>Add</Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default SubjectTable;