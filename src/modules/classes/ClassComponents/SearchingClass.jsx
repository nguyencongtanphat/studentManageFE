import React from "react";
import { Row, Col, Select, Button } from 'antd';

function SearchingClasses(props) {
    return (
        <Row style={{ marginTop: 9, marginBottom: 9 }}>
            <Col flex={4}>
                <Select
                mode="tags"
                style={{ width: '70%' }}
                placeholder="Select classes ..."
                onChange={props.onClassesChange}
                options={props.selectClassOptions}
                />
            </Col>
            <Col flex={5}>
                <Select
                mode="tags"
                style={{ width: '70%' }}
                placeholder="Select years ..."
                onChange={props.onYearsChange}
                options={props.selectYearOptions}
                />
            </Col>
            <Col flex={2}>
                <Button
                type='primary'
                className='Button'
                onClick={() => props.onSearchingClick(props.classes)}
                >
                Search
                </Button>
            </Col>
        </Row>
    )
}

export default SearchingClasses;