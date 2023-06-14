import React from 'react';
import { Card, Row, Col, Typography, Button, Select, Table, Input } from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from '../../ApiService';

const columns = [
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
    },
    {
        title: '15-min score',
        dataIndex: 'min_15',
        key: 'min_15'
    },
    {
        title: '45-min score',
        dataIndex: 'min_45',
        key: 'min_45'
    },
    {
        title: 'Mid-term score',
        dataIndex: 'mid',
        key: 'mid'
    },
    {
        title: 'End-term score',
        dataIndex: 'end',
        key: 'end'
    },
    {
        title: 'GPA',
        dataIndex: 'gpa',
        key: 'gpa'
    }
]

function ScoreDetails () {
    const rawQuery = window.location.search;
    const queryParams = new URLSearchParams(rawQuery);
    const idStudent = queryParams.get('idStudent');
    const year = queryParams.get('year');
    const order = queryParams.get('order');
    const [raw, setRaw] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const subjects = await ApiService.get("subjects");
            const data = await ApiService.get("subject-score/details"+rawQuery);
            const processedData = preprocessing(data, subjects);
            console.log(processedData);
            setRaw(processedData);
        };
        fetchData()
    }, []);

    const preprocessing = (data, subjects) => {
        const processedData = subjects.map((item,index) => {
            let gpa = '';
            const test_15 = data.filter((item2) =>
                item2.name === item.name && item2.testName ==="15 minutes"
            );
            const score_15 = test_15.map(item3 => item3.score).join(', ');
            const test_1 = data.filter((item2) =>
                item2.name === item.name && item2.testName ==="1 period"
            );
            const score_1 = test_1.map(item3 => item3.score).join(', ');
            const test_mid = data.filter((item2) =>
                item2.name === item.name && item2.testName ==="mid-term"
            );
            const score_mid = test_mid.map(item3 => item3.score).join(', ');
            const test_end = data.filter((item2) =>
                item2.name === item.name && item2.testName ==="end-term"
            );
            const score_end = test_end.map(item3 => item3.score).join(', ');
            try {
                gpa = test_end[0].avgScore;
            } catch (e) {
                gpa = '';
            }
            return {
                key: index,
                subject: item.name,
                min_15: score_15,
                min_45: score_1,
                mid: score_mid,
                end: score_end,
                gpa: gpa
            }
        })
        return processedData;
    }

    return (
        <div>
            <Card>
                <Row>
                    <Typography.Title level={2}>Student's ID: {idStudent}</Typography.Title>
                </Row>
                <Row>
                    <Table
                        rowClassName="custom-row"
                        dataSource={raw}
                        columns={columns}
                    />
                </Row>
            </Card>
        </div>
    )
};

export default ScoreDetails;