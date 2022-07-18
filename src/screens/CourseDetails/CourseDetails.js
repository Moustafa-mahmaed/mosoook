
import React, { Component, useState } from 'react'
import { Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, View, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import colors from '../../ui/defaults/colors';
import moment from 'moment'
import Axios from 'axios';

import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
const index = (props) => {
    const { data } = props;
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);

    console.log("course data", data,"user:::",props.Reserved);
    const [Reservetion, setReservetion] = useState(props.Reserved?true:false);
    // const { CourseName, CourseDes, Data, Time, Subscribers, seats, ImageUri } = this.props;
    const MakeReservation = () => {
        setLoading(true);
        Axios.post(`${API_ENDPOINT}Orders/BookOrder`,
            {
                 "CourseID": data.CourseID,
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

                <View stretch flex >
                    <Header Back />
                    <View center pv={5} >
                        <Profile
                            screenName={'VenuProvider'}
                            ProfileName="Taha abd el Rahman"
                            ProfileType="Trainer Provider" />

                    </View>
                    <TitleHeader Title={I18n.t('detailsCourse')} />
                    <View stretch center mv={10} >
                        <Image width={95} height={20} borderRadius={5}
                            resizeMode="stretch"
                            source={
                                data && data.CourseImagePath ? { uri: data.CourseImagePath } :
                                    require('../../assets/images/logo.png')} />
                    </View>
                    <View mh={5}>
                        <Text color={colors.orange} size={12} bold>{data && data.Course_Name}</Text>
                        <Text color={colors.graytextC} >{data && data.Course_Desc}</Text>
                        {/* <View stretch row mv={3}>
                            <Icon
                                name="people"
                                type={'MaterialIcons'}
                                size={12}
                                color={colors.blue}
                            />
                            <Text size={6} mh={3} color={colors.graytextC} >{I18n.t('subscriber') + "  " + Subscribers}</Text>
                        </View> */}
                        <View stretch row mv={3}>
                            <Icon
                                name="time-slot"
                                type={'Entypo'}
                                size={8}
                                mh={2}
                                color={colors.blue}
                            />
                            <Text size={6} color={colors.graytextC} >{data && data.FromTime}</Text>
                        </View>
                        <View stretch row>
                            <Icon
                                name="date"
                                type={'Fontisto'}
                                size={8}
                                mh={2}
                                color={colors.blue}
                            />
                            <Text size={6} color={colors.graytextC} >{moment(data && data.CourseStartDate).format("DD/MM/YYYY")}</Text>
                        </View>

                    </View>
                    <View stretch row mh={3} mv={3}>
                        <Icon
                            name="location-pin"
                            type={'Entypo'}
                            size={12}
                            color={colors.blue}
                        />
                        <Text size={6} color={colors.graytextC} >{data && data.Course_Address}</Text>
                    </View>
                    {!Reservetion ? <View row ph={10} mh={5} mv={5} center>
                        <Button
                            title={"Reserve Now"}
                            mh={5}
                            width={45}
                            onPress={()=>loading ? null : MakeReservation()}
                            processing={loading}
                        />
                        <Button
                            title={'WishList'}
                            width={40}
                            backgroundColor={'white'}
                            color={'#1C4FA0'}
                            bw={1} bc={'#1C4FA0'}
                            mh={5}
                            leftIcon={<Icon
                                name="hearto"
                                type={'AntDesign'}
                                size={8}
                                color={colors.orange}
                            />}
                        //  onPress={() =>(setCompleted(true),setFeedBack(true))}
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
                                title={'completed'}
                                width={40}
                                mh={5}

                                onPress={() => Navigation.push('MarkAsComplete')}
                            />
                        </View>}
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >{I18n.t('Course_Desc')}</Text>
                    </View>
                    <Text mh={5} color={colors.graytextC} >{data && data.Course_Desc} </Text>
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >Advantages</Text>
                    </View>
                    <Text mh={5} color={colors.graytextC} >{data && data.Advantages} </Text>
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >For How</Text>
                    </View>
                    <Text mh={5} color={colors.graytextC} >{data && data.ForHow} </Text>
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >Attachments</Text>
                    </View>
                    <View stretch row mh={3} mv={3}>
                        <Icon
                            name="filetext1"
                            type={'AntDesign'}
                            size={8}
                            color={colors.blue}
                        />
                        <Text size={6} mh={2} color={colors.graytextC} >{I18n.t('detailsCourse')}</Text>
                    </View>
                    <View stretch row mh={3} mv={3}>
                        <Icon
                            name="filetext1"
                            type={'AntDesign'}
                            size={8}
                            color={colors.blue}
                        />
                        <Text size={6} mh={2} color={colors.graytextC} >{I18n.t('courseSchedule')}</Text>
                    </View>
                    <View row stretch>
                        <View stretch >
                            <View borderRadius={150} m={5}  >
                                <RNImage
                                    resizeMode="cover"
                                    source={
                                        // user ? { uri: image ? image.uri : user.ImagePath } :
                                        require('../../assets/images/avater.png')}
                                    style={{
                                        height: 100,
                                        width: 100,
                                        backgroundColor: colors.blue,
                                    }}
                                />
                            </View>
                            <Text size={8} mh={5} color={colors.graytextC} >{data && data.InstructorName}</Text>

                        </View>
                        <View>
                            <View row ph={3}>
                                <Icon
                                    //  style={{flex:.25}}
                                    name="star"
                                    type={'AntDesign'}
                                    size={8}

                                    color={colors.orange}
                                />
                                <Text size={6} mh={2} color={colors.graytextC} >4.4 instructor Rating</Text>
                            </View>
                            <View row ph={3}>
                                <Icon
                                    //  style={{flex:.25}}
                                    name="preview"
                                    type={'Fontisto'}
                                    size={8}

                                    color={colors.orange}
                                />
                                <Text size={6} mh={2} color={colors.graytextC} >500 Review</Text>
                            </View>
                            <View stretch row ph={3}>
                                <Icon
                                    name="people"
                                    type={'MaterialIcons'}
                                    size={10}
                                    color={colors.orange}
                                />
                                <Text size={6} mh={3} color={colors.graytextC} >11,500 students</Text>
                            </View>
                            <View row ph={3}>
                                <Icon
                                    //  style={{flex:.25}}
                                    name="playcircleo"
                                    type={'AntDesign'}
                                    size={8}

                                    color={colors.orange}
                                />
                                <Text size={6} mh={2} color={colors.graytextC} >9 courses</Text>
                            </View>
                        </View>
                    </View>
                    <View stretch row mh={3} mv={3}>
                        <Icon
                            name="filetext1"
                            type={'AntDesign'}
                            size={8}
                            color={colors.blue}
                        />
                        <Text size={6} mh={2} color={colors.graytextC} >Instructor Resume</Text>
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    )
}
export default index
