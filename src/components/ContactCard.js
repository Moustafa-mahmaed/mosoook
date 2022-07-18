
import React, { Component } from 'react'
// import { View, Text, Button, responsiveWidth } from '../ui';
import { Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, View } from '../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'

import colors from '../ui/defaults/colors';
// import { Text, View } from 'react-native'

// import styles from './styles'

export default class index extends Component {
    render() {
        return (
            <View stretch center pv={5} >
                <View stretch flex center backgroundColor={colors.orange} mh={5}  borderRadius={5} m={10} >
                    <View row mh={6} flex bbw={2} pv={5} bbc={'white'}>
                        <Icon mh={5} name={'customerservice'} type={'AntDesign'} size={18} color={'white'} />
                       <View>
                        <Text color={'white'} stretch flex>Need any help</Text>
                        <Text color={'white'} stretch flex>Reach us we are avaliable 24/7 </Text>
                        </View>
                    </View>
                    <View row center mh={5} mt={5}>
                        <Icon mh={5} name={'phone-call'} type={'Feather'} size={12} color={'gray'} />
                        <Text color={'white'} stretch flex>Saudi Customer Call : 92015559685 </Text>
                    </View>
                    <View center mh={5} mb={5}>
                        <Text center color={'white'} stretch flex>You Can Also Find Us on</Text>
                        <View center spaceBetween row stretch mt={2} mh={10}>
                        <Icon mh={5} name={'facebook'} type={'Entypo'} size={10} color={'gray'} />
                        <Icon mh={5} name={'linkedin'} type={'Entypo'} size={10} color={'gray'} />
                        <Icon mh={5} name={'twitter'} type={'Entypo'} size={10} color={'gray'} />
                        <Icon mh={5} name={'youtube'} type={'Entypo'} size={10} color={'gray'} />
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

