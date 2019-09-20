import React from 'react';
import { Input, Select, Radio } from 'antd';
import { Create, Form } from 'prophet-antd';

export const UsersCreate = props => (
  <Create {...props}>
    <Form {...props}>
      <Input
        label="用户名"
        name="username"
        placeholder="请输入用户名"
        rules={[
          {
            required: true,
            message: '请输入用户名!'
          }
        ]}
      />
      <Input
        label="密码"
        name="password"
        placeholder="请输入密码"
        rules={[
          {
            required: true,
            message: '请输入密码!'
          }
        ]}
      />
      <Input label="昵称" name="nickname" placeholder="请输入昵称" />
      <Select label="角色" name="role" placeholder="请选择角色">
        <Select.Option value={0}>超级管理员</Select.Option>
        <Select.Option value={1}>普通用户</Select.Option>
      </Select>
      <Input
        label="邮箱"
        name="email"
        placeholder="请输入邮箱"
        rules={[
          {
            type: 'email',
            message: '输入的不是有效邮箱!'
          }
        ]}
      />
      <Input label="手机号" name="phone" placeholder="请输入手机号" />
      <Radio.Group label="状态" name="status" initialValue={true}>
        <Radio value={true}>启用</Radio>
        <Radio value={false}>禁用</Radio>
      </Radio.Group>
    </Form>
  </Create>
);

export default UsersCreate;
