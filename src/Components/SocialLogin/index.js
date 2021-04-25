// import { GoogleAuth, LinkedInAuth } from 'react-social-auth'
// import { Row, Col, Button } from 'react-bootstrap';
import React from 'react'
// import { PushButton } from "react-cupertino";


// let LinkedInButton = ({ onClick }) => (
//     <PushButton     
//         title="Log in with LinkedIn"
//         onClick={onClick}
//     />
// );

// let GoogleButton = ({ onClick }) => (
//     // <>
//     // <PushButton title="Log in with Facebook" size="large">
//     //      <div>
//     //         <i className="fa fa-facebook" />
//     //     {/* Log in with Google */}
//     //   </div>
//     // </PushButton>

//     <PushButton
//         // style={{ width: 175 }}
//         // className="cursor-pointer"
//         // color="primary"
//         // size="large"
//         title="Log in with Google"
//         onClick={onClick}
//     />
//     // </>
// );

// let onSignIn = authPayload => {
//     // Use the authentication payload to verify
//     // the identity of the request using server
//     // side authentication procedures.
//     console.log(authPayload)
// }

const Index = () => {
    return (
        <>
            {/* <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="d-flex justify-content-center custom-btn">
                        <GoogleAuth
                            appId="[YOUR_GOOGLE_APP_ID]"
                            onSuccess={onSignIn}
                            component={GoogleButton}
                        />
                    </div>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="d-flex justify-content-center custom-btn">
                        <LinkedInAuth
                            appId="[YOUR_LINKEDIN_APP_ID]"
                            onSuccess={onSignIn}
                            component={LinkedInButton}
                        />
                    </div>
                </Col>
            </Row> */}
        </>
    )
}

export default Index
