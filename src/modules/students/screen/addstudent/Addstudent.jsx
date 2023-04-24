import React from 'react'
import { 
    Card, 
    Typography, 
    Space,
    Input,
    Table,
    Select,
    Button
} from 'antd'
import style from './Addstudent.module.css'

const { Title } = Typography;
const { Meta } = Card;

function Addstudent() {
    return (
        <div className={style.Addstudent}>
            <Typography.Title level={3}>Home {'>'} Add Students</Typography.Title>
            <Space>
                <Card>
                    <Typography.Title level={4}>Add Students</Typography.Title>
                    <Typography.Text>NAME*</Typography.Text>
                    <Input size="large" placeholder=""></Input>
                    <br></br>
                    <Typography.Text>CLASS*</Typography.Text>
                    <br></br>
                        <Select
                            size="large"
                            onChange={(value)=>{

                            }}
                            defaultValue={"Select class"}
                            options={[{
                                label: '10A1',
                                value: '10A1',
                            },
                            {
                                label: '10A2',
                                value: '10A2',
                            },
                            {
                                label: '10A3',
                                value: '10A3',
                            },
                            {
                                label: '11A1',
                                value: '11A1',
                            },
                            {
                                label: '11A2',
                                value: '11A2',
                            },
                            {
                                label: '11A3',
                                value: '11A3',
                            },
                            {
                                label: '12A1',
                                value: '12A1',
                            },
                            {
                                label: '12A2',
                                value: '12A2',
                            },
                            {
                                label: '12A3',
                                value: '12A3',
                            },
                            ]}>   
                        </Select>
                    <br></br>
                    <Typography.Text>DATE OF BIRTH*</Typography.Text>
                    <Input size="large" placeholder=""></Input>
                    <br></br>
                    <Typography.Text>ID*</Typography.Text>
                    <Input size="large" placeholder=""></Input>
                    <br></br>
                    <Typography.Text>GENDER*</Typography.Text>
                    <br></br>
                    <Select
                        size="large"
                        onChange={(value)=>{

                        }}
                        defaultValue={"Select Gender"} 
                        options={[
                            {
                                label: "Nam",
                                value: "Nam",
                            },
                            {
                                label: "Nữ",
                                value: "Nữ",
                            },
                        ]}
                    ></Select>
                    <br></br>
                    <Typography.Text>ADDRESS*</Typography.Text>
                    <Input size="large" placeholder=""></Input>
                    <br></br>
                    <Typography.Text>EMAIL*</Typography.Text>
                    <Input size="large" placeholder=""></Input>
                    <div>
                        <Button htmlType='submit' type='primary'>Reset</Button>
                        <Button htmlType='submit' type='primary'>Save</Button>
                    </div>
                </Card>
            </Space>
        </div>
    )
}

export default Addstudent