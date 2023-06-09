import { Card, Row, Col, Typography, Button, Select, Table, Input } from 'antd';
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
    return (
        <Row>
            <Table
                rowClassName="custom-row"
                dataSource={props.table}
                columns={columns}
            />
        </Row>
    )
};

export default ScoreTable;