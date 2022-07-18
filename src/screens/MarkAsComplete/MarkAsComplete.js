import React, { Component, useState } from 'react';
import { View, Text, Wrapper, Icon, Input, ScrollView, Button, CheckBox, TextArea } from '../../ui';
import I18n from 'react-native-i18n';
import { Formik } from 'formik';
import StarRating from 'react-native-star-rating';

import colors from '../../ui/defaults/colors';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';


const CancelReservation = (props) => {
  const [cousrRate, setCourseRate] = useState(0);
  const [instrucorRate, setInstructorRate] = useState(0);
  const [appRate, setAppRate] = useState(0);
  const [placeRate, setPlaceRate] = useState(0);


  return (
    <Wrapper >
      <Header />
      <ScrollView flex stretch center pv={5} >
        <Profile
          screenName={'ContactUs'}
          ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" />

        <TitleHeader Title={props.Venue?"Evalute Place":`Course Completed`} />

        <View   width={90} stretch ph={10}>
          <View bbw={5} bbc={colors.orange} mh={5} mv={5} pv={2}>
            <Text size={8} bold color={colors.blue} >Evalute Us</Text>
          </View>
          {!props.Venue&&<View row>
            <Text >{I18n.t('ratecourse')} :</Text>
            <StarRating
              // disabled={true}
              maxStars={5}
              rating={cousrRate}
              starSize={20}
              fullStarColor={colors.orange}
              emptyStarColor={colors.orange}
              selectedStar={(rating) => setCourseRate(rating)}

            />
          </View>}

          {!props.Venue&&<View row>
            <Text>{I18n.t('rateInstructor')} :</Text>
            <StarRating
              // disabled={true}
              maxStars={5}
              rating={instrucorRate}
              starSize={20}
              fullStarColor={colors.orange}
              emptyStarColor={colors.orange}
              selectedStar={(rating) => setInstructorRate(rating)}

            />
          </View>}
          <View row>
            <Text >Place Rate : </Text>
            <StarRating
              // disabled={true}
              maxStars={5}
              rating={placeRate}
              starSize={20}
              fullStarColor={colors.orange}
              emptyStarColor={colors.orange}
              selectedStar={(rating) => setPlaceRate(rating)}

            />
          </View>
          <View row>
            <Text >App Rate :</Text>
            <StarRating
              // disabled={true}
              maxStars={5}
              rating={appRate}
              starSize={20}
              fullStarColor={colors.orange}
              emptyStarColor={colors.orange}
              selectedStar={(rating) => setAppRate(rating)}

            />
          </View>
          {/* rate instractor  */}

          <Text size={7} pt={10}>{I18n.t('pstcomment')}</Text>

          <TextArea
            // {...injectFormProps('pstcomment')}
            placeholder={I18n.t('pstcomment')}
            backgroundColor={'white'}
            bw={1} bc={colors.blue}
          />


          <Button stretch title={I18n.t('submit')} mh={20} mv={8}
          />

        </View>
      </ScrollView>


    </Wrapper>
  );
};

export default CancelReservation;
