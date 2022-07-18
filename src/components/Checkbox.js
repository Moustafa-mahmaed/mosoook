import React, {Component} from 'react';
import {View, Text, Icon} from '../ui';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
    };
  }

  render() {
    const {status} = this.state;
    const status1 = this.props.status;
    return this.props.question ? (
      !status1 ? (
        <View
          onPress={() => {
            this.props.onPress && this.props.onPress(true, this.props.value);
          }}
          center
          mh={3}
          touchableOpacity>
          <Icon
            name="square-o"
            type="FontAwesome"
            color={this.props.color ? this.props.color : 'primary'}
            size={8}
          />
        </View>
      ) : (
        <View
          onPress={() => {
            this.props.onPress && this.props.onPress(false, this.props.value);
          }}
          center
          mh={3}
          touchableOpacity>
          <Icon
            name="check-square-o"
            type="FontAwesome"
            color={this.props.color ? this.props.color : 'primary'}
            size={8}
          />
        </View>
      )
    ) : !status1 ? (
      <View
        onPress={() => {
          this.props.onPress && this.props.onPress(true, this.props.value);
          this.setState({status: true});
        }}
        center
        mh={3}
        touchableOpacity>
        <Icon name="square-o" type="FontAwesome" color={'#707070'} size={10} />
      </View>
    ) : (
      <View
        onPress={() => {
          this.props.onPress && this.props.onPress(false, this.props.value);
          this.setState({status: false});
        }}
        center
        mh={3}
        touchableOpacity>
        <Icon
          name="checksquareo"
          type="AntDesign"
          color={this.props.color ? this.props.color : 'primary'}
          size={11}
        />
      </View>
    );
  }
}
