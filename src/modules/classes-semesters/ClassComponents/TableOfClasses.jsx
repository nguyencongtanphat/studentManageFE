import React from "react";
import { Row, Table } from 'antd';

function ClassesTable(props) {
    return (
        <Row style={{ display: 'flex' }}>
            <Table
            style={{ width: '90%' }}
            rowClassName="custom-row"
            dataSource={props.filteredData}
            columns={props.columns}
            onRow={(record) => ({
                onClick: () => props.handleRowClick(record)
            })}
            />
        </Row>
    )
}

export default ClassesTable;