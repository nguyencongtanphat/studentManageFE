import { Card, Row, Col, Typography, Button, Select, Table, Input } from 'antd';
import '../../../App.css';

const SelectField = (props) => {
    return (
        <Row>
            <Select
                defaultValue={props.selectedClass}
                style={{ width: 100 }}
                options={props.classes}
                onChange={props.handleClassChange}
            />
            <Select
                defaultValue={props.selectedSubject}
                style={{ width: 140 }}
                options={props.subjects}
                onChange={props.handleSubjectChange}
            />
            <Select
                defaultValue={props.selectedYear}
                style={{ width: 100 }}
                options={props.year}
                onChange={props.handleYearChange}
            />
            <Select
                defaultValue={props.selectedOrder}
                style={{ width: 50 }}
                options={props.order}
                onChange={props.handleOrderChange}
            />
        </Row>
    )
};

export default SelectField;