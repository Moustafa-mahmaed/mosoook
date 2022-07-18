import React, { Component, useState } from 'react';
import { View, Text, Wrapper, Button, Navigation, showError } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import ImagePicker from 'react-native-image-picker';
import { UserData } from '../../actions/authActions';
import { API_ENDPOINT } from '../../configs';
import moment from 'moment';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const ImgPickerScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const selectedImage = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const img = {
        uri: response.uri,
        type: response.type ? response.type : 'image/png',
        name: response.fileName ? response.fileName :'fileName'
      };
      setImage(img)
    }
  };

  const onSubmit = values => {

    let formData = new FormData();
    const data = props.data;
    console.log("dad ", data)
    const xxx = {
      UserID: 0,


    }


    Object.keys(props.data).forEach((value, index) => {
      formData.append(value, props.data[value]);
    });
    formData.append('file',image);
    setLoading(true);
    console.log("signup form data >>>  ", formData)

    Axios.post(`${API_ENDPOINT}Users/AddUser`, formData)
      .then(res => {
        console.log("*******************", res.data)
        dispatch(UserData(res.data, true));
        setLoading(false)
        Navigation.init('MAIN_STACK', {
          name: 'Success', passProps: { message:`${I18n.t('Register')}` } 
        });
      })
      .catch(error => {
        setLoading(false)
        // console.log("error ", error)
        console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.response.data);
        }
      });
  };


  return (
    <Wrapper >
      <Header Back />
      <View center >
        <TitleHeader Title={I18n.t('takephoto')} />
        <View borderRadius={200} m={10} >
          <RNImage
            resizeMode="cover"
            source={image ? { uri: image.uri } : require('../../assets/images/avater.png')}
            style={{
              height: 200,
              width: 200,
              backgroundColor: colors.blue,
            }}
          />
        </View>

        <View style={{ justifyContent: 'space-around', }}
          width={100}
          row
        >
          <Button
            title={I18n.t('chooselibrary')}
            width={45}
            size={6}
            onPress={() => {
              ImagePicker.launchImageLibrary(options, (response) => {
                selectedImage(response)
              });
            }}
            m={10}
            backgroundColor={colors.orange}
          />
          <Button
            width={45}
            size={6}
            title={I18n.t('takephotobtn')}
            onPress={() => {
              ImagePicker.launchCamera(options, (response) => {
                selectedImage(response)
              });
            }}
            m={10}
          />
        </View>
        <Button
          // backgroundColor={image != null ? colors.blue : "gray"}
          width={45}
          size={6}
          title={I18n.t('continue')}
          // disabled={image != null ? false : true}
          onPress={loading ? null : onSubmit}
          processing={loading}
          m={10}
        />
      </View>
    </Wrapper>
  );
};

export default ImgPickerScreen;
