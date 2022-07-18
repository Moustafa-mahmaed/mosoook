import React, { Component } from 'react'
import { View, Text, Button, responsiveWidth, Navigation } from '../ui';
import { Image as RNImage } from 'react-native'
import colors from '../ui/defaults/colors';
// import { Text, View } from 'react-native'
import StarRating from 'react-native-star-rating';

// import styles from './styles'

export default class index extends Component {
  render() {
    const { Title, Course_Provider, Price,Rating } = this.props;
    return (
      <View stretch mv={5} borderRadius={10} style={{

        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        elevation: 4
      }}
        onPress={() => Navigation.push({ name: 'CourseReservation', passProps: { Title, Course_Provider, Price,Rating  } })}
      >
        <View stretch center>
          <RNImage source={require('../assets/images/logo.png')}
            style={{ width: '100%', height: 100 }} resizeMode='stretch'
          />
        </View>
        <View m={3}>
          <Text color={colors.orange} bold size={8}>{Title}</Text>
          <Text color={colors.graytextC} size={6}>{Course_Provider}</Text>
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
          <View center pv={2} backgroundColor={colors.orangeOpacity} width={80} mv={3}>
            <Text center size={6}>{Price} $</Text>
          </View>
        </View>
      </View>
    )
  }
}

