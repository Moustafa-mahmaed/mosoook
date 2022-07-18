import React, { Component } from 'react';
import { View as NView, StyleSheet, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Input, Form, responsiveWidth, moderateScale, Navigation } from '..';
import { connect } from 'react-redux';

class AttachmentOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <NView style={{ alignSelf: 'stretch', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <NView style={{
                    width: '30%', borderRadius: 8, elevation: 4, backgroundColor: '#FFFFFF',
                    alignItems: 'center', marginVertical: 4
                }}>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'stretch', paddingVertical: 6 }}>
                        <Image source={require('../../assets/images/gallery.png')} width={10} height={7} resizeMode="contain" />
                        <Text color="#9E9E9E" size={5}>{I18n.t('gallery')}</Text>
                    </TouchableOpacity>
                </NView>
                <NView style={{
                    width: '30%', borderRadius: 8, elevation: 4, backgroundColor: '#FFFFFF',
                    alignItems: 'center', marginVertical: 4
                }}>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'stretch', paddingVertical: 6 }}>
                        <Image source={require('../../assets/images/photo-camera.png')} width={10} height={7} resizeMode="contain" />
                        <Text color="#9E9E9E" size={5}>{I18n.t('camera')}</Text>
                    </TouchableOpacity>
                </NView>
                <NView style={{
                    width: '30%', borderRadius: 8, elevation: 4, backgroundColor: '#FFFFFF',
                    alignItems: 'center', marginVertical: 4
                }}>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'stretch', paddingVertical: 6 }}>
                        <Image source={require('../../assets/images/contract.png')} width={10} height={7} resizeMode="contain" />
                        <Text color="#9E9E9E" size={5}>{I18n.t('document')}</Text>
                    </TouchableOpacity>
                </NView>
                <NView style={{
                    width: '30%', borderRadius: 8, elevation: 4, backgroundColor: '#FFFFFF',
                    alignItems: 'center', marginVertical: 4
                }}>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'stretch', paddingVertical: 6 }}>
                        <Image source={require('../../assets/images/contact.png')} width={10} height={7} resizeMode="contain" />
                        <Text color="#9E9E9E" size={5}>{I18n.t('contact')}</Text>
                    </TouchableOpacity>
                </NView>
                <NView style={{
                    width: '30%', borderRadius: 8, elevation: 4, backgroundColor: '#FFFFFF',
                    alignItems: 'center', marginVertical: 4
                }}>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'stretch', paddingVertical: 6 }}>
                        <Image source={require('../../assets/images/placeholder.png')} width={10} height={7} resizeMode="contain" />
                        <Text color="#9E9E9E" size={5}>{I18n.t('location')}</Text>
                    </TouchableOpacity>
                </NView>
                <NView style={{
                    width: '30%', borderRadius: 8, elevation: 4, backgroundColor: '#FFFFFF',
                    alignItems: 'center', marginVertical: 4
                }}>
                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'stretch', paddingVertical: 6 }}>
                        <Image source={require('../../assets/images/music-player.png')} width={10} height={7} resizeMode="contain" />
                        <Text color="#9E9E9E" size={5}>{I18n.t('audioClip')}</Text>
                    </TouchableOpacity>
                </NView>
            </NView>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
})

export default connect(mapStateToProps, {})(AttachmentOptions);