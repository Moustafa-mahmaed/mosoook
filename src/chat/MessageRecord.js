import React, { Component } from 'react';
import { View as NView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth } from '../ui';


class MessageRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <TouchableOpacity onPress={() => {
            }}>
                <LinearGradient style={{
                    width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6),
                    alignItems: 'center', justifyContent: 'center', elevation: 6
                }}
                    colors={["#93278F", "#662D91"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}>
                    <Icon name="microphone" type="font-awesome" color="white" />
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
})

export default connect(mapStateToProps)(MessageRecord);