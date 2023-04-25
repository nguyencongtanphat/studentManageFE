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

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

function Profilestudent () {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <div>
            <Typography.Title level={3}>Home {'>'} Students Data {'>'} Students Profile {'>'} Edit Student</Typography.Title>
            <Space wrap>
                <Card>
                    <Typography.Title level={4}>Profile Student</Typography.Title>
                            <Checkbox
                                checked={componentDisabled}
                                onChange={(e) => setComponentDisabled(e.target.checked)}
                            >Edit Profile Student</Checkbox>
                        <Form disabled={componentDisabled}>
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
                                        <Button htmlType='submit' type='primary'>Reset</Button>
                                        <Button htmlType='submit' type='primary'>Save</Button>
                                    </Space> 
                                </div> 
                        </Form>
                </Card>
            </Space>
        </div>
    )
}

export default Profilestudent