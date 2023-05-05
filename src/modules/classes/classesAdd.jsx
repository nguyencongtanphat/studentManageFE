import React from "react";
import {
  Table,
  Select,
  Card,
  Typography,
  Space,
  Button,
  AutoComplete,
} from "antd";

function classesAdd() {
  return (
    <div>
      <Card title= "Grade Information">
        <div>
          <Space>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={() => {}}
              placeholder="Search by name"
            />
            <Select
              onChange={(value) => {}}
              defaultValue={"Select year"}
              options={[
                {
                  label: "2010-2011",
                  value: "2010-2011",
                },
                {
                  label: "2011-2012",
                  value: "2011-2012",
                },
                {
                  label: "2012-2013",
                  value: "2012-2013",
                },
                {
                  label: "2013-2014",
                  value: "2013-2014",
                },
                {
                  label: "2014-2015",
                  value: "2014-2015",
                },
                {
                  label: "2015-2016",
                  value: "2015-2016",
                },
                {
                  label: "2016-2017",
                  value: "2016-2017",
                },
                {
                  label: "2017-2018",
                  value: "2017-2018",
                },
                {
                  label: "2018-2019",
                  value: "2018-2019",
                },
                {
                  label: "2019-2020",
                  value: "2019-2020",
                },
                {
                  label: "2020-2021",
                  value: "2020-2021",
                },
                {
                  label: "2021-2022",
                  value: "2021-2022",
                },
                {
                  label: "2022-2023",
                  value: "2022-2023",
                },
              ]}
            ></Select>
            <Button htmlType="search" type="primary">
              Search
            </Button>
          </Space>
        </div>
        <Table
          columns={[
            {
                title: "#",
            },
            {
                title: "Class",
            },
            {
                title: "Nop",
            },
            {
                title: "Teacher",
            },
            {
                title: "Year",
            },
          ]}
          pagination={{
            pageSize: 7,
          }}
        ></Table>
      </Card>
    </div>
  );
}

export default classesAdd;