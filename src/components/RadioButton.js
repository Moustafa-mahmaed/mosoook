import React, {Component} from 'react';
import {View, Icon} from '../ui';

export default class RadioButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {status, value, color,square} = this.props;
    return !status ? (
      <View
        onPress={() => this.props.onPress(value)}
        center
        mh={3}
        touchableOpacity>
        <Icon 
          name={square?"check-box-outline-blank":"circle-o"} 
          type={square?"MaterialIcons":"FontAwesome"}
          color="gray" 
          size={10} />
      </View>
    ) : (
      <View
        onPress={() => this.props.onPress(value)}
        center
        mh={3}
        touchableOpacity>
        <Icon
          name={square?"check-box":"dot-circle-o"}
          type={square?"MaterialIcons":"FontAwesome"}
          color={color ? color : 'primary'}
          size={10}
        />
      </View>
    );
  }
}
