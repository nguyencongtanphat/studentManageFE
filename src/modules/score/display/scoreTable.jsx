import { Card, Row, Col, Typography, Button, Table, Input, Modal } from 'antd';
import { useState } from 'react';
import '../../../App.css';

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
        title: '15-minutes score',
        dataIndex: 'min_15',
        key: 'min_15'
    },
    {
        title: '45-minutes score',
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
];

const ScoreTable = (props) => {
    const [visible, setVisible] = useState(false);
    const [row, setRow] = useState({});
    const [score15, setScore15] = useState('');
    const [score1, setScore1] = useState('');
    const [scoreMid, setScoreMid] = useState('');
    const [scoreEnd, setScoreEnd] = useState('');

    const inputCheck = (str) => {
        let count = 0;
        const arr = str.split(',');
        console.log(arr);
        if (arr === ['']) {
            return true;
        }
        for (let i = 0; i < arr.length; i++) {
            const element = parseFloat(arr[i]);
            console.log(props.minScore);
            if (Number.isInteger(element)) {
              if (element >= props.minScore.current && element <= props.maxScore.current) {
                    count++;
                } 
            } else {
              return false;
            }
        }
        if (count === arr.length) {
            return true;
        }
        return false;
    }
        

    const handleOk = () => {
        console.log('oke');
        if (inputCheck(score15)) {
            if (inputCheck(score1)) {
                if (inputCheck(scoreMid)) {
                    if (inputCheck(scoreEnd)) {
                        let tempTable = props.table;
                        tempTable.forEach((item) => {
                            if (item.key === row.key) {
                                item.min_15 = score15;
                                item.min_45 = score1;
                                item.mid = scoreMid;
                                item.end = scoreEnd;
                            }
                        });
                        props.setTable(tempTable);
                        setVisible(false);
                    }
                    else {
                        props.messageApi.open({
                            type: 'error',
                            content: 'Please following the input format.',
                          });
                    }
                }
                else {
                    props.messageApi.open({
                        type: 'error',
                        content: 'Please following the input format.',
                      });
                }
            }
            else {
                props.messageApi.open({
                    type: 'error',
                    content: 'Please following the input format.',
                  });
            }
        }
        else {
            props.messageApi.open({
                type: 'error',
                content: 'Please following the input format.',
              });
        }
    };
    
    const handleCancel = () => {
        setVisible(false);
    };

    const handleRowClick = (record) => {
        setScore15(record.min_15);
        setScore1(record.min_45);
        setScoreMid(record.mid);
        setScoreEnd(record.end); 
        setRow(record);
        console.log(record);
        setVisible(true);
    };

    const handle15Change = (event) => {
        setScore15(event.target.value);
    };

    const handle1Change = (event) => {
        setScore1(event.target.value);
    };

    const handleMidChange = (event) => {
        setScoreMid(event.target.value);
    };

    const handleEndChange = (event) => {
        setScoreEnd(event.target.value);
    };

    return (
        <Row>
            <Table
                rowClassName="custom-row"
                dataSource={props.table}
                columns={columns}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record)
                })}
            />

            <Modal
                open={visible}
                title="Update Score"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Card>
                    <Row>
                        <Typography>15-mins scores</Typography>
                        <Input
                            value={score15}
                            onChange={handle15Change}
                        />
                    </Row>
                    <Row>
                        <Typography>45-mins scores</Typography>
                        <Input
                            value={score1}
                            onChange={handle1Change}
                        />
                    </Row>
                    <Row>
                        <Typography>Mid-term scores</Typography>
                        <Input
                            value={scoreMid}
                            onChange={handleMidChange}
                        />
                    </Row>
                    <Row>
                        <Typography>End-term scores</Typography>
                        <Input
                            value={scoreEnd}
                            onChange={handleEndChange}
                        />
                    </Row>
                </Card>
            </Modal>
        </Row>
    )
};

export default ScoreTable;