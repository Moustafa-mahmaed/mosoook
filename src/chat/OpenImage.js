import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, View, Image } from '../ui';

class OpenImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {
        const { token } = this.props;
        return (
            <Modal
                isVisible={this.props.visible}
                transparent
                onRequestClose={() => {
                    this.props.closeMenu()
                }}
                useNativeDriver
                onBackdropPress={() => this.props.closeMenu()}
                onBackButtonPress={() => this.props.closeMenu()}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,
                }}>
                <View center bgc="transparent" backgroundColor={'transparent'} onPress={() => { this.props.closeMenu() }}>
                    {/* <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                        noFeedback center > */}
                    {/* <View stretch br={10} center backgroundColor={'red'}> */}
                    <Image equalSize={80} br={8} resizeMode="contain" source={{ uri: this.props.image }}
                    />
                </View>
                {/* </View> */}
                {/* </View> */}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    rtl: state.lang.rtl,
})

export default connect(mapStateToProps)(OpenImage);