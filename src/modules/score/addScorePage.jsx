import React from 'react';
import { Card, Row, message, Typography, Button} from 'antd';
import '../../App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from '../../ApiService';

import SelectField from './display/selectField';
import ScoreTable from './display/scoreTable';

function AddingScore () {
    const [messageApi, contextHolder] = message.useMessage();
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semester, setSemester] = useState([]);
    const [student, setStudent] = useState([]);
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [selectedClass, setSelectedClass] = useState(4);
    const [selectedSubject, setSelectedSubject] = useState(1);
    const [selectedSemester, setSelectedSemester] = useState('1-2024');
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
            const semesterA = semestersApi.map((item,index) => {
                return {
                    key: index,
                    label: item.order + "-" +item.year,
                    value: item.order + "-" +item.year
                }
            });
            setSemester(semesterA);
            setClasses(classsA);
            setSubjects(subjectsA);
        }
        fetchFieldData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const order = selectedSemester.split('-')[0];
            const year = selectedSemester.split('-')[1];
            let rawQuery = `year=${year}&order=${order}&idClass=${selectedClass}`;
            const studentA = await ApiService.get('students/inclass?'+rawQuery);
            console.log(studentA);
            setStudent(studentA);
        };
        fetchData();
    }, [selectedClass, selectedSemester]);

    useEffect(() => {
        fetchScoreData();
    }, [student]);

    const fetchScoreData = async () => {
        const data = [];
        for (let item of student) {
            const order = selectedSemester.split('-')[0];
            const year = selectedSemester.split('-')[1];
            let query = `idStudent=${item.idStudent}&year=${year}&order=${order}`;
            const rawData = await ApiService.get('subject-score/details?'+query);
            const element = {idStudent: item.idStudent, fullName: item.fullName,scores: rawData};
            data.push(element);
        }
        console.log(data);
        setData(data);
    };


    useEffect(() => {
        let gpa = '';
        let idSTCS = undefined;
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
            const idSTCSObj = item.scores.filter((item2) => {
                return item2.idSubject === selectedSubject
            });
            try {
                idSTCS = idSTCSObj[0].idSubjectTeacherClassSemester;
            } catch (e) {
                idSTCS = undefined;
            }
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
                gpa: gpa,
                idSTCS: idSTCS
            }
            }
        )
        console.log(table);
        setTable(table);
    }, [selectedSubject, data]);

    const handleClassChange = (value) => {
        setSelectedClass(value);
    };

    const handleSubjectChange = (value) => {
        setSelectedSubject(value);
    };

    const handleSemesterChange = (value) => {
        setSelectedSemester(value);
    }

    const handleButtonClick = async () => {
        const order = selectedSemester.split('-')[0];
        const year = selectedSemester.split('-')[1];
        const progressQuery = `year=${year}&order=${order}&idClass=${selectedClass}`;
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
        if (status === 'success') {
            messageApi.open({
                type: 'success',
                content: 'Updating scores successfully',
              });
        }
        setTimeout(() => {
            fetchScoreData();
          },500);
    }

    return (
        <>
        {contextHolder}
            <Card>
                <Row>
                    <Typography.Title level={2}>Title</Typography.Title>
                </Row>
                <SelectField
                    selectedClass={selectedClass}
                    classes={classes}
                    selectedSubject={selectedSubject}
                    subjects={subjects}
                    handleClassChange={handleClassChange}
                    selectedSemester={selectedSemester}
                    semester={semester}
                    handleSemesterChange={handleSemesterChange}
                    handleSubjectChange={handleSubjectChange}
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