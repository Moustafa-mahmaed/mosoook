import React, { Component, useState } from 'react';
import { View, Text, Wrapper, TextArea, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import moment from 'moment';
import { UserData } from '../../actions/authActions';
import Profile from '../../components/Profile';
import RadioButtonRN from 'radio-buttons-react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ContactCard from '../../components/ContactCard'
const TrainingProvider = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    // console.log("uuuuuuuuuuuuuuuuuuuuuu ", user)
    const rtl = useSelector(state => state.lang.rtl);
    const [ CourseSchedule, setCourseSchedule] = useState(null);
    const [Virtual, setVirtuale] = useState(false);


    const dispatch = useDispatch();

    const choiceFiles = (type, setFieldValue) => {
        let permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.MEDIA_LIBRARY
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        request(permission).then(async result => {
            switch (result) {
                case RESULTS.GRANTED:
                    try {
                        const res = await DocumentPicker.pick({
                            type: [DocumentPicker.types.allFiles],
                        });
                        if (
                            res.name.includes('.pdf') ||
                            res.name.includes('.docx') ||
                            res.name.includes('.doc') ||
                            res.name.includes('.xlsx') ||
                            res.name.includes('.xlsm') ||
                            res.name.includes('.xlsb')
                        ) {
                            console.log("rrrr ", res)
                            let data = {
                                uri: res.uri,
                                type: res.type,
                                name: res.name,
                            };
                            if (type === 'CourseSchedule') {
                                setCourseSchedule(data);
                                setFieldValue('CourseSchedule', data)
                            }
                            else if (type === 'TrainingDetails') {
                                setTrainingDetails(data)
                                setFieldValue('TrainingDetails', data)
                            }
                            else if (type === 'imgfile') {
                                setimgfile(data)
                                setFieldValue('imgfile', data)
                            }
                            else if (type === 'PreWork') {
                                setPreWork(data)
                                setFieldValue('PreWork', data)
                            }
                        } else if (
                            res.name.includes('.png') ||
                            res.name.includes('.jpg') ||
                            res.name.includes('.jpeg')
                        ) {
                            let data = {
                                uri: res.uri,
                                type: res.type ? res.type : 'image/png',
                                name: res.name ? res.name : 'fileName',
                            };
                            if (type === 'CourseSchedule') {
                                setCourseSchedule(data);
                                setFieldValue('CourseSchedule', data)
                            }
                            else if (type === 'TrainingDetails') {
                                setTrainingDetails(data)
                                setFieldValue('TrainingDetails', data)
                            }
                            else if (type === 'imgfile') {
                                setimgfile(data)
                                setFieldValue('imgfile', data)
                            }
                            else if (type === 'PreWork') {
                                setPreWork(data)
                                setFieldValue('PreWork', data)
                            }
                        } else {
                            setTimeout(() => {
                                showError(I18n.t('This file is not supported'));
                            }, 1000);
                        }
                    } catch (err) {
                        if (DocumentPicker.isCancel(err)) {
                            // User cancelled the picker, exit any dialogs or menus and move on
                        } else {
                            throw err;
                        }
                    }
                    break;
            }
        });
    };
    const choiceImage = (type, setFieldValue) => {
        let permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.MEDIA_LIBRARY
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        request(permission).then(async result => {
            switch (result) {
                case RESULTS.GRANTED:
                    try {
                        const res = await DocumentPicker.pick({
                            type: [DocumentPicker.types.images],
                        });
                        if (
                            res.name.includes('.png') ||
                            res.name.includes('.jpg') ||
                            res.name.includes('.jpeg')
                        ) {
                            let data = {
                                uri: res.uri,
                                type: res.type ? res.type : 'image/png',
                                name: res.name ? res.name : 'fileName',
                            };
                            if (type === 'CourseSchedule') {
                                setCourseSchedule(data);
                                setFieldValue('CourseSchedule', data)
                            }
                            else if (type === 'TrainingDetails') {
                                setTrainingDetails(data)
                                setFieldValue('TrainingDetails', data)
                            }
                            else if (type === 'imgfile') {
                                setimgfile(data)
                                setFieldValue('imgfile', data)
                            }
                            else if (type === 'UploadPhoto2') {
                                setUploadPhoto2(data)
                                setFieldValue('UploadPhoto2', data)
                            }
                        } else {
                            setTimeout(() => {
                                showError(I18n.t('This file is not supported'));
                            }, 1000);
                        }
                    } catch (err) {
                        if (DocumentPicker.isCancel(err)) {
                            // User cancelled the picker, exit any dialogs or menus and move on
                        } else {
                            throw err;
                        }
                    }
                    break;
            }
        });
    };
    const onSubmit = values => {
        Navigation.pop();
        let formData = new FormData();
        Object.keys(values).forEach((value, index) => {
            console.log('value ', value, ' values ', values[value]);
            if (values[value] !== undefined) {
                formData.append(value, values[value]);
            }

        });
        // setLoading(true);
        console.log("Add new course data : ", formData)

        // Axios
        //     .post(`${API_ENDPOINT}Courses`, formData)
        //     .then(async res => {
        //         console.log("*******************", res.data)
        //         setLoading(false)
        //         Navigation.push({ name: 'Success', passProps: { type: 'T', message: `${I18n.t('addNewCourse')}` } })
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
        <View stretch ph={1} mt={10} mh={5} >


            <View flex stretch row spaceBetween >
                <Text>{I18n.t('CourseStartDate')}</Text>
                <Text>{I18n.t('CourseEndDate')}</Text>
            </View>
            <View flex stretch row spaceBetween >
                <View stretch>
                    <DatePicker
                        size={6}
                        date
                        width={45}
                        onSelect={date => {
                            setFieldValue('CourseStartDate', moment(date).format('DD/MM/YYYY'))
                        }}
                        placeholder={I18n.t('CourseStartDate')}
                        momentFormat="YYYY / MM / DD"
                        // maxDate={new Date()}
                        mb={errors.CourseStartDate ? 2 : 5}
                        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
                    />
                    {errors.CourseStartDate && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('CourseStartDate')} ${I18n.t('required')}`}</Text>}
                </View>
                <View stretch>
                    <DatePicker
                        size={6}
                        date
                        width={45}
                        onSelect={date => {
                            setFieldValue('CourseEndDate', moment(date).format('DD/MM/YYYY'))
                        }}
                        placeholder={I18n.t('CourseEndDate')}
                        momentFormat="YYYY / MM / DD"
                        // maxDate={new Date()}
                        mb={errors.CourseEndDate ? 2 : 5}
                        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
                    />
                    {errors.CourseEndDate && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('CourseEndDate')} ${I18n.t('required')}`}</Text>}
                </View>
            </View>
            <View flex stretch row spaceBetween >
                <Text>{I18n.t('FromTime')}</Text>
                <Text>{I18n.t('ToTime')}</Text>
            </View>
            <View flex stretch row spaceBetween >
                <View stretch>
                    <DatePicker
                        size={6}
                        time
                        width={45}
                        onSelect={time => {
                            setFieldValue('FromTime', moment(time).format('hh:mm:ss'))
                        }}
                        placeholder={I18n.t('FromTime')}
                        momentFormat="hh : mm a"
                        maxDate={new Date()}
                        mb={errors.FromTime ? 2 : 5}
                        rightItems={<Icon name='access-time' type={'MaterialIcons'} size={10} color={colors.blue} pr={5} />}
                    />
                    {errors.FromTime && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('FromTime')} ${I18n.t('required')}`}</Text>}
                </View>
                <View stretch>

                    <DatePicker
                        size={6}
                        time
                        width={45}
                        onSelect={time => {
                            setFieldValue('ToTime', moment(time).format('hh:mm:ss'))
                        }}
                        placeholder={I18n.t('ToTime')}
                        momentFormat="hh : mm a"
                        maxDate={new Date()}
                        mb={errors.ToTime ? 2 : 5}
                        rightItems={<Icon name='access-time' type={'MaterialIcons'} size={10} color={colors.blue} pr={5} />}
                    />
                    {errors.ToTime && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('ToTime')} ${I18n.t('required')}`}</Text>}
                </View>
            </View>
            {Virtual ?
                <View stretch>
                    <Text>{I18n.t('onlinelink')}</Text>
                    <Input
                        {...injectFormProps('onlinelink')}
                        placeholder={I18n.t('onlinelink')}

                    />
                </View> :
                <View stretch>
                    <Text>{I18n.t('location')}</Text>
                    <Input
                        {...injectFormProps('Course_Address ')}
                        placeholder={I18n.t('location')}

                    />
                </View>}

            <Text>{I18n.t('courseSchedule')}</Text>
            <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
                backgroundColor='white' bc={colors.blue}
                onPress={() => {
                    choiceFiles('CourseSchedule', setFieldValue)
                }}
            >
                <Text numberOfLines={1} size={ CourseSchedule ? 5 : 7}>{ CourseSchedule ?  CourseSchedule.name : I18n.t('uploadfile')}</Text>
                <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
            </View>
            {errors. CourseSchedule && <Text size={5.5} color={colors.error}>{`${I18n.t('courseSchedule')} ${I18n.t('required')}`}</Text>}

            <Button
                title={I18n.t('confirm')}
                stretch
                onPress={loading ? null : handleSubmit}
                processing={loading}
                m={10}
                mh={45}
            />


        </View >
    );

    return (
        <Wrapper >
            <Header Back />
            <View center pv={5} >
                <Profile />
            </View>
            <ScrollView flex stretch center >
                <TitleHeader Title={I18n.t('Confirmation')} />
                <View stretch>
                <Form
                    schema={{
                        CourseOwnerUserID: user.UserID,
                        // CourseOwnerType: user.UserType,
                        SpecialityID: '',
                        Course_Name: '',
                        Course_Price: '0',
                        FromTime: '',
                        ToTime: '',
                        CourseStartDate: '',
                        CourseEndDate: '',
                        CountryID: '',
                        InstructorName: '',
                        Objectives: '',
                        Course_Desc: ' ',
                        ForHow: '',
                        // AvailableSeats: '',
                        CityID: '',
                         CourseSchedule: '',
                        TrainingDetails: '',
                        Course_Period: '0',
                        Advantages: '',
                        // place:'',
                        PeriodWithHours: '',
                        // onlinelink:'',
                        imgfile: '',
                        Type: '',
                        Course_Address :'',

                    }}
                    onSubmit={onSubmit}
                    render={renderForm}
                    validationSchema={validationSchema}
                />
                </View>
                <ContactCard />
            </ScrollView>

        </Wrapper>
    );
};

export default TrainingProvider;
