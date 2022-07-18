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
import Row from './Row';

const ActiveHome = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const user = useSelector(state => state.auth.user);

  return (
    <Wrapper >
      <Header showMenu hideBack logoutIcon />



      <Profile screenName={"CourseMenu"} />
      {user.UserType === 'S' ? user.IsActive ?
        <ScrollView flex stretch  p={5}>
          <Input
            borderRadius={20}
            borderWidth={1.5}
            placeholder={I18n.t('search')}
            rightItems={
              <Icon
                name="search"
                type={'EvilIcons'}
                size={14}
                pr={5}
                color={colors.blue}
              />
            }
          />

          <View row pv={5} spaceBetween >
            <Carditem
              Title={I18n.t('Training')}
              imgName={require(`../../assets/images/2.png`)}
              screenName={'ViewAllCourses'}

            />

            <Carditem
              Title={I18n.t('venues')}
              imgName={require(`../../assets/images/1.png`)}
              screenName={'ViewAllVenus'}
            />
          </View>

          <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
            <Text size={8} bold color={colors.blue} >{I18n.t('Courses')}</Text>
          </View>
          <View flex stretch  >
          <List
            flatlist
            rowRenderer={(item, index) =>
              <ServiceCourseItem data={item} index={index} Home/>}
            // refreshControl={this.props.notifrefresh}
            apiRequest={{
              url: `${API_ENDPOINT}Courses`,
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
              <Venuecourse data={item} index={index} Home/>}
              // refreshControl={this.props.notifrefresh}
            apiRequest={{
              url: `${API_ENDPOINT}VenuePlaces`,
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

      {user.UserType === 'T' ? user.IsActive ?
        <ScrollView>
          <TitleHeader Title={I18n.t('myCourses')} />
          <List
            flatlist
            rowRenderer={(item, index) =>
              <Courseitem data={item} index={index} />}
            // refreshControl={this.props.notifrefresh}
            apiRequest={{
              url: `${API_ENDPOINT}Courses/GetCoursesByUserType?id=${user.UserID}&type=${user.UserType}`,
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
            noResultsLabel={I18n.t('noCourses')}

          />
        </ScrollView>
        :
        <View mv={10}>
          <Approved />
        </View>
        :
        null
      }

      {user.UserType === 'V' ?
        user.IsActive ?
          <ScrollView>
            <TitleHeader Title={I18n.t('myPlaces')} />
            <List
              flatlist
              rowRenderer={(item, index) =>
                <Venuecourse data={item} index={index} All />}
              // refreshControl={this.props.notifrefresh}
              apiRequest={{
                url: `${API_ENDPOINT}VenuePlaces/GetVenuePlace?id=${user.UserID}`,
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
              noResultsLabel={I18n.t('noVenus')}

            />

          </ScrollView>
          :
          <View mv={10}>
            <Approved />
          </View>
        :
        null
      }
      {/* 
<ScrollView>  
         <TitleHeader Title={I18n.t('Courses')} />               
        <Courseitem CourseDes="hello every Body can you " 
        CourseName="English" 
        Data="07/10/2020"
        Time="20:20 pm"
        Subscribers="250"
        seats="2500"


        />


             <Courseitem CourseDes="hello every Body can you " 
        CourseName="English" 
        Data="07/10/2020"
        Time="20:20 pm"
        Subscribers="250"
        seats="2500"


        />

         <Courseitem CourseDes="hello every Body can you " 
        CourseName="English" 
        Data="07/10/2020"
        Time="20:20 pm"
        Subscribers="250"
        seats="2500"


        />
</ScrollView>



      {/* {user.UserType !== 'S' &&
        <>
          <TitleHeader Title={I18n.t('Courses')} />
          <List
            flatlist
            // refreshControl={}
            idPathInData={'CourseID'}
            rowRenderer={(data, index) => <Row data={data} index={index} />}
            apiRequest={{
              // url: `${API_ENDPOINT}Courses/GetCoursesByUserType?id=${user.UserID}&type=${user.UserType}`,
              url: `${API_ENDPOINT}Courses/GetCoursesByUserType`,
              params: {
                id: user.UserID,
                type: user.UserType,
              },
              responseResolver: response => {
                console.log("ffffffffffffffffff ", response.data)
                return {
                  data: response.data,
                  // pageCount: response.data.pageCount,
                };
              },
              onError: () => {
                I18n.t('ui-error-happened');
              },
            }}
            noResultsLabel={I18n.t('noCourses')}
          />
        </>
      } */}

    </Wrapper>
  );
};

export default ActiveHome;
