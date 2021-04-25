import React from 'react';
import ReactDOM from 'react-dom'
import SocialButton from './socialLogin';
import { PushButton } from "react-cupertino";
import { Row, Col } from 'react-bootstrap';

    const handleSocialLogin = (user) => {
        console.log(user)
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    ReactDOM.render(
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="d-flex justify-content-center">
                        <SocialButton
                            provider='facebook'
                            appId='YOUR_APP_ID'
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                        >
                            
                            <PushButton color="blue" title="Login with Facebook" />

                        </SocialButton>
                    </div>
                </Col>
            </Row>
        </>,
        document.getElementById('app')
    )


