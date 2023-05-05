import React from 'react'
import style from "./Allgrade.module.css"
import { Row, Col, Card, Divider, Typography } from "antd";
const { Title } = Typography;

const { Meta } = Card;
function Allgrade() {
  return (
    <div className={style.homePage}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Title level={2}>Grade 10</Title>
            <Divider />
            <h1>3 Classes</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={2}>Grade 11</Title>
            <Divider />
            <h1>3 Classes</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={2}>Grade 12</Title>
            <Divider />
            <h1>3 Classes</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Allgrade