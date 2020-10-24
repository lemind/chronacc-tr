import React from 'react'

import './LoginForm.less'

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

export default class LoginForm extends React.PureComponent<any> {
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
    return user
    // return this.$store.getters['user']
  }

  get userEmail() {
    if (this.storeUser) {
      return this.storeUser.email
    }
    return this.storeUser && this.storeUser?.email
  }

  get isEmailShown() {
    return !!this.storeUser
  }

  login() {
    const user = {
      email: this.state.form.email,
      password: this.state.form.password,
    }
    console.log('login');
    // store.dispatch('login', user)
  }

  register() {
    const newUser = {
      email: this.state.form.email,
      password: this.state.form.password,
      password2: this.state.form.password2
    }
    console.log('register');
    // store.dispatch('register', newUser)
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
    // ToDo: get it back after token saving to LocalStorage added
    // if (!authService.isTokenExpired()) {
    //   this.isEmailShown = true
    //   this.userEmail = authService.getEmail()
    // }
  }

  handleBlurEmail() {
    if (!validateEmail(this.state.form.email)) {
      this.addError('email', invalidEmail)
    } else {
      this.deleteError('email', invalidEmail)
    }
  }

  // ToDo: move to helpers?
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

  handleBlurPassword() {
    if (!this.state.form.password2) return

    this.checkPasswordsEquality()
  }

  handleBlurPassword2() {
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

    return this.doesFormHaveErrors()
  }

  get renderSubmit() {
    if (this.state.isRegisterShown) {
      return <button
        className="login__submit"
        onClick={ this.register }
        disabled= { this.isSubmitDisabled }
      >register</button>
    } else {
      return <button
        className="login__submit"
        onClick={ this.login }
        disabled= { this.isSubmitDisabled }
      >login</button>
    }
  }

  get renderEmail() {
    return <div>
      <label>e-mail</label>
      <input
        className="login__email"
        onBlur={ this.handleBlurEmail }
      />
      {this.state.formErrors.email.map((error, index) =>
        <div key={ error }>
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
        onBlur={ this.handleBlurPassword }
      />
      {this.state.formErrors.password.map((error, index) =>
        <div key={ error }>
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
        onBlur={ this.handleBlurPassword2 }
      />
      {this.state.formErrors.password2.map((error, index) =>
        <div key={ error }>
          { error }
        </div>
      )}
    </div>
  }

  render() {
    return (
      <div className="login-form">
        {this.isEmailShown && this.userEmail}
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