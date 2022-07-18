import React, { Component } from 'react';
import { View as NView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { responsiveWidth } from '../ui';


class MessageReceipt extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { messageProps } = this.props;
        return (
            <NView style={{ marginHorizontal: 2, alignItems: 'center', justifyContent: 'center' }}>
                <NView style={{
                    width: responsiveWidth(1.5), height: responsiveWidth(1.5), borderRadius: responsiveWidth(0.75),
                    backgroundColor: !messageProps.seen ? '#8B8B8B' : '#3FBE5F', marginVertical: 1
                }}></NView>
                <NView style={{
                    width: responsiveWidth(1.5), height: responsiveWidth(1.5), borderRadius: responsiveWidth(0.75),
                    backgroundColor: !messageProps.seen ? '#8B8B8B' : '#3FBE5F', marginVertical: 1
                }}></NView>
            </NView>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang.lang,
    rtl: state.lang.rtl,
})

export default connect(mapStateToProps)(MessageReceipt);