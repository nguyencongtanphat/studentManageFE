import React from 'react';
import { Card, Row, Col, Typography, Button} from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from '../../ApiService';

import SelectField from './display/selectField';
import ScoreTable from './display/scoreTable';

function AddingScore () {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [year, setYears] = useState([]);
    const [order, setOrder] = useState([]);
    const [student, setStudent] = useState([]);
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [selectedClass, setSelectedClass] = useState(4);
    const [selectedSubject, setSelectedSubject] = useState(1);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedOrder, setSelectedOrder] = useState(1);
    useEffect(() => {
        const fetchFieldData = async () => {
            const classesApi = await ApiService.get('classes');
            const subjectsApi = await ApiService.get('subjects');
            const semestersApi = await ApiService.get('semesters');
            const classsA = classesApi.map((item,index) => {
                return {
                    key: index,
                    label: item.name,
                    value: item.idClass,
                }
            });
            const subjectsA = subjectsApi.map((item,index) => {
                return {
                    key: index,
                    label: item.name,
                    value: item.idSubject
                }
            });
            const yearA = semestersApi.map((item,index) => {
                return {
                    key: index,
                    label: item.year,
                    value: item.year
                }
            });
            setClasses(classsA);
            setSubjects(subjectsA);
            setYears(yearA);
            setOrder([{label: 'I', value: 1}, {label: 'II', value: 2}]);
        }
        fetchFieldData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let rawQuery = `year=${selectedYear}&order=${selectedOrder}&idClass=${selectedClass}`;
            const studentA = await ApiService.get('students/inclass?'+rawQuery);
            console.log(studentA);
            setStudent(studentA);
        };
        fetchData();
    }, [selectedClass, selectedOrder, selectedYear]);

    useEffect(() => {
        const data = [];
        const fetchData = async () => {
            for (let item of student) {
                let query = `idStudent=${item.idStudent}&year=${selectedYear}&order=${selectedOrder}`;
                const rawData = await ApiService.get('subject-score/details?'+query);
                const element = {idStudent: item.idStudent, fullName: item.fullName,scores: rawData};
                data.push(element);
            }
            setData(data);
        };
        fetchData();
    }, [student]);

    useEffect(() => {
        let gpa = '';
        const table = data.map((item, index) => {
            const test_15 = item.scores.filter((item2) => {
                return item2.idSubject === selectedSubject && item2.testName === '15 minutes';
            });
            const score_15 = test_15.map(item3 => item3.score).join(',');
            const test_1 = item.scores.filter((item2) => {
                return item2.idSubject === selectedSubject && item2.testName === '1 period';
            });
            const score_1 = test_1.map(item3 => item3.score).join(',');
            const test_mid = item.scores.filter((item2) => {
                return item2.idSubject === selectedSubject && item2.testName === 'mid-term';
            });
            const score_mid = test_mid.map(item3 => item3.score).join(',');
            const test_end = item.scores.filter((item2) => {
                return item2.idSubject === selectedSubject && item2.testName === 'end-term';
            });
            const score_end = test_end.map(item3 => item3.score).join(',');
            try {
                gpa = test_end[0].avgScore;
            } catch (e) {
                gpa = '';
            };
            return {
                key: index,
                idStudent: item.idStudent,
                fullName: item.fullName,
                min_15: score_15,
                min_45: score_1,
                mid: score_mid,
                end: score_end,
                gpa: gpa
            }
            }
        )
        console.log(table);
        setTable(table);
    }, [selectedSubject, data]);

    const handleClassChange = (value) => {
        setSelectedClass(value);
    };

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    const handleSubjectChange = (value) => {
        setSelectedSubject(value);
    };

    const handleOrderChange = (value) => {
        setSelectedOrder(value);
    };

    const handleButtonClick = async () => {
        const progressQuery = `year=${selectedYear}&order=${selectedOrder}&idClass=${selectedClass}`;
        const progressApi = await ApiService.get('students/progress?'+progressQuery);
        const result = progressApi.map((item) => {
            let temp;
            table.forEach((item2) => {
                if (item.idStudent === item2.idStudent) {
                    temp = {
                        idStudentProgress: item.idStudentProgress,
                        1: !item2.min_15 ? [] : item2.min_15.split(','),
                        2: !item2.min_45 ? [] : item2.min_45.split(','),
                        3: !item2.mid ? [] : item2.mid.split(','),
                        4: !item2.end ? [] : item2.end.split(',')
                    }
                    console.log(temp.idStudentProgress);
                }
            });
            return temp;
        });
        const body = {idSubject: selectedSubject, result: result}
        const status = await ApiService.post('subject-score/details', body);
        console.log(body);
    }

    return (
        <>
            <Card>
                <Row>
                    <Typography.Title level={2}>Title</Typography.Title>
                </Row>
                <SelectField
                    selectedClass={selectedClass}
                    classes={classes}
                    selectedSubject={selectedSubject}
                    subjects={subjects}
                    selectedYear={selectedYear}
                    year={year}
                    selectedOrder={selectedOrder}
                    order={order}
                    handleClassChange={handleClassChange}
                    handleYearChange={handleYearChange}
                    handleSubjectChange={handleSubjectChange}
                    handleOrderChange={handleOrderChange}
                />
                <ScoreTable
                    table={table}
                    setTable={setTable}
                    data={data}
                    selectedSubject={selectedSubject}
                />
                <Button
                    type='primary'
                    onClick={handleButtonClick}
                >
                    Save
                </Button>
            </Card>
        </>
    );
};

export default AddingScore;