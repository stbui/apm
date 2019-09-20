import React from 'react';
import {
    Datagrid,
    List,
    Column,
} from 'prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column dataIndex="username">日期</Column>
            <Column dataIndex="url">URL</Column>
            <Column dataIndex="uv">独立访客数(UV)</Column>
            <Column dataIndex="pv">页面浏览次数(PV)</Column>
            <Column dataIndex="visit">访问次数</Column>
            <Column dataIndex="avgDepth">人均访问深度</Column>
            <Column dataIndex="avgTime">人均访问时长(s)</Column>
            <Column dataIndex="skipRatio">跳出率</Column>
        </Datagrid>
    </List>
);
