import React, {Component} from 'react'

class LoginForm extends Component {

  render() {
    return (
          <React.Fragment>
          { this.props.currentUser.id ?
            <form className="right">
            <div className="form-group mx-sm-3"><button className="btn btn-primary" onClick={(e) => this.props.handleLogOut()}>Log Out</button></div></form> :
          <form className ="form-inline right" onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className="form-group mx-sm-3">
                <label htmlFor="username" className="sr-only">Username</label>
                <input id="username" name="username" placeholder="Username" type="text" onChange={(e) => this.props.handleChange(e)}/>
            </div>
            <div className="form-group mx-sm-3">
              <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" placeholder="Password" onChange={(e) => this.props.handleChange(e)} />
            </div>
            <div className="form-group mx-sm-3">
              <button className="btn btn-primary" type="submit">Log In</button>
            </div>
          </form> }
          </React.Fragment>
  );
  }
}

export default LoginForm;
