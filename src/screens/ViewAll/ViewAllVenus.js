
import React, { Component,useState } from 'react'
import { Text, Wrapper, label, Input, showError, List, Icon, Button, Form, ScrollView, Image, Navigation, View, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import colors from '../../ui/defaults/colors';
import { API_ENDPOINT } from '../../configs';
import Venuecourse from '../../components/Venuecourse';
import { useSelector } from 'react-redux';

const index =(props)=> {
    const user = useSelector(state => state.auth.user);

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
            <TitleHeader Title={I18n.t('allVenus')} />
            <List
              flatlist
              rowRenderer={(item, index) =>
                <Venuecourse data={item} index={index} All Service />}
              // refreshControl={this.props.notifrefresh}
              apiRequest={{
                url: props.Reserved?`${API_ENDPOINT}OrderPlaces/GetOrderVenuePlacesByUserID?id=${user.UserID}`:`${API_ENDPOINT}VenuePlaces`,
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
      </Wrapper>
    )
}

export default  index;