import React from 'react'
import {Form, Button, Input, Icon} from 'antd';
const { TextArea } = Input
const Editor = ({userIsLogin, onChange, onSubmit, submitting, value }) => (
  <Form onSubmit={(ev) => ev.preventDefault()}>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} disabled={!userIsLogin} type="primary">
        <Icon type="edit" />
        Добавить комментарий
      </Button>
    </Form.Item>
  </Form>
)
export default Editor
