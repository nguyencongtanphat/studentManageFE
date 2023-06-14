import React, { useEffect } from "react";
import ApiService from "../../ApiService";
import {useState} from "react";
import {
    Card,
    Typography,
    Space,
    Input,
    Select,
    Button,
    Form,
    Row,
    Col,
    Divider,
    Modal,
  } from "antd";

  import "./rules.module.css"

  function ChangeRules () {
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);

    const fetchData = async () => {
        const results = await ApiService.get("parameters");
        console.log("fetch result", results);
        form.setFieldsValue({
            minage: parseInt(results[0]["value"]),
            maxage: parseInt(results[1]["value"]),
            maxquan: parseInt(results[2]["value"]),
            subjectpassingscore: parseFloat(results[3]["value"]),
            passingscore: parseFloat(results[4]["value"]),
            minscore: parseFloat(results[5]["value"]),
            maxscore: parseFloat(results[6]["value"]),
        })
    };

    const onFinish = (values) => {
        const updateData = async () => {
            const data = {
                "minage" : parseInt(form.getFieldValue("minage")),
                "maxage" : parseInt(form.getFieldValue("maxage")),
                "maxquan" : parseInt(form.getFieldValue("maxquan")),
                "subjectpassingscore" : parseFloat(form.getFieldValue("subjectpassingscore")),
                "passingscore" : parseFloat(form.getFieldValue("passingscore")),
                "minscore" : parseFloat(form.getFieldValue("minscore")),
                "maxscore" : parseFloat(form.getFieldValue("maxscore")),
            };
            const results = await ApiService.put("parameters/update", data);
            console.log("data sended: ", data);
            return results;
        };
        
        if(editMode === true) {
            const temp = async () => {
                console.log("send data");
                const results = await updateData(); 
                if (results.status == 200){
                    Modal.success({
                        title: "Success",
                        content: "Update rule successfully",
                        okText: "OK",
                        onOk() {},
                    });
                }
                else{
                    Modal.success({
                        title: "Error",
                        content: "Update rule failed",
                        okText: "OK",
                        onOk() {},
                    });
                }
                await fetchData();
            }
            temp();
        }
        setEditMode(!editMode);
    }
    useEffect(() => {
        const fetchData = async () => {
            const results = await ApiService.get("parameters");
            console.log(results);
            form.setFieldsValue({
                minage: parseInt(results[0]["value"]),
                maxage: parseInt(results[1]["value"]),
                maxquan: parseInt(results[2]["value"]),
                subjectpassingscore: parseFloat(results[3]["value"]),
                passingscore: parseFloat(results[4]["value"]),
                minscore: parseFloat(results[5]["value"]),
                maxscore: parseFloat(results[6]["value"]),
            })
        };
        fetchData();
    },[]);

    const intValidator = (value, minVal, maxVal) =>{

    }
    return (
        <Card title="Edit Rules">
            <Form onFinish={onFinish} form={form}>
            <div></div>
                <Row gutter={128}>
                    <Col span={8} >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                className="form-item"
                                label="Minimum Age:"
                                name="minage"
                                labelAlign="left"
                                labelCol= {{span: 20, }}
                                wrapperCol={{span: 20,}}
                                style={{fontWeight:'bold', flex: false}}
                                rules={[
                                    { required: editMode, message: 'Please enter minimum age'},
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if( parseInt(value)){
                                                let i = parseInt(value);
                                                if(i > 150 || i < 10) return Promise.reject(new Error('[10,150]'));
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                        
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{ textAlign:'center'}} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Maximum Age:"
                                labelAlign="left"
                                labelCol= {{span: 20, }}
                                style={{fontWeight:'bold'}}
                                name="maxage"
                                rules={[{ 
                                    required: editMode, message: 'Please enter maximum age' },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if( parseInt(value)){
                                                let i = parseInt(value);
                                                if(i > 150 || i < 10) return Promise.reject(new Error('[10,150]'));
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{textAlign:'center'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Maximum Quantity:"
                                name="maxquan"
                                labelAlign="left"
                                labelCol= {{span: 20, }}
                                style={{fontWeight:'bold'}}
                                rules={[
                                    { required: editMode, message: 'Please enter maximum quantity' },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if( parseInt(value)){
                                                let i = parseInt(value);
                                                if(i > 50 || i < 20) return Promise.reject(new Error('[20,50]'));
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{textAlign:'center'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Maximum Score:"
                                name="maxscore"
                                labelAlign="left"
                                labelCol= {{span: 20, }}
                                style={{fontWeight:'bold'}}
                                rules={[
                                    { required: editMode, message: 'Please enter maximum score' },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if (!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if (parseFloat(value) < 0) return Promise.reject(new Error('must >0'))
                                            if( parseFloat(value) === 0.0 || parseFloat(value)){
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{textAlign:'center'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    </Col>
                    <Col span={8}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Subject Passing Score:"
                                name="subjectpassingscore"
                                labelAlign="left"
                                labelCol= {{span: 20, }}
                                style={{fontWeight:'bold'}}
                                rules={[
                                    { required: editMode, message: 'Please enter subject passing score' },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if (parseFloat(value) < 0) return Promise.reject(new Error('must >0'))
                                            if( parseFloat(value) === 0.0 || parseFloat(value)){
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{textAlign:'center'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Passing Score:"
                                name="passingscore"
                                labelAlign="left"
                                style={{fontWeight:'bold'}}
                                labelCol= {{span: 20, }}
                                rules={[
                                    { required: editMode, message: 'Please enter passing score' },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if (parseFloat(value) < 0) return Promise.reject(new Error('must >0'))
                                            if( parseFloat(value) === 0.0 || parseFloat(value)){
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{textAlign:'center'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Minimum Score:"
                                name="minscore"
                                labelAlign="left"
                                labelCol= {{span: 20, }}
                                style={{fontWeight:'bold'}}
                                rules={[
                                    { required: editMode, message: 'Please enter minimum score' },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!editMode) return Promise.resolve();
                                            if (value.length > 0 && isNaN(value)) return Promise.reject(new Error('must type number'))
                                            if (parseFloat(value) < 0) return Promise.reject(new Error('must >0'))
                                            if( parseFloat(value) === 0.0 || parseFloat(value)){
                                                return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }
                                    }),
                                ]}
                            >
                                <Input disabled = {!editMode} style={{textAlign:'center'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                {editMode? 
                    (<Form.Item>
                        <div style={{textAlign:'right', width: '63%'}}>  
                            <Button type="primary" danger  htmlType="submit">Save</Button>
                        </div>  
                    </Form.Item>)
                    :(
                    <Form.Item>
                        <div style={{textAlign:'right', width: '63%'}}>
                            <Button type='primary' htmlType="submit">Edit</Button>
                        </div> 
                    </Form.Item>)
                }
                
            </Form>
        </Card>
    )
  };

  export default ChangeRules;