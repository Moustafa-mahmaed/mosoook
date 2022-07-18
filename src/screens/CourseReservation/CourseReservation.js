import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../../ui';

import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import { Image as RNImage } from 'react-native'
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';


const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [callingCode, setCallingCode] = useState('966');
    const [countryCode, setCountryCode] = useState('SA')
    const [dark, setDark] = useState(false)
    const [visible, setVisible] = useState(false)

    console.log("props:::>>>", props)
    const onSubmit = values => {
        let formData = new FormData();
        Object.keys(values).forEach((value, index) => {
            console.log('value ', value, ' values ', values[value]);
            if (values[value] !== undefined) {
                formData.append(value, values[value]);
            }

        });
        // setLoading(true);
        // console.log("Reservation  ::: ", formData)

        // Axios
        //     .post(`${API_ENDPOINT}TrainingProviders?email=${user.UserEmail}`, formData)
        //     .then(async res => {
        //         console.log("*******************", res.data)
        //         setLoading(false)
        //         await getUserData()
        //         Navigation.push({ name: 'Success', passProps: { type: 'T' } })
        //     })
        //     .catch(error => {
        //         setLoading(false)
        //         console.log("error ", error)
        //         console.log("error ", error.response)
        //         if (!error.response) {
        //             showError(I18n.t('ui-networkConnectionError'));
        //             return;
        //         } else {
        //             showError(error.response.data.errors);
        //         }
        //     });
    };
    const renderForm = ({ injectFormProps, handleSubmit, setFieldValue, errors }) => (
        <View stretch mh={5}>
            <Text>{I18n.t('email')}</Text>
            <Input
                {...injectFormProps('Email')}
                placeholder={I18n.t('email')}
                email
            />
            <Text>{I18n.t('phone')}</Text>
            <View row mt={-2} stretch>
                <CountryPicker
                    withFlag
                    withCallingCodeButton
                    withAlphaFilter
                    withCallingCode
                    withCurrency
                    withEmoji
                    withModal
                    withFlagButton
                    withFilter
                    onSelect={(country) => {
                        setCallingCode(callingCode)
                        setCountryCode(country.cca2)
                    }}
                    theme={dark ? DARK_THEME : {}}
                    {...{
                        countryCode,
                        excludeCountries: ['SA'],
                        preferredCountries: ['EG', 'SA'],
                        modalProps: {
                            visible,
                        },
                        onClose: () => setVisible(false),
                        onOpen: () => setVisible(true),
                    }}
                />
                <View mt={5}>
                    <Input
                        {...injectFormProps('Phone')}
                        placeholder={I18n.t('phone')}
                        phone
                        width={68}

                    />
                </View>
            </View>
            <Button
                title={I18n.t('Reservation')}
                stretch
                onPress={loading ? null : handleSubmit}
                processing={loading}
                m={10}
                mh={45}
            />
        </View>
    );
    // const { Title, Course_Provider, Price,Rating } = this.props;
    return (
        <Wrapper >
            <ScrollView flex stretch >

                <View stretch flex >
                    <Header Back />
                    <View center pv={5} >
                        <Profile screenName={"CourseMenu"} />


                    </View>
                    <TitleHeader Title={I18n.t('detailsCourse')} />
                    <View stretch row >
                        <View borderRadius={200} m={5} >
                            <RNImage
                                resizeMode="cover"
                                source={user ? { uri: user.ImagePath } : require('../../assets/images/avater.png')}
                                style={{
                                    height: 100,
                                    width: 100,
                                    backgroundColor: colors.blue,
                                }}
                            />
                        </View>
                        <View>
                            <View stretch row mv={2}>
                                <Icon
                                    name="star"
                                    type={'AntDesign'}
                                    size={10}
                                    color={colors.blue}
                                />
                                <Text size={6} mh={3} color={colors.graytextC} >4.4 instructor Rating</Text>
                            </View>
                            <View stretch row >
                                <Icon
                                    name="people"
                                    type={'MaterialIcons'}
                                    size={12}
                                    color={colors.blue}
                                />
                                <Text size={6} mh={3} color={colors.graytextC} >{I18n.t('subscriber') + "  " + 2000}</Text>
                            </View>
                            <View stretch row>
                                <Icon
                                    name="newspaper"
                                    type={'FontAwesome5'}
                                    size={8}
                                    mh={2}
                                    color={colors.blue}
                                />
                                <Text size={6} color={colors.graytextC} >1000 Reviews</Text>
                            </View>
                            <View stretch row mv={3}>
                                <Icon
                                    name="time-slot"
                                    type={'Entypo'}
                                    size={8}
                                    mh={2}
                                    color={colors.blue}
                                />
                                <Text size={6} color={colors.graytextC} >9 Courses</Text>
                            </View>
                        </View>
                    </View>
                    <View mh={5}>
                        <Text color={colors.orange} size={12} bold>{props.Title}</Text>
                        {/* <View stretch row mv={3}>
                                <Icon
                                    name="people"
                                    type={'MaterialIcons'}
                                    size={12}
                                    color={colors.blue}
                                />
                                <Text size={6} mh={3} color={colors.graytextC} >{I18n.t('subscriber') + "  " + Subscribers}</Text>
                            </View> */}
                        {/* <View stretch row>
                                <Icon
                                    name="date"
                                    type={'Fontisto'}
                                    size={8}
                                    mh={2}
                                    color={colors.blue}
                                />
                                <Text size={6} color={colors.graytextC} >{Data}</Text>
                            </View>
                            <View stretch row mv={3}>
                                <Icon
                                    name="time-slot"
                                    type={'Entypo'}
                                    size={8}
                                    mh={2}
                                    color={colors.blue}
                                />
                                <Text size={6} color={colors.graytextC} >{Time}</Text>
                            </View> */}
                    </View>
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >{I18n.t('title')}</Text>
                    </View>
                    <Text mh={5} color={colors.graytextC} >this is a test Text and it can be replace by any text.this is a test Text and it can be replace by any text.this is a test Text and it can be replace by any text.this is a test Text and it can be replace by any text. </Text>
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >{I18n.t('title')}</Text>
                    </View>
                    <Text mh={5} color={colors.graytextC} >this is a test Text and it can be replace by any text.this is a test Text and it can be replace by any text.this is a test Text and it can be replace by any text.this is a test Text and it can be replace by any text. </Text>

                </View>
                <Form
                    schema={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={onSubmit}
                    render={renderForm}
                    validationSchema={validationSchema}
                />
            </ScrollView>
        </Wrapper>
    )
}
export default Login;

