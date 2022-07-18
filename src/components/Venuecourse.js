
import React, { Component } from 'react'
// import { View, Text, Button, responsiveWidth } from '../ui';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../ui';
import I18n from 'react-native-i18n';
import StarRating from 'react-native-star-rating';
import { Image as RNImage } from 'react-native'

import colors from '../ui/defaults/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { Text, View } from 'react-native'

// import styles from './styles'
export default VenueCourse = (props) => {
  const data = props.data
  console.log("fffffffffffffffffff ", data)
  return (
    <View stretch center
    // onPress={() => Navigation.push("venueProviderDetails")}
    >

      {props.All && <View mv={5} flex width={95} style={{

        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0.5,

        backgroundColor: '#FFF',

        elevation: 4
      }}
        onPress={() => props.Service ? Navigation.push({ name: 'VenueDatails', passProps: { data: data,Reserved:props.Reserved } })
          :Navigation.push({ name: 'Reservation', passProps: { data: data } })}

      >
        <View center stretch>
          <RNImage
            resizeMode="cover"
            source={data && data.Photo1Path ? { uri: data.Photo1Path } : require('../assets/images/place.jpg')}
            style={{
              height: 150,
              width: '100%',
              backgroundColor: colors.blue,
            }}
          />
        </View>
        <View stretch mh={3}>
          <Text size={9} mh={3} color={colors.blue}>{data.VenuePlace_Name ? data.VenuePlace_Name : ``}</Text>
          <Text size={7} mh={3} color={colors.graytextC}>{data.VenuePlace_Desc ? data.VenuePlace_Desc : ``}</Text>

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
            <Text size={6} mh={2} color={colors.graytextC} >{data.VenuePlace_Type ? data.VenuePlace_Type : `Puplic Hall`}</Text>
          </View>
          <View mv={2} row>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={data && data.Rating ? data.Rating : 0}
              starSize={15}
              fullStarColor={colors.orange}
              emptyStarColor={colors.orange}
            />
            <Text mh={5} color={colors.orange} center size={6}>{data && data.Rating ? data.Rating : 0}</Text>
          </View>
          <Button
            title={'View Place'}
            stretch
            backgroundColor={'white'}
            color={'#1C4FA0'}
            bw={1}
            bc={Colors.blue}
            m={5}
            onPress={() => props.Service ? Navigation.push({ name: 'VenueDatails', passProps: { data: data,Reserved:props.Reserved } })
            :Navigation.push({ name: 'Reservation', passProps: { data: data } })}
          />
        </View>
      </View>}
      {props.index < 3 && props.Home && <View mv={5} flex width={95} style={{

        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0.5,

        backgroundColor: '#FFF',

        elevation: 4
      }}
        onPress={() => Navigation.push({ name: 'VenueDatails', passProps: { data: data ,Reserved:props.Reserved} })}

      >
        <View center stretch>
          <RNImage
            resizeMode="cover"
            source={data && data.Photo1Path ? { uri: data.Photo1Path } : require('../assets/images/place.jpg')}
            style={{
              height: 150,
              width: '100%',
              backgroundColor: colors.blue,
            }}
          />
        </View>
        <View stretch mh={3}>
          <Text size={9} mh={3} color={colors.blue}>{data.VenuePlace_Name ? data.VenuePlace_Name : ``}</Text>
          <Text size={7} mh={3} color={colors.graytextC}>{data.VenuePlace_Desc ? data.VenuePlace_Desc : ``}</Text>

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
          <View mv={2} row>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={data && data.Rating ? data.Rating : 0}
              starSize={15}
              fullStarColor={colors.orange}
              emptyStarColor={colors.orange}
            />
            <Text mh={5} color={colors.orange} center size={6}>{data && data.Rating ? data.Rating : 0}</Text>
          </View>
          <Button
            title={'View Place'}
            stretch
            backgroundColor={'white'}
            color={'#1C4FA0'}
            bw={1}
            bc={Colors.blue}
            m={5}
            onPress={() => Navigation.push({ name: 'VenueDatails', passProps: { data: data,Reserved:props.Reserved } })}
            />
        </View>
      </View>}
      {props.index == 3 && props.Home &&
        <Button
          title={I18n.t('viewAll')}
          mh={5}
          mv={3}
          width={45}
          backgroundColor={'#F8A71A'}
          onPress={() => Navigation.push({name:'ViewAllVenus',passProps:{Reserved:props.Reserved}})}
          />}
    </View>

  )
}


