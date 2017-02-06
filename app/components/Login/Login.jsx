import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { Authenticate } from '../../queries';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', password: '', message: '' };
    }

    render() {
        return (
            <div>
                <div>
                    Authentication Required
                </div>
                <TextField hintText="User Name"
                    floatingLabelText="User Name"
                    value={this.state.userName}
                    onChange={this.onUserNameChange} />
                <TextField hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange} />
                <br />
                <br />
                <div>{this.state.message}</div>
                <br />
                <RaisedButton label="OK" onClick={this.onClick} />
            </div>)
    }

    onUserNameChange = (e) => {
        this.setState({ userName: e.target.value });
    }
    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onClick = () => {
        Authenticate(this.state.userName, this.state.password,
            (accessToken, refreshToken) => {
                this.props.authenticationSuccess(accessToken, refreshToken);
                this.context.router.push('/');
            },
            (errorCode, errorMessage) => {
                this.setState({
                    userName: '',
                    password: '',
                    message: errorMessage
                });
            });
    }
}



Login.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticating: state.login.get('isAuthenticating'),
    accessToken: state.login.get('accessToken'),
    refreshToken: state.login.get('refreshToken')
})

const mapDispatchToProps = ({
    authenticationSuccess: Actions.authenticationSuccess,
    authenticationFailure: Actions.authenticationFailure
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)