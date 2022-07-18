import React, { Component } from 'react';
import { View as NView, TouchableWithoutFeedback, Alert } from 'react-native';
import { Text, View, Image, moderateScale, responsiveWidth } from '../ui';
import { connect } from 'react-redux';
import MessageBubble from './MessageBubble';
import moment from 'moment';
import MessageReceipt from './MessageReceipt';
// import strings from '../translations/strings';
import I18n from 'react-native-i18n'
import { API_ENDPOINT } from '../configs';


class MessageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // highlighted: false,
        }
    }

    isSameDate(current, pre) {
        if (Object.keys(pre).length < 1) {
            return false;
        }
        else {
            var dateCurrent = moment(current.createdAt);
            var datePre = moment(pre.createdAt);
            return dateCurrent.isSame(datePre, 'day');
        }
    }

    renderDate() {
        const { messages, messageProps } = this.props;
        const previousMessage = messages[messageProps.index + 1] || {};

        if (!this.isSameDate(messageProps, previousMessage)) {
            var now = moment(new Date()).startOf('day');
            var then = moment(messageProps.createdAt).startOf('day');
            var days = now.diff(then, 'days', false)
            let date = "";

            if (days === 0) {
                date = I18n.t("today");
            }
            else if (days === 1) {
                date = I18n.t("yesterday");
            }
            else {
                date = moment(then).locale(this.props.lang).format('D MMMM YYYY');
            }
            return (
                <NView style={{ alignSelf: 'center', paddingVertical: moderateScale(4) }}>
                    <Text type={3} color="#9E9E9E">{date}</Text>
                </NView>
            );
        }
        else {
            return null;
        }
    }

    // setHighlight(value) {
    //     this.setState({ highlighted: value });
    //     if (value) {
    //         this.props.setHighlightedMessages([...this.props.highlightedMessages, this.props.messageProps]);
    //     }
    //     else {
    //         var ind = this.props.highlightedMessages.findIndex(x => x.id === this.props.messageProps.id);
    //         if (ind !== -1) {
    //             this.props.highlightedMessages.splice(ind, 1);
    //             this.props.setHighlightedMessages(this.props.highlightedMessages);
    //         }
    //     }
    // }

    renderTime() {
        const { messageProps } = this.props;
        return (
            <NView style={{
                alignSelf: messageProps.position === 'left' ? 'flex-start' : 'flex-end',
                marginHorizontal: messageProps.position === 'left' ? moderateScale(7) : moderateScale(25),
            }}>
                <Text size={5} color="#9E9E9E">{moment(messageProps.createdAt).format('DD/MM/YYYY')}</Text>
            </NView>
        );
    }

    // renderBackgroundHighlight() {
    //     if (this.state.highlighted) {
    //         return (
    //             <NView style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute', backgroundColor: '#F7931E', opacity: 0.4, zIndex: -9 }}></NView>
    //         );
    //     }
    //     else {
    //         return null;
    //     }
    // }

    renderUserImage() {
        const { messageProps } = this.props;
        // let image = messageProps.position === 'right' ? messageProps.sender.image : messageProps.receiver.image;
        return (
            <View stretch>
                {messageProps.position === 'right' && <Image
                    source={messageProps.position === 'right' && require('../assets/images/logo.png')}
                    // source={{
                    //     uri: messageProps.sender.image.includes('http') ?
                    //         messageProps.sender.image : `${API_ENDPOINT}${messageProps.sender.image}`
                    // }}
                    resizeMode={'contain'} center
                    equalSize={12} bw={1} bc="white" elevation={2} />
                }
            </View>
        );
    }

    renderMessageBubble() {
        return (
            <MessageBubble {...this.props} />
        );
    }

    renderSeen() {
        const { messageProps } = this.props;
        if (messageProps.position === 'right' && messageProps.delivered) {
            return (
                <MessageReceipt {...this.props} />
            );
        }
        else {
            return null;
        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <NView style={{ alignSelf: 'stretch' }}>
                {this.renderDate()}
                <NView style={{ alignSelf: 'stretch', marginVertical: moderateScale(2), paddingHorizontal: moderateScale(12) }}>
                    <TouchableWithoutFeedback>
                        <NView {...this.props} style={{ alignSelf: 'stretch' }}>
                            {/* {this.renderBackgroundHighlight()} */}
                            <NView style={{ flexDirection: messageProps.position === 'left' ? 'row' : 'row-reverse' }}>
                                {this.renderUserImage()}
                                {this.renderMessageBubble()}
                                {/* {this.renderSeen()} */}
                            </NView>
                        </NView>
                    </TouchableWithoutFeedback>
                    {this.renderTime()}
                </NView>
            </NView>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
})

export default connect(mapStateToProps)(MessageContainer);