import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../ui';

import I18n from 'react-native-i18n';
import colors from '../ui/defaults/colors';
import StarRating from 'react-native-star-rating';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const ReservationCard = (props) => {

    const { Name, Content,Rating } = props;
    return (
        <View stretch  m={5} p={3} borderRadius={5}style={{

            borderRadius: 10,
            overflow: 'hidden',
            borderColor: '#999',
            borderWidth: 0.5,
            backgroundColor: '#FFF',
  
            elevation: 4
          }}>
            <Text size={6} bold color={colors.graytextC} >{Name}</Text>
            <View mv={2} row>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={Rating}
                    starSize={15}
                    fullStarColor={colors.orange}
                    emptyStarColor={colors.orange}
                />
                <Text mh={5} color={colors.orange} center size={6}>{Rating}</Text>
            </View>
            <Text size={6} bold color={colors.graytextC} >{Content}</Text>

        </View >
    )
}
export default ReservationCard;

