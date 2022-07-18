import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, CheckBox, ScrollView, Image, Navigation ,Picker ,DatePicker } from '../../ui';
import { Formik } from 'formik';
import {Image as RNImage} from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Venuecourse from '../../components/Venuecourse';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



const EditProfile = () => {
     const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const [image, setImage] = useState(null);


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
        name: 'fileName'
      };
      setImage(img)
    }
  };


  const onSubmit = values => {
    Navigation.init('MAIN_STACK', {
      rtl: rtl,
      sideMenu: 'SideMenu',
      name: 'Home',
    });
    return
    this.setState({ loading: true });
    Axios
      .post(`${API_ENDPOINT}/create`, values)
      .then(res => {
        this.props.UserData(res.data, this.state.remember);
        this.setState({ loading: false });
        Navigation.pop();
      })
      .catch(error => {
        this.setState({ loading: false });
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.response.data.errors);
        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    <View stretch ph={1} center mt={10} mh={5} >
      
      
   




   
<Picker
      size={7}
       mv={2} 
      
        {...injectFormProps('chairsNo')}
        placeholder={I18n.t('chairsNo')}
       
      />
  <Input
        
       
       
        {...injectFormProps('price')}
        placeholder={I18n.t('price')}
       
      />
      


        
   <View row  mv={4}  style={{ justifyContent: 'space-around', }} width={100}>
      <Picker
      size={7}
      width={40}
        {...injectFormProps('uploadphoto')}
        placeholder={I18n.t('uploadphoto')}
       borderColor={colors.blue}
      />
      <Picker
      size={7}
       width={40}
        {...injectFormProps('uploadphoto')}
        placeholder={I18n.t('uploadphoto')}
       
      />

    </View>
     <View row  mv={4}  style={{ justifyContent: 'space-around', }} width={100}>
      <Picker
      size={7}
      width={40}
        {...injectFormProps('uploadphoto')}
        placeholder={I18n.t('uploadphoto')}
       borderColor={colors.blue}
      />
      <Picker
      size={7}
       width={40}
        {...injectFormProps('uploadphoto')}
        placeholder={I18n.t('uploadphoto')}
       
      />

    </View>

    

      <Button
        title={I18n.t('update')}
        stretch
         onPress={() => Navigation.pop()}

        // onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
        mh={45}
      />
     
     
    </View >
  );


 
    return (
        <Wrapper >
            <Header  Back  />
             <View   center pv={5} >
         {/* <Profile 
         screenName={'VenuProvider'} 
         ProfileName="Taha abd el Rahman"
          ProfileType="Venue Provider" /> */}
            
            </View>
            <TitleHeader Title={I18n.t('edit')} />
 <ScrollView flex stretch center >
        <Form
          schema={{
           
           chairsNo:"",
           uploadphoto:""
           
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

        </Wrapper>
    );
};

export default EditProfile ;
