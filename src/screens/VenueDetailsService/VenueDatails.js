
import React, { Component, useState } from 'react'
import { Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, View, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import colors from '../../ui/defaults/colors';
import ContactCard from "../../components/ContactCard"
import ModalCourseStopAD from '../../components/Modal/ModalCourseStopAD';
import ModalCancelCourse from '../../components/Modal/ModalCancelCourse';
import FeedBackCard from '../../components/FeedBackCard';
import moment from 'moment'
import Axios from 'axios';

import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
const CourseDetails = (props) => {
    const { data } = props;
    console.log("Venue Details", data);
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [area, setArea] = useState(false);
    const [food, setFood] = useState(false);
    const [chairs, setChairs] = useState(false);
    const [Reservetion, setReservetion] = useState(props.Reserved?true:false);

    const MakeReservation = () => {
        setLoading(true);
        Axios.post(`${API_ENDPOINT}OrderPlace`,
            {
                 "VenuePlaceID": data.VenuePlaceID,
                 "UserID": user.UserID,
            })
            .then(async res => {
                console.log("*******************", res.data)
                setLoading(false)
                setReservetion(true)
                //   await getUserData();
                Navigation.push({ name: 'Success', })
            })
            .catch(error => {
                setLoading(false)
                console.log("error ", error)
                console.log("error ", error.response)
                if (!error.response) {
                    showError(I18n.t('ui-networkConnectionError'));
                    return;
                } else {
                    showError(error.response.data.errors);
                }
            });
    }
    return (
        <Wrapper >
            <ScrollView flex stretch >

                <View stretch flex  >
                    <Header Back />
                    <View center pv={5} >
                        <Profile
                            screenName={'VenuProvider'}
                            ProfileName="Taha abd el Rahman"
                            ProfileType="Trainer Provider" />

                    </View>
                    <TitleHeader Title={I18n.t('detailsCourse')} />
                    <View stretch center mt={10} >
                        <Image width={95} height={25} borderRadius={5}
                            resizeMode="stretch"
                            source={
                                data && data.Photo1Path ? { uri: data.Photo1Path } :
                                    require('../../assets/images/logo.png')} />
                    </View>
                    <View mh={5} stretch>

                        <Text color={colors.orange} size={12} bold>{data && data.VenuePlace_Name}</Text>


                        <View stretch row >
                            <Icon
                                name="location-pin"
                                type={'Entypo'}
                                size={12}
                                color={colors.graytextC}
                            />
                            <Text size={6} color={colors.graytextC} >{data.VenuePlace_Adress ? data.VenuePlace_Adress : `Cairo/Egypt`}</Text>
                        </View>
                        <View stretch row >
                            <Icon
                                name="place-of-worship"
                                type={'FontAwesome5'}
                                size={8}
                                mh={2}
                                color={colors.graytextC}
                            />
                            <Text size={6} mh={2} color={colors.graytextC} >{data.VenuePlace_Type ? data.VenuePlace_Type : `Public Hall`}</Text>
                        </View>
                        <View row ph={3}>
                            <Icon
                                //  style={{flex:.25}}
                                name="star"
                                type={'AntDesign'}
                                size={8}

                                color={colors.graytextC}
                            />
                            <Text size={6} mh={2} color={colors.graytextC} >4.4 instructor Rating</Text>
                        </View>
                        <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                            <Text size={8} bold color={colors.blue} >Descrption</Text>
                        </View>
                        <Text color={colors.graytextC} >{data && data.VenuePlace_Desc}</Text>

                        <View onPress={() => setArea(!area)}
                            row stretch mv={3} p={2} backgroundColor={colors.gray}>
                            <Icon
                                name={area ? 'down' : "right"}
                                type={'AntDesign'}
                                size={8}
                                color={colors.orange}
                            />
                            <Text mh={2} size={6} color={colors.blue} >{I18n.t('area')}</Text>

                        </View>
                        {area &&
                            <Text mh={2} size={6} color={colors.blue} >{I18n.t('area')}</Text>
                        }
                        <View onPress={() => setFood(!food)}
                            row stretch mv={3} p={2} backgroundColor={colors.gray}>
                            <Icon
                                name={food ? 'down' : "right"}
                                type={'AntDesign'}
                                size={8}
                                color={colors.orange}
                            />
                            <Text mh={2} size={6} color={colors.blue} >{I18n.t('Food')}</Text>

                        </View>
                        {food ?
                            <View stretch>
                                {data.IsDiner && <View row stretch spaceBetween mh={5} >
                                    <View row stretch>
                                        <Icon
                                            name={'primitive-dot'}
                                            type={'Octicons'}
                                            size={8}
                                            color={colors.orange}
                                        />
                                        <Text mh={2} size={6} color={colors.graytextC} >{I18n.t('diner')}</Text>
                                    </View>
                                    <Text mh={2} size={6} color={colors.graytextC} >{data.DinerPrice} $</Text>

                                </View>}
                                {data.IsLunch && <View row stretch spaceBetween mh={5} >
                                    <View row stretch>
                                        <Icon
                                            name={'primitive-dot'}
                                            type={'Octicons'}
                                            size={8}
                                            color={colors.orange}
                                        />
                                        <Text mh={2} size={6} color={colors.graytextC} >{I18n.t('lunch')}</Text>
                                    </View>
                                    <Text mh={2} size={6} color={colors.graytextC} >{data.LunchPrice} $</Text>

                                </View>}
                                {data.IsDiner && <View row stretch spaceBetween mh={5} >
                                    <View row stretch>
                                        <Icon
                                            name={'primitive-dot'}
                                            type={'Octicons'}
                                            size={8}
                                            color={colors.orange}
                                        />
                                        <Text mh={2} size={6} color={colors.graytextC} >{I18n.t('snaks')} {data.IsSnaksHeavy ? "(Heavy)" : "(Light)"}
                                        </Text>
                                    </View>
                                    <Text mh={2} size={6} color={colors.graytextC} >{data.IsSnaksHeavy ? data.SnaksHeavyPrice : data.SnaksLightPrice} $</Text>

                                </View>}
                            </View>
                            : null}
                        <View onPress={() => setChairs(!chairs)}
                            row stretch mv={3} p={2} backgroundColor={colors.gray}>
                            <Icon
                                name={chairs ? 'down' : "right"}
                                type={'AntDesign'}
                                size={8}
                                color={colors.orange}
                            />
                            <Text mh={2} size={6} color={colors.blue} >{I18n.t('chairsNo')}</Text>

                        </View>
                        {chairs && <Text mh={2} size={6} color={colors.blue} >{data.ChairsNo}</Text>}
                        <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                            <Text size={8} bold color={colors.blue} >Place Resume</Text>
                        </View>
                        <View stretch row mh={3} mv={3}>
                            <Icon
                                name="filetext1"
                                type={'AntDesign'}
                                size={8}
                                color={colors.blue}
                            />
                            <Text size={6} mh={2} color={colors.graytextC} >Place Resume</Text>
                        </View>
                        {!Reservetion ? <View  ph={10} mh={25} mv={5} center>
                            <Button
                                title={"Reserve Now"}
                                mh={5}
                                width={45}
                                onPress={()=>loading ? null : MakeReservation()}
                                processing={loading}
                                                            />

                        </View> :
                            <View row ph={10} mh={5} mv={5} center>
                                <Button
                                    title={"cancel reservation"}
                                    backgroundColor={'red'}
                                    mh={5}
                                    width={48}
                                    onPress={() => Navigation.push('CancelReservation')}
                                />
                                <Button
                                    title={'Evalute Place'}
                                    width={40}
                                    mh={5}
                                     onPress={() => Navigation.push({name:'MarkAsComplete',passProps:{Venue:true}})}
                                />
                            </View>}
                    </View>

                </View>
            </ScrollView>
        </Wrapper>
    )
}

export default CourseDetails;
