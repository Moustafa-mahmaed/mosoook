
import React, { Component } from 'react'
// import { View, Text, Button, responsiveWidth } from '../ui';
import { Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, View } from '../ui';
import I18n from 'react-native-i18n';
import { Image as RNImage } from 'react-native'
import moment from "moment"
import colors from '../ui/defaults/colors';
// import { Text, View } from 'react-native'

// import styles from './styles'

export default CourceItem = (props) => {

  const data = props.data;
  console.log("ffffffffffff 0 ", data)
  return (
    <View stretch center pv={5}
      onPress={() => Navigation.push({ name: 'DetailsCourse', passProps: {data:data} })
      }
    >
      <View center flex width={95} style={{
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0.5,

        backgroundColor: '#FFF',

        elevation: 4
      }} >
        <View row flex stretch >
          <RNImage
              resizeMode="cover"
              source={  data.CourseImagePath ? { uri:   data.CourseImagePath } : require('../assets/images/logo.png')}
              style={{
                height: '100%',
                width: 100,
                backgroundColor: colors.blue,
              }}
            />
          <View stretch flex>
            <View stretch flex mh={5}  >
              <Text size={9} color={colors.blue}>{data.Course_Name}</Text>
              <Text stretch size={7} color={colors.graytextC}>{data.Course_Desc}</Text>
            </View>

            <View stretch center pv={3} backgroundColor={colors.gray} >
              <View stretch row m={3}>
                <View stretch row>
                  <Icon
                    name="date"
                    type={'Fontisto'}
                    size={6}
                    color={colors.blue}
                  />
                  <Text size={5} mh={2} color={colors.orange} >{moment(data.CourseStartDate).format("DD/MM/YYYY")}</Text>
                </View>
                <View stretch row mh={8} >
                  <Icon
                    name="people"
                    type={'MaterialIcons'}
                    size={10}
                    color={colors.blue}
                  />
                  <Text size={5} mh={3} color={colors.orange} >{I18n.t('subscriber') + "  " + data.TotalMemebers}</Text>

                </View>
              </View>
              <View stretch row mh={3}>
                <View stretch row >
                  <Icon
                    name="time-slot"
                    type={'Entypo'}
                    size={6}
                    color={colors.blue}
                  />
                  <Text size={5} mh={2} color={colors.orange} >{data.FromTime}</Text>
                </View>
                <Text size={5} mh={15} color={colors.blue} >{I18n.t('price') + " : " + data.Course_Price} $</Text>

              </View>
            </View>

          </View>
        </View>

      </View>
    </View>

  )
}

