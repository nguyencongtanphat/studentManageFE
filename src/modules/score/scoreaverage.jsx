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
    const [inputName, setInputName] = useState('');
    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiService.get("subject-score/scores");
            const semesters = await ApiService.get("semesters");
            let yearA = semesters.map((item) => {
                return item.year;
            });
            const uniqueYear = yearA.filter((value, index, self) => {
                return self.indexOf(value) === index;
              });
            yearA = uniqueYear.map((item,index) => {
                return {
                    key: index,
                    label: item,
                    value: item
                }
            });
            let orderIs1 = data.filter((item)=> item.order === 1);
            let processedData = preprocessing(orderIs1, data);
            setRaw(processedData);
            setFiltered(processedData);
            setYear(yearA);
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

    const handleSearch = (valueName,valueYear,data) => {
        console.log(valueName, valueYear);
        let newData;
        if (valueName !== '' && valueYear !== '') {
            newData = data.filter((item) => {
                return String(item.fullName) === valueName && String(item.year) === String(valueYear);
            });
        }
        else if (valueName !== '' && valueYear === '') {
            newData = data.filter((item) => {
                return String(item.fullName) === valueName;
            });
        }
        else if (valueName === '' && valueYear !== '') {
            newData = data.filter((item) => {
                return String(item.year) === String(valueYear);
            });
        }
        else {
            newData = data;
        }
         setFiltered(newData);
    };

    const handleYearChange = (value) => {
        setSelectedYear(value);
    }

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
                            placeholder='Searching name ...' 
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Select
                            style={{ width: 140 }}
                            options={year}
                            onChange={handleYearChange}
                        />
                    </Col>
                    <Col>
                        <Button
                            type='primary'
                            onClick={() => handleSearch(inputName,selectedYear,raw)}
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