import React, {useState, useContext, useEffect} from 'react';

// UI
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
// import ReactCodeInput from 'react-verification-code-input';

// Context
import {AuthenticationContext} from '../../context/AuthenticationContext';
import {SocialContext} from '../../context/SocialContext';

const Login = props => {
    const {isLogged} = useContext(AuthenticationContext);
    const {isVerified, getFollows, verifyCode, sendVerificationMail} = useContext(SocialContext);
    const [emailSent, setEmailSent] = useState(false);
    const [code, setCode] = useState("");

    const getCode = () => {
        return code;
    };

    const sendVerificationCode = () => {
        verifyCode(getCode());
    };

    const resendEmail = async () => {
        sendVerificationMail();
        for (let i = 60; i > 0; i--) {
            setEmailSent(i);
            await new Promise(r => setTimeout(r, 1000)); 
        };
        setEmailSent(false);
    };

    useEffect(() => {
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    useEffect(() => {
        if (isVerified) {
            props.history.push("/");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVerified]);

    return (
        <>
            {isLogged && isVerified === false && (
                <div className="login-div">
                    <form className="form-login">
                        <h3>Verify Code</h3>
                        <div className="form-fields verify-acc">
                                <TextField variant="outlined" id="code" label="Verification Code" value={code} onChange={e => setCode(e.target.value)} />
                                {/* <ReactCodeInput autoFocus={true} /> */}
                            <div className="btns-verification">
                                <Button endIcon={emailSent ? emailSent : <SendIcon>send</SendIcon>} style={{
                                    cursor: emailSent ? "not-allowed" : "pointer"
                                }} disabled={emailSent && true} onClick={resendEmail} type="button" variant="contained" color="cancel">Send Email</Button>
                                <Button onClick={sendVerificationCode} type="button" variant="contained" color="primary">Verify</Button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Login;