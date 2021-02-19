import React from 'react'

import './loginForm.less'
import withCases from 'helpers/withCases'
import AuthCases from 'cases/auth'
import { AuthUserFormType } from 'models/AuthUser';

// ToDo: move to validators
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// ToDo: move to err messages
const invalidEmail = 'Email should be valid'
const notEqualPasswords = 'Passwords should be equal'

type errorsType = {
  email: Array<string>
  password: Array<string>
  password2: Array<string>
}

const user: any = null

// stubish cmp
export class LoginForm extends React.Component<any, any, any> {
  state = {
    form: {
      email: '',
      password: '',
      password2: '',
    },
    formErrors: {
      email: [],
      password: [],
      password2: [],
    },
    isRegisterShown: false,
    isLogedin: false,
  }

  get storeUser() {
    return this.props.authCases.getUser()
  }

  get userEmail() {
    const userEmail = this.storeUser && this.storeUser?.email
    return <span data-test="label-email">{userEmail}</span>
  }

  get isEmailShown() {
    return !!this.storeUser
  }

  login() {
    const user: AuthUserFormType = {
      email: this.state.form.email,
      password: this.state.form.password,
    }

    this.props.authCases.login({user: user})
  }

  register() {
    const newUser: AuthUserFormType = {
      email: this.state.form.email,
      password: this.state.form.password,
    }

    this.props.authCases.signup({user: newUser})
  }

  logout() {
    this.props.authCases.logout()
  }

  showRegister = () => {
    this.setState({
      isRegisterShown: true
    })
  }
  showLogin = () => {
    this.setState({
      isRegisterShown: false
    })
  }

  beforeMount() {
    // if (!authService.isTokenExpired()) {
    //   this.isEmailShown = true
    //   this.userEmail = authService.getEmail()
    // }
  }

  handleBlurEmail(e) {
    this.setState({form: {...this.state.form, email: e.currentTarget.value}}, () => {
      if (!validateEmail(this.state.form.email)) {
        this.addError('email', invalidEmail)
      } else {
        this.deleteError('email', invalidEmail)
      }
    })
  }

  // ToDo: move to helpers
  addError(fieldName, errorMessage) {
    this.state.formErrors[fieldName].push(errorMessage)
    this.state.formErrors[fieldName] = [...new Set(this.state.formErrors[fieldName])]
  }

  deleteError(fieldName, errorMessage) {
    this.state.formErrors[fieldName] = [...this.state.formErrors[fieldName].filter(err => err !== errorMessage)] 
  }

  checkPasswordsEquality() {
    if (!this.state.isRegisterShown) return

    if (this.state.form.password !== this.state.form.password2) {
      this.addError('password', notEqualPasswords)
      this.addError('password2', notEqualPasswords)
    } else {
      this.deleteError('password', notEqualPasswords)
      this.deleteError('password2', notEqualPasswords)
    }
  }

  handleBlurPassword(e) {
    this.setState({form: {...this.state.form, password: e.currentTarget.value}})

    if (!this.state.form.password2) return

    this.checkPasswordsEquality()
  }

  handleBlurPassword2(e) {
    this.setState({form: {...this.state.form, password2: e.currentTarget.value}})

    this.checkPasswordsEquality()
  }

  doesFormHaveErrors() {
    let errorsCount = 0;
    for (const field in this.state.formErrors) {
      if (this.state.formErrors[field].length > 0) {
        errorsCount++
        break
      }
    }

    return !!errorsCount
  }

  get isSubmitDisabled() {
    // ToDo: show empty field warning
    if (this.state.isRegisterShown) {
      return (!this.state.form.email || !this.state.form.password || !this.state.form.password2)
    } else {
      return (!this.state.form.email || !this.state.form.password)
    }
  }

  get renderSubmit() {
    if (this.state.isRegisterShown) {
      return <button
        className="login__submit"
        onClick={ () => this.register() }
        disabled= { this.isSubmitDisabled }
      >register</button>
    } else {
      return <button
        className="login__submit"
        onClick={ () => this.login() }
        disabled= { this.isSubmitDisabled }
        data-test="button-login"
      >login</button>
    }
  }

  get renderEmail() {
    return <div>
      <label>e-mail</label>
      <input
        className="login__email"
        onBlur={ (e) => this.handleBlurEmail(e) }
        data-test="input-email"
      />
      {this.state.formErrors.email.map((error, index) =>
        <div className="login__error" key={ error }>
          { error }
        </div>
      )}
    </div>
  }

  get renderPassword() {
    return <div>
      <label>password</label>
      <input
        className="login__password"
        type="password"
        onBlur={ (e) => this.handleBlurPassword(e) }
        data-test="input-password"
      />
      {this.state.formErrors.password.map((error, index) =>
        <div className="login__error" key={ error }>
          { error }
        </div>
      )}
    </div>
  }

  get renderRepeatPassword() {
    if (!this.state.isRegisterShown) return;

    return <div>
      <label>repeat password</label>
      <input
        className="login__password"
        type="password"
        onBlur={ (e) => this.handleBlurPassword2(e) }
      />
      {this.state.formErrors.password2.map((error, index) =>
        <div className="login__error" key={ error }>
          { error }
        </div>
      )}
    </div>
  }

  renderLogout() {
    return (
      <button onClick={() => this.logout()} >logout</button>
    )
  }

  render() {
    return (
      <div className="login-form" data-test="login-form">
        {this.isEmailShown && this.userEmail}
        {this.isEmailShown && this.renderLogout()}
        {!this.isEmailShown && <div>
            <h5>
              <span onClick={ this.showLogin }>Login</span>
              |
              <span onClick={ this.showRegister }>Register</span>
            </h5>
            {this.renderEmail}
            {this.renderPassword}
            {this.renderRepeatPassword}
            {this.renderSubmit}
          </div>}
      </div>
    )
  }
}

export default withCases(AuthCases)(LoginForm)
