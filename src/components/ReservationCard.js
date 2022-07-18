import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../ui';

import I18n from 'react-native-i18n';
import colors from '../ui/defaults/colors';
import moment from 'moment'



const ReservationCard = (props) => {
    const { data } = props;
    console.log("data::::::",data)
    const { requesterName, time, date, paid, code, status } = props;
    return (
        <View stretch flex  m={5} ph={3} borderRadius={5} backgroundColor={'#FCFBFB'}  style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: '#999',
            borderWidth: 0.5,
            backgroundColor: '#FFF',
            elevation: 4
          }}>
            <View row stretch spaceBetween>
                <View bbw={2} bbc={colors.orange} mh={5} mv={5} pv={2}>
                    <Text size={6} bold color={colors.blue} >{data?data.FullName:'Mohamed'}</Text>
                </View>
                {status && <View backgroundColor={status == "CANCEL" ? 'red' : colors.blue} p={2} mh={5} borderRadius={3}>
                    <Text size={6} bold color={'white'} >{status == "CANCEL" ? I18n.t(`canceled`) : I18n.t('completed')}</Text>
                </View>}
            </View>
            <View row stretch spaceBetween m={2}>
                <Text size={7} color={colors.blue} >{I18n.t('time')}:</Text>
                <Text size={7} color={colors.orange} >{data?moment(data && data.OrderDate).format("hh:mm"):'12:50'}</Text>
            </View>
            <View row stretch spaceBetween m={2}>

                <Text size={7} color={colors.blue} >{I18n.t('date')}:</Text>
                <Text size={7} color={colors.orange} >{data?moment(data && data.OrderDate).format("DD/MM/YYYY"):'22/7/2020'}</Text>
            </View>
            <View row stretch spaceBetween m={2}>

                <Text size={7} color={colors.blue} >{I18n.t('paid')}:</Text>
                <Text size={7} color={colors.orange} >{data?data.PaymentStatus:`20`} $</Text>
            </View>
            <View row stretch spaceBetween m={2}>

                <Text size={7} color={colors.blue} >{I18n.t('code')}:</Text>
                <Text size={7} color={colors.orange} >{code}</Text>
            </View>
        </View>
    )
}
export default ReservationCard;

