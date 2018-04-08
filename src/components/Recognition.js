import React, { Component } from 'react';
import material-ui from 'material-ui'

class Recognize extends Component {
    constructor(props) {
        super(props);

        this.state = {
            load: false
        };
    }
    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        this.setState({
            load: true
        });

        const imageSrc = this.webcam.getScreenshot();
        // console.log(imageSrc);
        axios.post(`https://api.kairos.com/recognize`, {
            gallery_name: 'newCameriaGallery',
            image: imageSrc
        }, {
                // enter your secret credentials
                headers: {
                    app_id: <e70fee1f>,
                    app_key: <98112e824f82622206d370dae6ed74b9>
                }
            }).then((response) => {
                console.log('response', response);
                this.props.recognizeUser(response.data);
                this.setState({
                    load: false
                });
            }).catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <div style={{ 'textAlign': 'center' }}>
                            <h3>DETECT FACE</h3>
                            <Webcam
                                audio={false}
                                height={320}
                                ref={this.setRef}
                                screenshotFormat="image/png"
                                width={320}
                            />
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
                            <RaisedButton onClick={this.capture} label="DETECT" primary={true} style={{ 'margin': 16 }} />
                            <UserRecognize detect={this.props.detData} />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
