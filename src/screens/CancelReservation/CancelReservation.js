    import React, { Component } from 'react';
    import { View, Text, Wrapper ,Input  ,ScrollView  ,Button ,CheckBox } from '../../ui';
    import I18n from 'react-native-i18n';
    import { Formik } from 'formik';

    import colors from '../../ui/defaults/colors';

    import Header from '../../components/Header';
    import TitleHeader from '../../components/TitleHeader';
    import Profile from '../../components/Profile';


    const CancelReservation = () => {
    

        return (
            <Wrapper >
                <Header />
            <ScrollView flex stretch center pv={5} >
                <Profile 
            screenName={'ContactUs'} 
            ProfileName="Taha abd el Rahman"
            ProfileType="Trainer Provider" />
            
                <TitleHeader Title={I18n.t('CancelReservation')} />
        
    <View mv={10}  pv={10}  width={90} stretch   ph={10}>
    <Text size={8}> why do you want to cancel ?</Text>
    <CheckBox
            borderColor={colors.blue}
            label="option 1" 
            labelSize={7}  
            labelColor={colors.darkgrey} />

            <CheckBox
            borderColor={colors.blue}
            label="option 2" 
            labelSize={7}  
            labelColor={colors.darkgrey} />

            <CheckBox
            borderColor={colors.blue}
            label="option 3" 
            labelSize={7}  
            labelColor={colors.darkgrey} />

            <CheckBox
            borderColor={colors.blue}
            label="option 4" 
            labelSize={7}  
            labelColor={colors.darkgrey} />
            <CheckBox
            borderColor={colors.blue}
            label="option 5" 
            labelSize={7}  
            labelColor={colors.darkgrey} />
            <Text pv={5}>
        <Text>{I18n.t('consequences')}</Text>
        <Text color={colors.orange} 
        
        style={{textDecorationLine: 'underline'}}
        
        >{I18n.t('readpolicy')}</Text>
            </Text>


            <Text size={6} color={colors.darkgrey} pv={10} >able to strip libraryibjsinspectorp tool for ABI 'X86_64'. Packaging it as is.</Text>



            <Text>{I18n.t('Enteriban')}</Text>

        <Input
            // {...injectFormProps('coursetitle')}
            placeholder={I18n.t('Enteriban')}
        />
        <CheckBox
            borderColor={colors.blue}
            label= {I18n.t('iagree')}
            labelSize={7}  
            labelColor={colors.darkgrey} />
            
    <Button stretch title={I18n.t('cancel')} mh={20} mv={8}
    />

    </View>
        </ScrollView>
        
                
            </Wrapper>
        );
    };

    export default CancelReservation;
