import React, { Component } from 'react';
import material-ui from 'material-ui'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            load: false
        };
    }

    // for invoking react-webcam component for procuring a screenshot
    setRef = (webcam) => {
        this.webcam = webcam;
    }

    // capturing the screenshot through the function
    capture = () => {
        this.setState({
            load: true
        });

        // captures the screenshot for the image
        const imageSrc = this.webcam.getScreenshot();

        axios.post(`https://api.kairos.com/enroll`, {
            gallery_name: 'newCameriaGallery',
            image: imageSrc,
            subject_id: this.state.username
        }, {
                // you have to add your secret credentials here
                headers: {
                    app_id: <e70fee1f>,
                    app_key: <98112e824f82622206d370dae6ed74b9>
                }
            }).then((response) => {
                // redux method for refining the JSON response is invoked
                this.props.registerUser(response.data);
                this.setState({
                    load: false
                });
            });
    };

    // keeps updating the username that is used as an identifier
    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // resetting the gallery due to API call throttling
    resetGallery = () => {

        this.setState({
            load: true
        });

        axios.post(`https://api.kairos.com/gallery/remove`, {
            gallery_name: "newCameriaGallery"
        }, {
                headers: {
                    app_id: <enter app id>,
                    app_key: <enter app key>
                }
            }).then((response) => {
                alert('Gallery has been reset. Feel free to register now');
                this.setState({
                    load: false
                });
            });
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <div style={{ 'textAlign': 'center' }}>
                            <h3>REGISTER FACE</h3>
                            <Webcam
                                audio={false}
                                height={320}
                                ref={this.setRef}
                                screenshotFormat="image/png"
                                width={320}
                            />
                            <br />
                            <div style={{ 'margin': '0 auto!important' }}>
                                <TextField
                                    hintText="provide identification name"
                                    floatingLabelText="Username"
                                    onChange={(event) => this.handleUsername(event)}
                                />
                            </div>
                            <br />
                            <RefreshIndicator
                                className='css-loader'
                                size={80}
                                left={70}
                                top={0}
                                loadingColor="#ADD8E6"
                                status="loading"
                                style={(this.state.load === false) ? style.hide : style.refresh}
                            />
                            <br />
                            <RaisedButton className='register-button' onClick={this.capture} label="REGISTER" primary={true} style={{ 'margin': 16 }} />
                            <RaisedButton className='register-button' onClick={this.resetGallery} label="RESET GALLERY" primary={true} style={{ 'margin': 16 }} />
                            <UserRegister detect={this.props.regData} />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
