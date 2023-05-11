import React, { useState } from 'react';
import { 
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
    Typography,
    Space,
    Card,
    Button
} from 'antd'

import style from './Profilestudent.module.css'
const { Title } = Typography;

function Profilestudent () {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <div className={style.Addstudent}>
            <Card title= "Profile Student">
                        <Form>
                            <Form.Item name={"name"} label="NAME*">
                                <Input
                                    size="medium"
                                    placeholder=""
                                    initialValue='aaa'></Input>
                            </Form.Item>
                            <Form.Item name={"class"} label="CLASS*">
                                <Select placeholder="Please select class">
                                    {["10A1","10A2","10A3","11A1","11A2","11A3","12A1","12A2","12A3"].map(gender=>{
                                        return <Select.Option value={gender} key={gender}>{gender}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item name={"dateofbirth"} label="DATE OF BIRTH*">
                                <DatePicker />
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
                                <div className={style.spaceButton}>
                                    <Space wrap>
                                        <Button htmlType='submit' type='primary'>Edit</Button>
                                        {/* <Button htmlType='submit' type='primary'>Save</Button> */}
                                    </Space> 
                                </div> 
                        </Form>
            </Card>
        </div>
    );
}

export default Profilestudent