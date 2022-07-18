import React, { Component } from 'react';
import { View, Text, Image, Icon } from '../../ui';
import colors from '../../ui/defaults/colors';
import { API_ENDPOINT } from '../../configs';

const Row = (props) => {
    const data = props.data;
    const image = data.CourseImagePath.substring(1)
    console.log('iiii ', `${API_ENDPOINT}${data.CourseImagePath.substring(2)}`)
    return (
        <View flex stretch elevation={5} mh={10} mv={5} p={5} borderRadius={5}>
            <View row >
                {data.CourseImagePath ?
                    <Image source={{ uri: `${API_ENDPOINT}${data.CourseImagePath.substring(2)}` }}
                        flex stretch resizeMode={'contain'} mr={5}
                    />
                    :
                    <Icon
                        name="photo"
                        type={'Foundation'}
                        size={35}
                        mr={5}
                        color={colors.graytextC}
                    />
                }
                <View style={{ flex: 2 }}>
                    <Text size={9} color={colors.blue}>{data.Course_Name}</Text>
                    <Text size={7} numberOfLines={2} color={colors.graytextC}>{data.Course_Desc}</Text>

                </View>
                <Icon
                    name="dots-three-vertical"
                    type={'Entypo'}
                    size={10}
                    color={colors.blue}
                />
            </View>
        </View>
    );
};


export default Row;
