import React from 'react'
import { 
    Card, 
    Typography, 
    Space,
    Input,
    Select,
    Button,
    Form
} from 'antd'
import style from './Editstudent.module.css'

const { Title } = Typography;

function Editstudent () {
    return (
        <div>
            <Typography.Title level={3}>Home {'>'} Students Data {'>'} Students Profile {'>'} Edit Student</Typography.Title>
            <Space>
                <Card>
                    <Typography.Title level={4}>Edit Student</Typography.Title>
                        <Form>
                            <Form.Item name={"name"} label="NAME*">
                                
                                <Input size="large" placeholder=""></Input>
                            </Form.Item>
                        </Form>
                </Card>
            </Space>
        </div>
    )
}

export default Editstudent