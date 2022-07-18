
import React, { Component, useState } from 'react';
import { Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, View, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import colors from '../../ui/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import ReservationCard from "../../components/ReservationCard"
const History = (props) => {
    const user = useSelector(state => state.auth.user);

        // const { CourseName, CourseDes, Data, Time, Subscribers, seats, ImageUri } = this.props;
        return (
            <Wrapper >
                <ScrollView flex stretch >
                    <View stretch flex >
                        <Header Back />
                        <View center pv={5} >
                            <Profile
                                screenName={'VenuProvider'}
                                ProfileType="Trainer Provider" />
                        </View>
                        <TitleHeader Title={I18n.t('history')} />
                        </View>
                        <ReservationCard 
                         requesterName={'Mohamed Ragab'}
                         time={`8:00 pm -  9:00 pm`}
                         date={'20/8/2020'}
                         paid={30}
                         code={2050}
                         status={"CANCEL"}
                        />
                         <ReservationCard 
                         requesterName={'Mohamed Ragab'}
                         time={`8:00 pm -  9:00 pm`}
                         date={'20/8/2020'}
                         paid={30}
                         code={2050}
                         status={"COMPLETE"}
                        />
                </ScrollView>
            </Wrapper>
        )
    }
    export default History;


