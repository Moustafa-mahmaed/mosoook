
import React, { Component, useState } from 'react';
import { Text, Wrapper, label,List, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, View, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import colors from '../../ui/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import ReservationCard from "../../components/ReservationCard";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { backgroundColorStyles } from '../../ui/Base';
import ContactCard from "../../components/ContactCard"
import StarRating from 'react-native-star-rating';
import { API_ENDPOINT } from '../../configs';
const Reservation = (props) => {
    const user = useSelector(state => state.auth.user);
    const { data } = props;
    console.log("data::::::",data)
    const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
    let SelecedDays = {
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: `white`
        },
        '2020-09-05': {
            marked: true, selectedColor: 'blue', disableTouchEvent: false,
        },
    }
    const onDayPress = (day) => {
        setSelected(day.dateString);
    };


    // const { CourseName, CourseDes, Data, Time, Subscribers, seats, ImageUri } = this.props;
    return (
        <Wrapper >
            <ScrollView flex stretch center>
                <View stretch flex >
                    <Header Back />
                    <View center pv={5} >
                        <Profile
                            screenName={'VenuProvider'}
                            ProfileType="Trainer Provider" />
                    </View>
                    <View stretch mv={5} borderRadius={10} mh={5} p={3} style={{

                        overflow: 'hidden',
                        borderColor: '#999',
                        borderWidth: 0.5,
                        backgroundColor: '#FFF',
                        elevation: 4
                    }}
                    >
                        <View stretch spaceBetween row  >
                            <Text size={8} mh={3} color={colors.orange} >North Hall</Text>
                            <Icon
                                name="edit"
                                type={'AntDesign'}
                                size={12}
                                color={colors.blue}
                                onPress={() => Navigation.push('EditProfile')}
                            />
                        </View>
                        <View m={2} row>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={4.5}
                                starSize={15}
                                fullStarColor={colors.orange}
                                emptyStarColor={colors.orange}
                            />
                            <Text mh={5} color={colors.orange} center size={6}>4.5</Text>
                        </View>
                        <View stretch row spaceBetween >
                            <View row stretch>
                                <Icon
                                    name="location-pin"
                                    type={'Entypo'}
                                    size={12}
                                    color={colors.graytextC}
                                />
                                <Text size={6} color={colors.graytextC} >Faysal Giza Egypt</Text>
                            </View>
                            <Text size={5} mh={15} color={colors.blue} >{I18n.t('price') + " : " + 88} $</Text>

                        </View>
                    </View>
                    <TitleHeader Title={I18n.t('Reservation')} />
                </View>
                <List
                    flatlist
                    rowRenderer={(item, index) =>
                        <ReservationCard data={item} index={index}  />}
                    // refreshControl={this.props.notifrefresh}
                    apiRequest={{
                        url: `${API_ENDPOINT}OrderPlaces/GetOrderPlace?id=${data.VenuePlacesID}`,
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
                <View stretch mv={5}>
                    <TitleHeader Title={I18n.t('calender')} />
                    <View width={100} center mv={10}>
                        <Calendar
                            //   testID={testIDs.calendars.FIRST}
                            current={moment().format('YYYY-MM-DD')}
                            // style={styles.calendar}
                            // hideExtraDays
                            hideArrows={false}
                            onDayPress={onDayPress}
                            markedDates={
                                SelecedDays
                            }
                            style={{
                                borderWidth: 1,
                                borderColor: colors.blue,
                                width: 300,
                                borderRadius: 10
                            }}
                            // Specify theme properties to override specific styles for calendar parts. Default = {}
                            theme={{
                                // backgroundColor: 'red',
                                calendarBackground: 'white',
                                textSectionTitleColor: colors.orange,
                                textSectionTitleDisabledColor: 'yellow',
                                selectedDayBackgroundColor: 'red',
                                selectedDayTextColor: 'green',
                                todayTextColor: colors.orange,
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
                                selectedDotColor: 'yellow',
                                disabledArrowColor: 'blue',
                                monthTextColor: colors.orange,
                                indicatorColor: 'green',
                                textDayFontFamily: 'monospace',
                                textMonthFontFamily: 'monospace',
                                textDayHeaderFontFamily: 'monospace',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16,
                                arrowColor: 'red',
                            }}
                        />
                    </View>
                    <View row ph={10} mh={5} center>
                        <Button
                            title={I18n.t('closeReservation')}
                            mh={5}
                            width={45}
                            backgroundColor={'#E62C20'}
                        />
                        <Button
                            title={I18n.t('history')}
                            width={40}
                            mh={5}
                            onPress={() => Navigation.push('History')}
                        />
                    </View>
                    <ContactCard />
                </View>
            </ScrollView>
        </Wrapper>
    )
}
export default Reservation;


