import React from 'react';
import { 
    Card, 
    Typography, 
    Space,
    Input,
    Select,
    Button,
    Form,
    DatePicker,
} from 'antd'
import style from './Addstudent.module.css'

const { Title } = Typography;

function Addstudent() {
    return (
        <div className={style.Addstudent}>
                <Card title="Add Students">
                    <Form>
                        <Form.Item name={"name"} label="NAME*">
                            <Input size="medium" placeholder=""></Input>
                        </Form.Item>
                        <Form.Item name={"class"} label="CLASS*">
                            <Select placeholder="Please select class">
                                {["10A1","10A2","10A3","11A1","11A2","11A3","12A1","12A2","12A3"].map(gender=>{
                                    return <Select.Option value={gender} key={gender}>{gender}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={"dateofbirth"} label="DATE OF BIRTH*">
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item name={"id"} label="ID*">
                            <Input size="medium" placeholder=""></Input>
                        </Form.Item>
                        <Form.Item name={"gender"} label="GENDER*">
                            <Select placeholder="Please select gender">
                                {["Nam","Nữ"].map(gender=>{
                                    return <Select.Option value={gender} key={gender}>{gender}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={"address"} label="ADDRESS*">
                            <Input size="medium" placeholder=""></Input>
                        </Form.Item>
                        <Form.Item name={"email"} label="EMAIL*">
                            <Input size="medium" placeholder=""></Input>
                        </Form.Item>
                    </Form>
                    <div className={style.spaceButton}>
                        <Space wrap>
                            <Button htmlType='submit' type='primary'>Reset</Button>
                            <Button htmlType='submit' type='primary'>Save</Button>
                        </Space> 
                    </div>   
                </Card>
        </div>
    );
}

export default Addstudent