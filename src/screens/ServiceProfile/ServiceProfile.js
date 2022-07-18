import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, List } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';

import { useSelector } from 'react-redux';
import Carditem from '../../components/Carditem';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import Approved from '../../components/Approved';
import Courseitem from '../../components/Courseitem';
import Article from '../../components/Article';
import Venuecourse from '../../components/Venuecourse';
import ServiceCourseItem from '../../components/ServiceCourseItem';



import { API_ENDPOINT } from '../../configs';

const ActiveHome = () => {
    const [loading, setLoading] = useState(false);
    const rtl = useSelector(state => state.lang.rtl);
    const user = useSelector(state => state.auth.user);

    return (
        <Wrapper >
            <Header Back />
            <Profile screenName={"CourseMenu"} />
            {user.UserType === 'S' ? user.IsActive ?
                <ScrollView flex stretch p={5}>


                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >{I18n.t('Courses')}</Text>
                    </View>
                    <View flex stretch  >
                        <List
                            flatlist
                            rowRenderer={(item, index) =>
                                <ServiceCourseItem data={item} index={index} Home Reserved />}
                            // refreshControl={this.props.notifrefresh}
                            apiRequest={{
                                url: `${API_ENDPOINT}Orders/GetOrder?id=${user.UserID}`,
                                // params: {
                                //   name: this.state.name,
                                // },
                                // headers: {
                                //   Authorization: this.props.token,
                                // },
                                responseResolver: response => {
                                    console.log("data::::::>>>> ", response.data)
                                    return {
                                        data: response.data.reverse(),
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
                            noResultsLabel={I18n.t('noCourses')}

                        />
                    </View>
                    <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
                        <Text size={8} bold color={colors.blue} >{I18n.t('venus')}</Text>
                    </View>
                    <View flex stretch  >
                        <List
                            flatlist
                            rowRenderer={(item, index) =>
                                <Venuecourse data={item} index={index} Home Reserved />}
                            // refreshControl={this.props.notifrefresh}
                            apiRequest={{
                                url: `${API_ENDPOINT}OrderPlaces/GetOrderVenuePlacesByUserID?id=${user.UserID}`,
                                // params: {
                                //   name: this.state.name,
                                // },
                                // headers: {
                                //   Authorization: this.props.token,
                                // },
                                responseResolver: response => {
                                    console.log("+++++++++++++++ 0 ", response.data.length)
                                    return {
                                        data: response.data.reverse(),
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
                            noResultsLabel={I18n.t('noVenus')}

                        />
                    </View>
                </ScrollView>
                :
                <View mv={10}>
                    <Approved />
                </View>
                :
                null
            }




        </Wrapper>
    );
};

export default ActiveHome;
