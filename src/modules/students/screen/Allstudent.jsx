import React from 'react'
import { Table } from 'antd'
import style from './Allstudent.module.css'
import Search from 'antd/es/input/Search';
import { Row, Col, Card, Divider, Typography, Space } from "antd";
const { Title } = Typography;

const { Meta } = Card;
function Allstudent() {
  return (
    <div className={style.Allstudent}>
        <Typography.Title level={2}>All Student Data</Typography.Title>
        <Space>
            <Card>
                <Table columns={[
                    {
                        Title: "Id",
                        dataIndex: "title",
                    },
                    {
                        Title: "Name",
                        dataIndex: "description",
                    },
                    {
                        Title: "Gender",
                    },

                    {
                        Title: "Class",
                    },
                    {
                        Title: "Address",
                    },
                    {
                        Title: "Date Of Birth",
                    },
                    {
                        Title: "Email",
                    },
                ]}></Table>
            </Card>
        </Space>
    </div>
  )
}

export default Allstudent