
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
const CourseDetails = (props) => {
    const { data } = props;

    const [Seats, setSeats] = useState(data.AvailableSeats ? data.AvailableSeats : 0);
    const [EditSeats, setEditSeats] = useState(false);
    const [link, setLink] = useState('');
    const [EditLink, setEditLink] = useState(false);
    const [FeedBack, setFeedBack] = useState(false);
    const [Completed, setCompleted] = useState(false);
    const [visibleModalCourseStopAD, setVisibleStopAdverstingCourse] = useState(false);
    const [visibleModalCancelCourse, setVisibleModalCancelCourse] = useState(false);

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
                                data.CourseImagePath ? { uri: data.CourseImagePath } :
                                    require('../../assets/images/logo.png')} />
                    </View>
                    <View mh={5} stretch>

                        <Text color={colors.orange} size={12} bold>{data.Course_Name}</Text>
                        <Text color={colors.graytextC} >{data.Course_Des}</Text>
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
                                name="date"
                                type={'Fontisto'}
                                size={8}
                                mh={2}
                                color={colors.blue}
                            />
                            <Text size={6} color={colors.graytextC} >{moment(data.CourseStartDate).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View stretch row mv={3}>
                            <Icon
                                name="time-slot"
                                type={'Entypo'}
                                size={8}
                                mh={2}
                                color={colors.blue}
                            />
                            <Text size={6} color={colors.graytextC} >{data.FromTime}</Text>
                        </View>
                        <View stretch row mv={3}>
                            <Icon
                                name="location-pin"
                                type={'Entypo'}
                                size={12}
                                color={colors.blue}
                            />
                            <Text size={6} color={colors.graytextC} >{data.Course_Address}</Text>
                        </View>
                        <View row stretch mv={3} p={2} backgroundColor={colors.gray}>
                            <Icon
                                name="right"
                                type={'AntDesign'}
                                size={8}
                                color={colors.orange}
                            />
                            <Text mh={2} size={6} color={colors.blue} >{I18n.t('subscriber') + " : " + data.TotalMemebers}</Text>

                        </View>
                        <View row spaceBetween stretch mv={3} p={2} backgroundColor={colors.gray}>
                            <View row >
                                <Icon
                                    name={EditSeats ? 'down' : "right"}
                                    type={'AntDesign'}
                                    size={8}
                                    color={colors.orange}
                                />
                                <Text mh={2} size={6} color={colors.blue} >{I18n.t('TotalMemebers') + " : " + Seats}</Text>
                            </View>
                            <Icon
                                name="edit"
                                type={'AntDesign'}
                                size={10}
                                color={colors.orange}
                                onPress={() => setEditSeats(!EditSeats)}
                            />
                        </View>
                        {EditSeats && <Input
                            placeholder={I18n.t('TotalMemebers')}
                            onChange={(value) => {
                                console.log(value);
                                setSeats(value)
                            }}
                        />}
                        <View row spaceBetween stretch mv={3} p={2} backgroundColor={colors.gray}>
                            <View row >
                                <Icon
                                    name={EditLink ? 'down' : "right"}
                                    type={'AntDesign'}
                                    size={8}
                                    color={colors.orange}
                                />
                                <Text mh={2} size={6} color={colors.blue} >{I18n.t('link') + " : " + link}</Text>
                            </View>
                            <Icon
                                name="edit"
                                type={'AntDesign'}
                                size={10}
                                color={colors.orange}
                                onPress={() => setEditLink(!EditLink)}
                            />
                        </View>
                        {EditLink && <Input
                            placeholder={I18n.t('link')}
                            onChange={(value) => {
                                console.log(value);
                                setLink(value)
                            }}
                        />}
                    </View>
                    {!Completed && <View stretch>
                        <View row ph={10} mh={5} mv={5} center>
                            <Button
                                title={"Stop Adversting"}
                                mh={5}
                                width={45}
                                backgroundColor={'#E62C20'}
                                onPress={() => setVisibleStopAdverstingCourse(true)}
                            />
                            <Button
                                title={'Complete'}
                                width={40}
                                mh={5}
                                onPress={() => (setCompleted(true), setFeedBack(true))}
                            />
                        </View>
                        <View row ph={10} mh={5} mv={5} center>
                            <Button
                                title={'Cancel Course'}
                                mh={5}
                                width={45}
                                backgroundColor={'#E62C20'}
                                onPress={() => setVisibleModalCancelCourse(true)}

                            />
                            <Button
                                title={'Confirm'}
                                width={40}
                                mh={5}
                                onPress={() => Navigation.push('Confirmation')}
                            />
                        </View>
                    </View>}
                    <View stretch mv={5} center>
                    <Button
                        title={'Reservations'}
                        width={40}
                        mh={5}
                        backgroundColor={'black'}
                        onPress={() => Navigation.push({name:'CourseHistory',passProps:{data:data}})}
                    />
                    </View>
                    {FeedBack &&
                        <View stretch>
                            <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                                <Text size={8} bold color={colors.blue} >{I18n.t('feedBack')}</Text>
                            </View>
                            <FeedBackCard
                                Name={'Mohamed'}
                                Rating={4.5}
                                Content={'this is the Feedback message'}
                            />
                            <FeedBackCard
                                Name={'Mohamed'}
                                Rating={4.5}
                                Content={'this is the Feedback message'}
                            />
                        </View>
                    }

                    <ContactCard />
                    <ModalCourseStopAD
                        visible={visibleModalCourseStopAD}
                        changeState={() => {
                            setVisibleStopAdverstingCourse(false);
                        }}
                        title={'No one can register on this course'}
                        onDone={() => {

                        }}
                    // loading={loadingFav}
                    />
                    <ModalCancelCourse
                        visible={visibleModalCancelCourse}
                        changeState={() => {
                            setVisibleModalCancelCourse(false);
                        }}
                        title={'Policy of canceling an the consequence of canelling '}
                        onDone={() => {

                        }}
                    // loading={loadingFav}
                    />
                </View>
            </ScrollView>
        </Wrapper>
    )
}

export default CourseDetails;
