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
    Divider
  } from "antd";

  import style from "./rules.module.css"

  function ChangeRules () {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
    }

    return (
        <Card title="Edit Rules">
            <Row gutter={16}>
                <Col span={8}>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{margin: 0}}>Minimum Age:</Typography.Title>
                    </Row>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{ margin: 0}}>Maximum Age:</Typography.Title>
                    </Row>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{ margin: 0}}>Maximum Quantity:</Typography.Title>
                    </Row>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{ margin: 0}}>Subject Passing Score:</Typography.Title>
                    </Row>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{ margin: 0}}>Passing Score:</Typography.Title>
                    </Row>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{ margin: 0}}>Minimum Score:</Typography.Title>
                    </Row>
                    <Row style={{ paddingBottom: 15 }}>
                        <Typography.Title level={5} style={{ margin: 0}}>Maximum Score:</Typography.Title>
                    </Row>
                </Col>
                <Col span={2}>
                    <Form onFinish={onFinish} form={form}>
                        <Form.Item name={"minage"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item name={"maxage"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item name={"maxquan"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item name={"subscore"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item name={"passscore"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item name={"minscore"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item name={"maxscore"} style={{margin: 0, paddingBottom: 4}}>
                            <Input size="medium" />
                        </Form.Item>
                        <Form.Item style={{margin: 0, paddingBottom: 4}}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>                        
                    </Form>                  
                </Col>
                <Divider type="vertical"/>
                <Col span={13}>
                    <Row style={{ marginBottom: 15 }}>
                        <Typography.Title
                            level={5}
                            style={{ marginRight: 8, marginLeft: 0, marginTop: 0, marginBottom: 0}}
                        >
                            Grade 10:
                        </Typography.Title>
                        
                    </Row>
                    <Row style={{ marginBottom: 15 }} className={style.fillcolor}>
                        ddfdf
                    </Row>
                    <Row style={{ marginBottom: 15 }} className={style.fillcolor}>
                        ddfdf
                    </Row>
                </Col>
            </Row>
            <Divider />
            <Row className={style.fillcolor}>
                Button
            </Row>
        </Card>
    )
  };

  export default ChangeRules