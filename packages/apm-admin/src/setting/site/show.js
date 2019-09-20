import React from 'react';
import { Show } from 'prophet-antd';
import { Row, Col } from 'antd';

const Text = ({ name, label, record }) => (
  <Row>
    <Col span={4}>{label}: </Col>
    <Col span={20}>{record[name]}</Col>
  </Row>
);

const Layout = ({ children, basePath, resource, record }) =>
  React.Children.map(children, field =>
    React.cloneElement(field, { basePath, resource, record })
  );

export const UsersShow = props => (
  <Show {...props}>
    <Layout>
      <Text name="username" label="用户名" />
      <Text name="password" label="密码" />
      <Text name="nickname" label="昵称" />
      <Text name="role" label="角色" />
      <Text name="email" label="邮箱" />
    </Layout>
  </Show>
);

export default UsersShow;
