import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table, Input } from 'antd';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
const {Text, Link} = Typography;

function AddStudentToclass(){
    const [ flag, setFlag ] = useState(true);
    console.log('re-render');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname == '/printstudentlist') {
            setFlag(true);
            console.log('print student list page');
        }
    }, [location.pathname]);
    return (
        <>
            {flag && <PrintStudentList flag={flag} setFlag={setFlag}/>}
            {!flag && <Outlet/>}
        </>
    )
}

export default AddStudentToclass;

const classOptions = [
    {
        label: '10A1',
        value: 1
    },
    {
        label: '10A2',
        value: 2
    },
    {
        label: '10A3',
        value: 3
    }
]
const dataSource = [
    {
        id: '1',
        Name: 'Nguyen Van A',
        Gender: 'Nam',
        Birthday: '10/3/2002',
        Address: "10/4 Nguyen Hue"
    },
    {
        id: '2',
        Name: 'Nguyen Thi B',
        Gender: 'Nu',
        Birthday: '20/6/2004',
        Address: "10/4 Dong Dang"
    },
    {
        id: '3',
        Name: 'Tran Nguyen C',
        Gender: 'Nam',
        Birthday: '10/3/2002',
        Address: "30/4 Nguyen Hue"
    },
      
]
const columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        flex: 1,
        //render: (text) => <span style={{ backgroundColor: '#ffcc00', color: '#3475fc' }}>{text}</span>,
    },
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        flex: 1,
        //render: (text) => <span style={{ backgroundColor: '#ffcc00', color: '#3475fc' }}>{text}</span>,
    },
    {
        title: 'Gender',
        dataIndex: 'Gender',
        key: 'Gender',
        flex: 1,
        //render: (text) => <span style={{ backgroundColor: '#ffcc00', color: '#3475fc' }}>{text}</span>,
    },
    {
        title: 'Birthday',
        dataIndex: 'Birthday',
        key: 'Birthday',
        flex: 1,
        //render: (text) => <span style={{ backgroundColor: '#ffcc00', color: '#3475fc' }}>{text}</span>,
    },
    {
        title: 'Address',
        dataIndex: 'Address',
        key: 'Address',
        flex: 1,
        //render: (text) => <span style={{ backgroundColor: '#ffcc00', color: '#3475fc' }}>{text}</span>,
    },
]

function PrintStudentList(props){

    const navigate = useNavigate();
    const { Title } = Typography;
    const [ filteredData, setFilteredData ] = useState(dataSource);
    const [ numPupils, setNumPupils ] = useState('');
    const classes = useRef([]);
    

    const handleClassesChange = (values) => {
        const idClassesArr = [];
            for (let i = 0; i < classOptions.length; i++) {
                for (let j = 0; j < values.length; j++) {
                    if (classOptions[i].value === values[j])
                        idClassesArr.push(classOptions[i].label);
            }
        }
        classes.current = idClassesArr;
    };
    const handleNumsPupilsChange = (values) => {
        setNumPupils(values.target.value);
    };
    // const handleCheckClick = (classes) => {
    //     let filtered = []
    //     if (classes.current.length === 0) {
    //     filtered = dataSource;
    //     }
    //     else {
    //         filtered = dataSource.filter(
    //             (record) =>
    //                 classes.current.includes(record.name)
    //         );
    //     }
    //     if( numPupils === 0 || numPupils > filtered.length) setFilteredData(filtered);
    //     else setFilteredData(filtered.slice(0, numPupils));
    // }
    const handleRowClick = () => {
        navigate('/classes/id');
        props.setFlag(!props.flag);
    }
    return(
        <div>
            <Card>
                <Row>
                    <Col flex={9} >
                    <Title level={3} style={{ margin: 0, padding: 0}}>Add student to class</Title>
                    </Col>
                </Row> 
                <CheckStudent
                onNumsPupilsChange={handleNumsPupilsChange}
                numPupils={numPupils}
                />
                <StudentListTable
                filteredData={filteredData}
                columns={columns}
                handleRowClick={handleRowClick} 
                />
                <Row style={{ display:'flex', justifyContent: 'flex-end'}}>
                    <Button type= 'primary'>Edit</Button>
                </Row>
                
            </Card>
        </div>
    )
}
function CheckStudent(props){
    return(
        <Row style={{ marginTop: 9, marginBottom: 9, display: 'flex', alignItems: 'center'}}>
            
            <Col flex={10}>
                <Row style={{display: 'flex', alignItems: 'center', flexGrow: 1, height : '100%'}}>
                    <Input
                    mode="tags"
                    style={{ width: '20%' , marginLeft: 10, height: '100%'}}
                    value={props.numPupils}
                    placeholder="Search by name.."
                    onChange={props.onNumsPupilsChange}
                    />
                </Row>           
            </Col>
            <Col flex={10}>
                <Row style={{display: 'flex', alignItems: 'center', flexGrow: 1, height : '100%'}}>
                    <Button
                        type='primary'
                        className='Button'
                        onClick={() => props.onSearchingClick(props.classes)}
                        >
                        SEARCH
                    </Button>
                </Row>           
            </Col>
            
        </Row>
    );
}

function StudentListTable(props) {
    return (
        <Row style={{ display: 'flex' }}>
            <Table
            style={{ width: '90%' }}
            rowClassName="custom-row"
            dataSource={props.filteredData}
            columns={props.columns}
            onRow={(record) => ({
                onClick: () => props.handleRowClick(record)
            })}
            />
        </Row>
    )
}