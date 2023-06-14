import React from 'react'
import style from "./HomePage.module.css"
import { Row, Col, Card, Divider, Typography, Button } from "antd";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService"
const { Title } = Typography;

const { Meta } = Card;
function HomePage() {
  const navigate = useNavigate();
  const [schoolInfo, setSchoolInfo]= useState({})
  useEffect(()=>{
    const fetchData = async ()=>{
      const [students, teachers, classes, grades ] = await Promise.all([
        ApiService.get("students"),
        ApiService.get("teachers"),
        ApiService.get("classes"),
        ApiService.get("grades"),
      ]);
      setSchoolInfo({
        studentsNumber:students.length,
        teachersNumber:teachers.length,
        classesNumber:classes.length,
        gradesNumber:grades.length,
      })
    }
    fetchData();
  },[])
  return (
    <div className={style.homePage}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Title level={3}>Total students </Title>
            <Divider />
            <Button 
              onClick={()=>{
                navigate("/app/students");
              }}
              type='Text'
            >
            <h1>{schoolInfo.studentsNumber}</h1>
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={3}>Total classes</Title>
            <Divider />
            <Button 
              onClick={()=>{
                navigate("/app/students");
              }}
              type='Text'
            >
            <h1>{schoolInfo.classesNumber}</h1>
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={3}>Total grades</Title>
            <Divider />
            <Button 
              onClick={()=>{
                navigate("/app/students");
              }}
              type='Text'
            >
             <h1>{schoolInfo.gradesNumber}</h1>
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={3}>Total teachers</Title>
            <Divider />
            <Button 
              onClick={()=>{
                navigate("/app/students");
              }}
              type='Text'
            >
             <h1>{schoolInfo.teachersNumber}</h1>
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage