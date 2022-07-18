import React, { Component } from 'react';
import { View as NView, StyleSheet, TouchableOpacity, TextInput, PixelRatio } from 'react-native';
import { Icon, ImagePicker, Image, View, moderateScale } from '../ui';
import { connect } from 'react-redux';
import MessageSend from './MessageSend';
// import { textStyles, baseStyles } from '../themes/styles';
// import strings from '../translations/strings';
import { setTyping } from '../actions/Socket/ChatSocket';
import I18n from 'react-native-i18n'
import { textDirectionStyles, fontFamilyStyles, fontSizeStyles, paddingStyles, marginStyles, borderStyles, borderRadiusStyles } from '../ui/Base';
import colors from '../ui/defaults/colors';


class MessageInputToolbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
            showOptions: false,
            selectorVisible: false,
        }

        this.inputRef = React.createRef();
    }

    renderUploadImage() {
        return (
            <TouchableOpacity style={{ alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', }}
                onPress={() => {
                    if (this.props.onActionPressed) {
                        this.props.onActionPressed();
                    }
                }}>
                <Icon name="camera" type="Entypo" color="#A1A1A1" flip size={10} />
            </TouchableOpacity>
        );
    }

    renderSendButton() {
        return <MessageSend {...this.props} messageText={this.state.messageText} image={this.props.image}
            clearInput={() => {
                this.inputRef.current.clear();
                this.setState({ messageText: '' });
                if (this.props.onDeleteImage)
                    this.props.onDeleteImage();
            }} />
    }

    renderAttachmentImage() {
        if (this.props.image) {
            return (
                <NView style={{ alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                    <View center>
                        <View style={{
                            position: 'absolute', top: 5, left: this.props.rtl ? 5 : undefined,
                            right: this.props.rtl ? undefined : 5, zIndex: 201
                        }} center onPress={() => {
                            if (this.props.onDeleteImage)
                                this.props.onDeleteImage()
                        }}>
                            <Icon name="close" type="AntDesign" color={colors.secondary} size={6} />
                        </View>
                        <Image source={this.props.image} resizeMode="stretch" width={40} height={15} br={8} />
                    </View>
                </NView>
            );
        }
        else {
            return null;
        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <NView style={{
                alignSelf: 'stretch', backgroundColor: '#FFFFFE',
                paddingHorizontal: moderateScale(5), elevation: PixelRatio.roundToNearestPixel(12),
                paddingVertical: moderateScale(3),
            }}>
                <NView style={{ flexDirection: this.props.rtl ? 'row-reverse' : 'row' }}>
                    <NView style={{
                        flex: 1, backgroundColor: '#F5F5F5', alignSelf: 'stretch',
                        paddingVertical: moderateScale(3),
                        paddingHorizontal: moderateScale(5),
                        borderColor: colors.grey, borderWidth: 1, borderRadius: 15,
                        marginLeft: this.props.rtl ? moderateScale(10) : 0, marginRight: this.props.rtl ? 0 : moderateScale(10),
                    }}>
                        <NView style={{
                            alignSelf: 'stretch', flexDirection: this.props.rtl ? 'row-reverse' : 'row',
                        }}>
                            <TextInput style={[
                                textDirectionStyles({ ...this.props }),
                                fontFamilyStyles({ ...this.props }),
                                paddingStyles({ ...this.props }),
                                marginStyles({ ...this.props }),
                                borderStyles({ ...this.props }),
                                borderRadiusStyles({ ...this.props }),
                                // textDirectionStyles({ ...this.props }),
                                // textStyles({ ...this.props, type: 3, color: 'black' }),
                                // baseStyles(this.props),
                                {
                                    flex: 1, alignSelf: 'stretch', textAlignVertical: 'center',
                                }]}
                                placeholder={I18n.t('typeYourMessage')}
                                onChangeText={(text) => {
                                    this.setState({ messageText: text, selectorVisible: false });
                                    if (text !== '') {
                                        this.props.setTyping({}, true);
                                    }
                                    else {
                                        this.props.setTyping({}, false);
                                    }
                                }}
                                multiline={true}
                                ref={this.inputRef}
                                value={this.state.messageText} />
                            {this.renderUploadImage()}
                        </NView>
                        {this.renderAttachmentImage()}
                    </NView>
                    <NView style={{ alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                        {this.renderSendButton()}
                    </NView>
                </NView>
            </NView>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
    user: state.auth.user
})

export default connect(mapStateToProps, { setTyping })(MessageInputToolbar);