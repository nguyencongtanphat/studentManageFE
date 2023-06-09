import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table, Input } from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from '../../ApiService';

const columns = [
    {
        title: 'ID',
        dataIndex: 'idStudent',
        key: 'idStudent'
    },
    {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'fullName'
    },
    {
        title: 'Class',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Semester',
        dataIndex: 'semester',
        key: 'semester'
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year'
    },
    {
        title: '1st Semester Score',
        dataIndex: 'semAvg1',
        key: 'semAvg1'
    },
    {
        title: '2nd Semester Score',
        dataIndex: 'semAvg2',
        key: 'semAvg2'
    }
]

function ScoreAverage() {
    let navigate = useNavigate();
    const [raw, setRaw ] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [inputID, setInputID] = useState('');
    const [inputYear, setInputYear] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiService.get("subject-score/scores");
            let orderIs1 = data.filter((item)=> item.order === 1);
            let processedData = preprocessing(orderIs1, data);
            setRaw(processedData);
            setFiltered(processedData);
        };

        fetchData()
    }, []);

    const preprocessing = (data, rawData) => {
        let count = 0;
        const returnData = [];
        const processedData = data.map((item,index,array) => {
            let matchedYear = rawData.filter((item2) => 
                item2.year === item.year && item2.idStudent === item.idStudent && item.order !== item2.order
            );
            
            if (matchedYear.length === 0)
                return {
                    idStudent: item.idStudent,
                    fullName: item.fullName,
                    name: item.name,
                    semester: item.order,
                    year: item.year,
                    semAvg1: item.avgSemScore,
                    semAvg2: undefined,
                }
            else {
                return [
                    {
                        idStudent: item.idStudent,
                        fullName: item.fullName,
                        name: item.name,
                        semester: item.order,
                        year: item.year,
                        semAvg1: item.avgSemScore,
                        semAvg2: matchedYear[0].avgSemScore,
                    },
                    {
                        idStudent: item.idStudent,
                        fullName: item.fullName,
                        name: matchedYear[0].name,
                        semester: matchedYear[0].order,
                        year: item.year,
                        semAvg1: item.avgSemScore,
                        semAvg2: matchedYear[0].avgSemScore,
                    }
                ]
            }
        })
        processedData.forEach((item) => {
            if (item.length !== 2)
                returnData.push({key: ++count, ...item});
            else {
                returnData.push({key: ++count, ...item[0]});
                returnData.push({key: ++count, ...item[1]});
            }
        })
        return returnData;
    };

    const handleSearch = (valueID,valueYear,data) => {
        let newData;
        if (valueID !== '' && valueYear !== '') {
            newData = data.filter((item) => {
                return String(item.idStudent) === valueID && String(item.year) === valueYear;
            });
            console.log(newData);
        }
        else if (valueID !== '' && valueYear === '') {
            newData = data.filter((item) => {
                return String(item.idStudent) === valueID;
            });
        }
        else if (valueID === '' && valueYear !== '') {
            newData = data.filter((item) => {
                return String(item.year) === valueYear;
            });
        }
        else {
            newData = data;
        }
         setFiltered(newData);
    };

    const handleRowClick = (record) => {
        let url = `details?idStudent=${record.idStudent}&year=${record.year}&order=${record.semester}`;
        navigate(url);
    }

    return (
        <div>
            <Card>
                <Row>
                    <Typography.Title level={2}>Score Average</Typography.Title>
                </Row>
                <Row>
                    <Col>
                        <Input
                            placeholder='Searching ID ...' 
                            value={inputID}
                            onChange={(e) => setInputID(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Input
                            placeholder='Searching year ...' 
                            value={inputYear}
                            onChange={(e) => setInputYear(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button
                            type='primary'
                            onClick={() => handleSearch(inputID,inputYear,raw)}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Table
                        rowClassName="custom-row"
                        dataSource={filtered}
                        columns={columns}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record)
                        })}
                    />
                </Row>
            </Card>
        </div>
    );
};

export default ScoreAverage;