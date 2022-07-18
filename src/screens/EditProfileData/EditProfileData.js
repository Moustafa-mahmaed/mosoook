import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, DatePicker, Picker } from '../../ui';
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import { Image as RNImage } from 'react-native'
import moment from 'moment';
import { UserData } from '../../actions/authActions';
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const SignUp = (props) => {
    const [loading, setLoading] = useState(false);
    const rtl = useSelector(state => state.lang.rtl);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [callingCode, setCallingCode] = useState('966');
    const [countryCode, setCountryCode] = useState('SA')
    const [dark, setDark] = useState(false)
    const [visible, setVisible] = useState(false)

    let Birthday = moment()
    console.log("user Data ::::>>> ", user)
    const selectedImage = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const img = {
                uri: response.uri,
                type: response.type ? response.type : 'image/png',
                name: response.fileName ? response.fileName : 'fileName'
            };
            setImage(img)
        }
    };
    const onSubmit = values => {
        console.log("vvvvvvvvvvvv ", values)
        let formData = new FormData();
        Object.keys(values).forEach((value, index) => {
            console.log('value ', value, ' values ', values[value]);
            if (values[value] !== undefined) {
                formData.append(value, values[value]);
            }
        });

        if (image !== null) {
            formData.append('file', image);
        }

        formData.append('UserID', user.UserID);
        formData.append('UserPassword', user.UserPassword);

        setLoading(true);
        console.log("Edited data form  >>>  ", formData)

        Axios.post(`${API_ENDPOINT}Users/EditUser`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
        })
            .then(res => {
                console.log("******************* response", res.data)
                dispatch(UserData(res.data, true));
                setLoading(false)
                Navigation.push({ name: 'Success', })
            })
            .catch(error => {
                setLoading(false)
                // console.log("error ", error)
                console.log("error ", error.response)
                if (!error.response) {
                    showError(I18n.t('ui-networkConnectionError'));
                    return;
                } else {
                    showError(error.response.data);
                }
            });
        // Navigation.push({ name: 'ImgPickerScreen', passProps: { data: data } })

    };

    const renderForm = ({ injectFormProps, handleSubmit, setFieldValue, errors }) => (
        <View stretch ph={1} mt={5} mh={5} >
            <Text>{I18n.t('firstname')}</Text>
            <Input
                {...injectFormProps('FirstName')}
                placeholder={I18n.t('firstname')}
            />
            <Text>{I18n.t('lastname')}</Text>
            <Input
                {...injectFormProps('LastName')}
                placeholder={I18n.t('lastname')}
            />
            {/* <Text >{I18n.t('email')}</Text>
            <Input
                {...injectFormProps('UserEmail')}
                placeholder={I18n.t('email')}
                email
            /> */}
            <Text>{I18n.t('gender')}</Text>
            <Picker
                {...injectFormProps('Gender')}
                placeholder={user.Gender ? user.Gender : I18n.t('gender')}
                data={[{ label: I18n.t('male'), value: 'Male' }, { label: I18n.t('female'), value: 'Female' }]}
            />
            <Text>{I18n.t('birthday')}</Text>
            <DatePicker
                size={6}
                date
                initialValue={moment(user.Birthday).format('DD/MM/YYYY')}
                onSelect={date => {
                    setFieldValue('Birthday', moment(date).format('DD/MM/YYYY'))
                }}
                placeholder={I18n.t('birthday')}
                momentFormat="YYYY / MM / DD"
                maxDate={new Date()}
                mb={5}
                rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
            />
            {errors.Birthday && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('birthday')} ${I18n.t('required')}`}</Text>}

            <Text>{I18n.t('phonenumber')}</Text>
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
                        {...injectFormProps('PhoneNumber')}
                        placeholder={I18n.t('phonenumber')}
                        phone
                        width={68}

                    />
                </View>
            </View>


            <Button
                title={I18n.t('update')}
                stretch
                onPress={loading ? null : handleSubmit}
                processing={loading}
                mb={10} mt={5}
                mh={45}
            />


        </View >
    );

    return (
        <Wrapper >
            <Header Back />
            <ScrollView flex stretch center >
                <TitleHeader Title={I18n.t('EditProfileData')} />
                <View borderRadius={200} m={5} >
                    <RNImage
                        resizeMode="cover"
                        source={user ? { uri: image ? image.uri : user.ImagePath } : require('../../assets/images/avater.png')}
                        style={{
                            height: 100,
                            width: 100,
                            backgroundColor: colors.blue,
                        }}
                    />

                </View>
                <View row m={10} spaceBetween stretch>
                    <Button
                        title={I18n.t('chooselibrary')}
                        width={45}
                        size={6}
                        onPress={() => {
                            ImagePicker.launchImageLibrary(options, (response) => {
                                selectedImage(response)
                            });
                        }}
                        backgroundColor={colors.orange}
                    />
                    <Button
                        width={30}
                        size={6}
                        title={I18n.t('takephotobtn')}
                        onPress={() => {
                            ImagePicker.launchCamera(options, (response) => {
                                selectedImage(response)
                            });
                        }}
                    />
                </View>
                <Form
                    schema={{
                        FirstName: user.FirstName ? user.FirstName : '',
                        LastName: user.LastName ? user.LastName : '',
                        Gender: user.Gender ? user.Gender : '',
                        UserEmail: user.UserEmail ? user.UserEmail : '',
                        Birthday: user.Birthday ? user.Birthday : '',
                        PhoneNumber: user.PhoneNumber ? user.PhoneNumber : ''
                    }}
                    onSubmit={onSubmit}
                    render={renderForm}
                    validationSchema={validationSchema}
                />
            </ScrollView>

        </Wrapper>
    );
};

export default SignUp;
