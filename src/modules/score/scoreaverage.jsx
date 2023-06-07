import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table } from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from '../../ApiService';

const columns = [
    {
        title: 'ID',
        indexData: 'idStudent',
        key: 'idStudent'
    },
    {
        title: 'Name',
        indexData: 'fullName',
        key: 'fullName'
    },
    {
        title: 'Class',
        indexData: 'name',
        key: 'name'
    },
    {
        title: '1st Semester Score',
        indexData: 'semAvg1',
        key: 'semAvg1'
    },
    {
        title: '2nd Semester Score',
        indexData: 'semAvg2',
        key: 'semAvg2'
    }
]

const source = [
    {
        key: 1,
        idStudent: 1,
        fullName: 'sdfsdf',
        name: '11A1',
        semAvg1: 10,
        semAvg2: 9
    }
]

function ScoreAverage() {
    const [raw, setRaw] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiService.get("subject-score/scores");
            let orderIs1 = data.filter((item)=> item.order === 1);
            let processedData = preprocessing(orderIs1, data);
            setRaw(processedData);
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
                    semAvg1: item.avgSemScore,
                    semAvg2: undefined
                }
            if (item.name !== matchedYear.name) {
                return [
                    {
                        idStudent: item.idStudent,
                        fullName: item.fullName,
                        name: item.name,
                        semAvg1: item.avgSemScore,
                        semAvg2: matchedYear[0].avgSemScore
                    },
                    {
                        idStudent: item.idStudent,
                        fullName: item.fullName,
                        name: matchedYear[0].name,
                        semAvg1: item.avgSemScore,
                        semAvg2: matchedYear[0].avgSemScore
                    }
                ]
            } else {
                return {
                    idStudent: item.idStudent,
                    fullName: item.fullName,
                    name: item.name,
                    semAvg1: item.avgSemScore,
                    semAvg2: matchedYear.avgSemScore
                }
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
    }
    console.log(raw);
    return (
        <div>
            <Card>
                <Row>
                    <Typography.Title level={2}>Score Average</Typography.Title>
                </Row>
                <Row>
                    <Table 
                        dataSource={source}
                        columns={columns}
                    />
                </Row>
            </Card>
        </div>
    );
};

export default ScoreAverage;