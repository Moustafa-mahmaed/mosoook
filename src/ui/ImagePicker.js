
import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View, Text, Icon } from '.';
// import { baseStyles } from '../themes/styles';
// import { BACKGROUND_DEFAULT } from '../themes/colors';
// import strings from '../translations/strings';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
// import Permissions from 'react-native-permissions';
import colors from './defaults/colors';
// import GView from '../components/GView';
import I18n from 'react-native-i18n';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

class UImagePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }
    choicePicker = func => {
        let permission =
            Platform.OS === 'ios'
                ? func === 'launchImageLibrary'
                    ? PERMISSIONS.IOS.PHOTO_LIBRARY
                    : PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA;
        request(permission).then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                    this.props.onClose();
                    ImagePicker[func]({ mediaType: 'photo' }, response1 => {
                        if (!response1.didCancel) {
                            this.props.onSuccess(
                                {
                                    uri: response1.uri,
                                    type: response1.type ? response1.type : 'image/png',
                                    name: 'fileName'
                                },
                                this.props.name);
                        } else if (response1.didCancel) {
                        } else {
                            if (this.props.onFailure)
                                this.props.onFailure(response, this.props.name);
                        }
                    });
                    break;
                default:
                    Platform.OS === 'ios'
                        ? Linking.openURL('app-settings://Photos')
                        : this.choicePicker(func);
            }
        });
    };

    // choicePicker = (func) => {
    //     console.log("0000000000")
    //     Permissions.request('photo').then(response => {
    //         if (response === 'authorized') {
    //             this.props.onClose();
    //             setTimeout(() => {
    //                 ImagePicker[func](this.props.rtl ? optionsAr : options, response1 => {
    //                     if (!response1.didCancel) {
    //                         this.props.onSuccess(
    //                             {
    //                                 uri: response1.uri,
    //                                 type: response1.type ? response1.type : 'image/png',
    //                                 name: 'fileName'
    //                             },
    //                             this.props.name);
    //                     }
    //                     else if (response1.didCancel) {
    //                         // do nothing
    //                     }
    //                     else {
    //                         if (this.props.onFailure)
    //                             this.props.onFailure(response, this.props.name);
    //                     }
    //                 });
    //             }, 500);

    //         }
    //     });
    // }

    render() {
        const { visible, style, onClose } = this.props;
        return (
            <View style={visible ? styles.view : null}>
                <Modal
                    visible={visible} animationType="slide" transparent onRequestClose={onClose}>
                    <View flex stretch bgc="transparent" noFeedback onPress={onClose}>
                        <View style={[styles.modal,
                            // baseStyles(this.props),
                            style]} noFeedback onPress={() => { onClose }} backgroundColor={colors.primary}>
                            <View stretch pv={8} ph={6} >
                                <Text type={1} color={colors.white}>{I18n.t('chooseImage')}</Text>
                                <TouchableHighlight style={{ alignSelf: 'stretch' }}
                                    underlayColor={'rgba(0, 0, 0, 0.1)'} onPress={() => { this.choicePicker('launchCamera') }}>
                                    <View stretch mh={10} mv={6} row>
                                        <View circleRadius={8} center>
                                            <Icon name="camera" type="Entypo" size={10} color="white" />
                                        </View>
                                        <Text size={8} color={colors.white} ph={6}>{I18n.t('camera')}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ alignSelf: 'stretch' }}
                                    underlayColor={'rgba(0, 0, 0, 0.1)'}
                                    onPress={() => {
                                        console.log("launchImageLibrary")
                                        this.choicePicker('launchImageLibrary')
                                    }}>
                                    <View stretch mh={10} mv={6} row>
                                        <View circleRadius={8} center>
                                            <Icon name="photo-library" type="MaterialIcons" size={10} color="white" />
                                        </View>
                                        <Text size={8} color={colors.white} ph={6}>{I18n.t('library')}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const optionsAr = {
    title: 'إختار صورة من',
    takePhotoButtonTitle: "الكاميرا",
    chooseFromLibraryButtonTitle: "المعرض",
    cancelButtonTitle: "رفض",
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const mapStateToProps = state => ({
    rtl: state.lang.rtl
});

export default connect(mapStateToProps)(UImagePicker);
