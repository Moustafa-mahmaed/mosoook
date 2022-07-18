
import React, { Component, useState } from 'react';
import { Text, Wrapper, label, Input, showError,List, Icon, Button, Form, ScrollView, Image, Navigation, View, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import colors from '../../ui/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import ReservationCard from "../../components/ReservationCard"
import { API_ENDPOINT } from '../../configs';

const History = (props) => {
    const user = useSelector(state => state.auth.user);
    const { data } = props;
console.log("data::::::",data)
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
                <List
                    flatlist
                    rowRenderer={(item, index) =>
                        <ReservationCard data={item} index={index}  />}
                    // refreshControl={this.props.notifrefresh}
                    apiRequest={{
                        url: `${API_ENDPOINT}Orders/GetOrdersByCourseId?id=${data.CourseID}`,
                        // params: {
                        //   name: this.state.name,
                        // },
                        // headers: {
                        //   Authorization: this.props.token,
                        // },
                        responseResolver: response => {
                            console.log("response.data.length", response.data)
                            return {
                                data: response.data.length === 0 ? [] : response.data.reverse(),
                                // pageCount: response.data.pageCount,
                            };
                        },
                        onError: error => {
                            I18n.t('happen-error');
                            console.log("error", error)
                            console.log("error", error.response)

                        },
                    }}
                    idPathInData={'CourseID'}
                    noResultsLabel={'NO History'}

                />
             
            </ScrollView>
        </Wrapper>
    )
}
export default History;


