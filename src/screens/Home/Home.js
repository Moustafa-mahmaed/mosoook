import React, { Component } from 'react';
import { View, Text, Wrapper } from '../../ui';
import { Image as RNImage } from 'react-native'
import colors from '../../ui/defaults/colors';

import Header from '../../components/Header';
import Carditem from '../../components/Carditem';
import I18n from 'react-native-i18n';


import TitleHeader from '../../components/TitleHeader';
const Home = () => {
    return (
        <Wrapper >
            <Header showMenu hideBack logoutIcon />
            <TitleHeader Title={I18n.t('registeras')} />
            <View flex stretch>
                <View row pv={5} center >
                    <Carditem
                        Title={I18n.t('trainerprovider')}
                        imgName={require(`../../assets/images/1.png`)}
                        screenName={'TrainingProvider'}
                    />

                    <Carditem
                        Title={I18n.t('servicerequister')}
                        imgName={require(`../../assets/images/2.png`)}
                        screenName={'ServiceRequiser'}
                    />
                </View>
                <View row pv={5} >
                    <Carditem
                        Title={I18n.t('venueprovider')}
                        imgName={require(`../../assets/images/3.png`)}
                        screenName={'VenuProvider'} />
                </View>
            </View>
        </Wrapper>
    );
};

export default Home;
