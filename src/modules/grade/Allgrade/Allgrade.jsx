import React from 'react'
import style from "./Allgrade.module.css"
import { Row, Col, Card, Divider, Typography, Button} from "antd";
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApiService from '../../../ApiService';
const { Title } = Typography;

const { Meta } = Card;

function Allgrade() {
  const [grade10, setgrade10] = useState(0)
  const [grade11, setgrade11] = useState(0)
  const [grade12, setgrade12] = useState(0)
  const navigate = useNavigate();
  useLayoutEffect(()=>{
    let g10 =0, g11=0, g12=0;
    const fetchData = async ()=>{
      const resultGrade = await ApiService.get("classes");
        for(let i = 0; i < resultGrade.length ; i++){
          console.log(resultGrade[i]);
          if(resultGrade[i].name.includes('10')) g10+=1;
          else if(resultGrade[i].name.includes('11')) g11+=1;
          else if(resultGrade[i].name.includes('12')) g12+=1;
        }
        setgrade10(g10);
        setgrade11(g11);
        setgrade12(g12);
    }
    fetchData();
  },[])

  return (
    <div className={style.homePage}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            onClick={() => {
              navigate("/app/classes-grade/1");
            }}
          >
            <Title level={2}>Grade 10</Title>
            <Divider />
            <h1>{grade10}</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            onClick={() => {
              navigate("/app/classes-grade/2");
            }}
          >
            <Title level={2}>Grade 11</Title>
            <Divider />
            <h1>{grade11}</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            onClick={() => {
              navigate("/app/classes-grade/3");
            }}
          >
            <Title level={2}>Grade 12</Title>
            <Divider />
            <h1>{grade12}</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Allgrade