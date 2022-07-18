import React, { Component } from 'react';
import { View as NView, StyleSheet, TouchableOpacity, PixelRatio, Keyboard, View } from 'react-native';
import { Icon, responsiveWidth } from '../ui';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
// import { responsiveWidth } from '../themes/scales';
import { sendMessageToContact } from '../actions/Socket/ChatSocket';
import Indicator from '../ui/Indicator';


class MessageSend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false,
        }
    }

    handleSend() {
        const { messageText, image, clearInput } = this.props;
        Keyboard.dismiss();
        if (image || messageText) {
            this.setState({ processing: true });
            let formData = new FormData();

            if (messageText) formData.append('text', messageText)
            if (image) formData.append('file', image)
            // formData.append('receiver', this.props.friend.id);

            let messageObject = {
                id: parseInt(`${moment(new Date).format('x')}`),
                text: messageText ? messageText : undefined,
                image: image ? image.uri : undefined,
                receiver: this.props.friend,
                createdAt: new Date(),
                sender: this.props.user,
            }
            this.props.sendMessageToContact(formData, messageObject, () => {
                this.setState({ processing: false });
                clearInput();
            }, () => {
                this.setState({ processing: false });
            });
        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.handleSend()
            }}>
                <View style={{
                    width: responsiveWidth(12), height: responsiveWidth(10), borderRadius: PixelRatio.roundToNearestPixel(10),
                    alignItems: 'center', justifyContent: 'center',
                }}
                >
                    {this.state.processing ?
                        <Indicator color="primary" size={8} /> :
                        <Icon name="send" type="MaterialCommunityIcons" color="primary" size={15}
                            flip={this.props.rtl ? true : false} />
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
    user: state.auth.user,
})

export default connect(mapStateToProps, { sendMessageToContact })(MessageSend);