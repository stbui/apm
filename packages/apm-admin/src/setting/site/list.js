import React from 'react';
import {
    Datagrid,
    List,
    Column,
    EditButton,
    ShowButton,
    DeleteButton,
} from 'prophet-antd';
import { Divider } from 'antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column dataIndex="id">站点ID</Column>
            <Column dataIndex="username">站点名称</Column>
            <Column dataIndex="nickName">站点类型</Column>
            <Column dataIndex="nickName">创建时间</Column>
            <Column dataIndex="address_id">创建人</Column>
            <Column
                render={record => (
                    <React.Fragment>
                        <EditButton
                            label="编辑"
                            id={record.id}
                            resource={props.resource}
                            basePath={props.basePath}
                        />
                        <Divider type="vertical" />
                        <ShowButton
                            label="详情"
                            id={record.id}
                            resource={props.resource}
                            basePath={props.basePath}
                        />
                        <Divider type="vertical" />
                        <DeleteButton
                            label="删除"
                            id={record.id}
                            resource={props.resource}
                            basePath={props.basePath}
                        />
                    </React.Fragment>
                )}
            >
                操作
            </Column>
        </Datagrid>
    </List>
);
