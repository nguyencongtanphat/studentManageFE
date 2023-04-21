import React from 'react'
import style from "./HomePage.module.css"
import { Row, Col, Card, Divider, Typography } from "antd";
const { Title } = Typography;

const { Meta } = Card;
function HomePage() {
  return (
    <div className={style.homePage}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Title level={3}>Total students</Title>
            <Divider />
            <h1>1200</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={3}>Total students</Title>
            <Divider />
            <h1>1200</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={3}>Total students</Title>
            <Divider />
            <h1>1200</h1>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={3}>Total students</Title>
            <Divider />
            <h1>1200</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage