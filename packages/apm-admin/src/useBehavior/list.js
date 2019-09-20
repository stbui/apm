import React from 'react';
import {
    Datagrid,
    List,
    Column,
} from 'prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column dataIndex="name">页面名称</Column>
            <Column dataIndex="address">address</Column>
            <Column dataIndex="pv">页面浏览次数(PV)</Column>
            <Column dataIndex="uv">独立访客数(UV)</Column>
        </Datagrid>
    </List>
);
