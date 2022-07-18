import React, { Component } from 'react';
import { View as NView, StyleSheet, PixelRatio } from 'react-native';
import { Text, Image, moderateScale, View } from '../ui';
import { connect } from 'react-redux';
import OpenImage from './OpenImage';
import I18n from 'react-native-i18n'
import colors from '../ui/defaults/colors';


class MessageBubble extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleOpenImage: false,
        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <NView style={styles[messageProps.position].bubble}>
                {/* ToDo: here we must separate the inside of the bubble to different component to accept any type of media (text/audio/video/image) */}
                {messageProps.image &&
                    <View stretch ph={5} pv={3} center backgroundColor={colors.bgChat}
                        borderTopRightRadius={5}
                        borderTopLeftRadius={5}>
                        <Image equalSize={25} br={8} resizeMode="contain" source={{ uri: messageProps.image }}
                            // onPress={() => { this.setState({ visibleOpenImage: true }) }}
                            imageViewer
                        />
                    </View>
                }
                {messageProps.text &&
                    <View stretch ph={5} pv={3}>
                        <Text style={styles[messageProps.position].text} size={8}>{messageProps.text}</Text>
                    </View>
                }
                <OpenImage
                    visible={this.state.visibleOpenImage}
                    image={messageProps.image}
                    closeMenu={() => this.setState({ visibleOpenImage: false })}
                />
            </NView>
        );
    }
}

const styles = {
    left: StyleSheet.create({
        bubble: {
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingHorizontal: moderateScale(8),
            // paddingVertical: moderateScale(2),
            borderRadius: PixelRatio.roundToNearestPixel(6),
            // borderTopLeftRadius: 0,
            marginHorizontal: moderateScale(5),
            maxWidth: '60%'
        },
        text: {
            color: colors.white,
            textAlign: 'left',
        }
    }),
    right: StyleSheet.create({
        bubble: {
            backgroundColor: colors.bgChat,
            // elevation: PixelRatio.roundToNearestPixel(2),
            alignItems: 'center',
            justifyContent: 'center',
            // paddingHorizontal: moderateScale(8),
            // paddingVertical: moderateScale(2),
            borderRadius: PixelRatio.roundToNearestPixel(6),
            // borderTopRightRadius: 0,
            marginHorizontal: moderateScale(5),
            maxWidth: '60%'
        },
        text: {
            color: colors.primary,
            textAlign: 'right',
        }
    }),
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
})

export default connect(mapStateToProps)(MessageBubble);