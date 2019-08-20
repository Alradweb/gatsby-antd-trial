import React from 'react'
import { Modal, Form, Icon, Input, Button, Checkbox, Radio, Avatar } from "antd"

const importAvatars = (r) => r.keys().map(i => r(i))
const avatars = importAvatars(require.context('../../../static/avatars', false, /\.(png|jpe?g|svg)$/));

const RadioItem = ({avatar}) =>{
  return(
    <Radio value={avatar.toString()}><Avatar src={avatar} alt="Avatar" /></Radio>
  )
}

function validateControl(control, value) {
  if (!value) return false;
  switch (control){
    case 'email': return (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
    case 'name': return value.length > 3
    case 'password': return value.length >= 6
    case 'avatar': return value.length > 0
    default: return false
  }
}

class NormalLoginForm extends React.Component {
  initialState = () =>{
    if(this.formTitle === 'login'){
      return  {
        email: {
          value: '',
          touched: false,
          isValid: false
        },
        password: {
          value: '',
          touched: false,
          isValid: false
        },
        remember: true,
        avatar: avatars[0]
      }
    }
    return  {
      email: {
        value: '',
        touched: false,
        isValid: false
      },
      name: {
        value: '',
        touched: false,
        isValid: false
      },
      password: {
        value: '',
        touched: false,
        isValid: false
      },
      remember: true,
      avatar: avatars[0]
    }
  };
  state = this.initialState()

  registerHandler = ev => {
    ev.preventDefault();
    const{email, name,  password, remember, avatar} = this.state
    //console.log(email.value, password.value, remember)
    this.props.authData({
      email: email.value,
      name: name.value,
      password: password.value,
      avatar: avatar.value,
      remember
    })
    this.setState(this.initialState())
  }
  loginHandler = ev => {
    ev.preventDefault();
    const{email, password, remember, avatar} = this.state
    //console.log(email.value, password.value, remember)
    this.props.authData({
      login: true,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
      remember
    })
    this.setState(this.initialState())
  }
  handleControl = (ev) =>{
    const control = ev.target.name;
    console.log(ev.target.value)
    if(control === 'remember'){
      this.setState({
        remember: ev.target.checked
      })
      return
    }
    const newControl = {...this.state[control]}
    newControl.value = (ev.target.value).trim()
    newControl.touched = true;
    newControl.isValid = validateControl(control, ev.target.value)

    this.setState({
      [control] : newControl
    })
  }
  handleOk = () => {
    // this.setState({
    //   confirmLoading: true,
    // })
  };
  render() {
    const{email, password, remember} = this.state
    const{visible, handleModalCancel, formTitle} = this.props
    const{handleOk} = this
    const isLoginForm = formTitle === 'login'
    const emailError = email.touched && !email.isValid
    const passwordError = password.touched && !password.isValid
    //console.log('form: ', email.touched, email.isValid)

    return (
      <Modal
        title={isLoginForm ? 'Вход' : 'Регистрация'}
        visible={visible}

        //confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
      >
        <Form onSubmit={(ev)=> ev.preventDefault()} className="login-form">
          <Form.Item label="E-mail" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              name="email"
              placeholder="E-mail"
              value={email.value}
              onChange={this.handleControl}
            />
          </Form.Item>
          {
            !isLoginForm && (
              <Form.Item label="Name"
                         validateStatus={ this.state.name.touched && !this.state.name.isValid ? 'error' : ''}
                         help={ this.state.name.touched && !this.state.name.isValid || ''}
              >
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={this.state.name.value}
                  onChange={this.handleControl}
                />
              </Form.Item>
            )
          }
          <Form.Item label="Password" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              name="password"
              placeholder="Password"
              value={password.value}
              onChange={this.handleControl}
            />
          </Form.Item>
          <Form.Item label="Выберете аватар">
              <Radio.Group name="avatar" defaultValue={avatars[0]} onChange={this.handleControl}>
                {
                  avatars.map((a, idx) => <RadioItem avatar={a} key={idx}/>)
                }
              </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked={remember} name='remember' onChange={this.handleControl}>Запомнить меня</Checkbox>
            <Button onClick={isLoginForm ? this.loginHandler : this.registerHandler} type="primary"  disabled={!email.isValid || !password.isValid}>
               {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

//const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default NormalLoginForm