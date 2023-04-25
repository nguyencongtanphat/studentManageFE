import React from 'react'
import { 
    Table, 
    Select, 
    Card, 
    Typography, 
    Space,
    Button,
    AutoComplete
} from 'antd'
import style from './Allstudent.module.css'

const { Title } = Typography;
const { Meta } = Card;
function Allstudent() {
  return (
    <div className={style.Allstudent}>
        <Typography.Title level={3}>Home {'>'} Students Data </Typography.Title>
        <Space>
            <Card>
            <Typography.Title level={4}>All Student Data</Typography.Title>
            <div className={style.selectClass}>
                <Space wrap>
                    <AutoComplete
                        style={{ width: 200 }}
                        onSearch={() => {}}
                        placeholder="Search by name"
                    />
                    <Select
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
                    <Button htmlType='search' type='primary'>Search</Button>
                </Space>
            </div>
                <Table columns={[
                    {
                        title: "ID",
                    },
                    {
                        title: "Name",
                    },
                    {
                        title: "Class",
                    },
                ]}
                pagination ={{
                    pageSize: 7,
                }}
                ></Table>
            </Card>
        </Space>
    </div>
  )
}

export default Allstudent