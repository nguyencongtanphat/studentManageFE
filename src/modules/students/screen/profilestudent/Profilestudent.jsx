import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Alert from 'antd';
import dayjs from 'dayjs';
import ApiService from '../../../../ApiService';

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
import CompoundedSpace from 'antd/es/space';
const { Title } = Typography;

function Profilestudent () {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [editButton, setEditButton] = useState(true);
    const [student, setStudent] = useState({}); 
    const [form] = Form.useForm()

    const {id} = useParams();
    const requrl = "students/"+id;

    useEffect(() => {
        const fetchData = async () => {
        try {
            console.log(requrl);
            const resultStudent = await ApiService.get(requrl);
            const tempStudent = {
                key: resultStudent.idStudent,
                name: resultStudent.fullName,
                class: resultStudent.name,
                address: resultStudent.address,
                birth: resultStudent.dayOfBirth,
                gender: resultStudent.gender,
                email: resultStudent.Email
            };
            setStudent(tempStudent);

        } catch (e) {
            console.log("error:", e);
        }
        };
        fetchData();
    }, [id]);

    const FieldEnable = () => {
        setComponentDisabled(!componentDisabled);
        setEditButton(!editButton);
    }

    const HandleSubmit = () => {
        const {name,address,birth,gender,email} = form.getFieldsValue();
        if (!name && !address && !birth && !gender && !email)
            console.log('dien it nhat 1 thong tin di pa');
        else {
            const newStudent = {
                fullName: name ? name: student.name,
                address: address ? address: student.address,
                dayOfBirth: birth ? birth: student.birth,
                gender: gender ? gender: student.gender,
                Email: email ? email: student.email
            }
            const putStudent = async (data) => {
                const putdata = await ApiService.put(requrl, data)        
                console.log(putdata);
            }
            putStudent(newStudent);
            setComponentDisabled(!componentDisabled);
            setEditButton(!editButton);
        }
    }

    return (
        <div className={style.Addstudent}>
            <Card title= "Profile Student">
                        <Form
                            form={form}
                        >
                            <Form.Item name={"name"} label="NAME*">
                                <Input
                                    placeholder={student.name}
                                    disabled={componentDisabled}
                                />
                            </Form.Item>
                            <Form.Item name={"birth"} label="DATE OF BIRTH*">
                                <DatePicker
                                    disabled={componentDisabled}
                                    placeholder={student.birth}
                                />
                            </Form.Item>
                            <Form.Item name={"gender"} label="GENDER*">
                                <Select placeholder={student.gender} disabled={componentDisabled}>
                                    {["Nam","Nữ"].map(gender=>{
                                        return <Select.Option value={gender} key={gender}>{gender}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item name={"address"} label="ADDRESS*">
                                <Input
                                    size="medium"
                                    placeholder={student.address}
                                    disabled={componentDisabled}
                                />
                            </Form.Item>
                            <Form.Item name={"email"} label="EMAIL*">
                                <Input
                                    size="medium"
                                    placeholder={student.email}
                                    disabled={componentDisabled}
                                />
                            </Form.Item>
                                <div className={style.spaceButton}>
                                    <Space wrap>
                                        {editButton && <Button
                                            htmlType='submit'
                                            type='primary'
                                            onClick={() => {FieldEnable()}}
                                            >
                                                Edit
                                            </Button>}
                                        {!editButton && <Button
                                            htmlType='submit'
                                            type='primary'
                                            onClick={() => {HandleSubmit()}}
                                            danger
                                            >
                                                Save
                                            </Button> }
                                    </Space> 
                                </div> 
                        </Form>
            </Card>
        </div>
    );
}

export default Profilestudent