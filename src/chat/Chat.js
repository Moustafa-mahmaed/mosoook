import React, {Component} from 'react';
import {View as NView, FlatList, Platform} from 'react-native';
import {View, Text, NetWrapper, moderateScale, Wrapper} from '../ui';
import {connect} from 'react-redux';
import MessageContainer from './MessageContainer';
import MessageInputToolbar from './MessageInputToolbar';
// import { BACKGROUND_DEFAULT, INDECATOR, secondarys, primary } from '../themes/colors';
import {
  getChatforContact,
  clearChat,
  updateSeen,
} from '../actions/Socket/ChatSocket';
import I18n from 'react-native-i18n';
import colors from '../ui/defaults/colors';
import ImagePicker from '../ui/ImagePicker';
import ModalTakePhoto from '../components/Modal/ModalTakePhoto';
import Indicator from '../ui/Indicator';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showActions: false,
      imageFile: null,
    };

    this.page = 1;
  }

  componentDidMount() {
    // this.props.updateSeen({ to: this.props.friend.id });
  }

  componentDidUpdate() {
    // this.props.updateSeen({ to: this.props.friend.id });
  }

  componentWillMount() {
    this.page = 1;
    this.props.getChatforContact(null, this.page);
  }

  componentWillUnmount() {
    this.props.clearChat();
  }

  renderActions() {
    return (
      <ImagePicker
        bgc="white"
        visible={this.state.showActions}
        onClose={() => this.setState({showActions: false})}
        onSuccess={res => {
          this.setState({imageFile: res});
        }}
      />
    );
  }

  renderInputToolbar() {
    return (
      <MessageInputToolbar
        {...this.props}
        image={this.state.imageFile}
        onDeleteImage={() => this.setState({imageFile: null})}
        onActionPressed={() => {
          this.setState({showActions: true});
        }}
      />
    );
  }

  renderMessageContainer({item, index, separator}) {
    //this.props.user.id
    const messageProps = {
      ...item,
      position: item.sender.type !== this.props.user.type ? 'right' : 'left',
      index: index,
      separator: separator,
    };
    return (
      <MessageContainer
        messageProps={messageProps}
        messages={this.props.messages}
      />
    );
  }

  renderFooter() {
    if (this.props.typing) {
      return (
        <NView style={{marginHorizontal: moderateScale(10)}}>
          <Indicator size={8} type="ThreeBounce" color={primary} />
        </NView>
      );
    } else {
      return null;
    }
  }

  renderHeader() {
    if (this.props.loadingChat) {
      return (
        <NView
          style={{
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: moderateScale(10),
          }}>
          <Indicator size={10} color={colors.primary} />
        </NView>
      );
    } else {
      return null;
    }
  }

  renderEmpty() {
    return (
      <NView
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{rotateX: '180deg'}],
        }}>
        <Text type={2} color="black">
          {I18n.t('noConversations')}
        </Text>
      </NView>
    );
  }

  renderBackgroundImage() {
    const {hasBackGround, backGroundImage} = this.props;
    if (hasBackGround) {
      return (
        // <NView style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -10 }}>
        //     <UImage width={100} flex source={backGroundImage ? require('../assets/images/background_dark.png') : require('../assets/images/background_dark.png')}
        //         resizeMode="cover" />
        // </NView>
        null
      );
    } else {
      return null;
    }
  }

  render() {
    const {style, messages} = this.props;
    return (
      <NView style={[{flex: 1, alignSelf: 'stretch'}, style]}>
        <NView
          style={{
            flex: 1,
            alignSelf: 'stretch',
            marginVertical: moderateScale(4),
          }}>
          <FlatList
            style={{flexGrow: 1}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            data={messages}
            inverted={true}
            keyExtractor={item => String(item.id)}
            ListHeaderComponent={() => this.renderFooter()}
            ListFooterComponent={() => this.renderHeader()}
            ListEmptyComponent={() =>
              this.props.loadingChat ? null : this.renderEmpty()
            }
            renderItem={({item, index, separator}) =>
              this.renderMessageContainer({item, index, separator})
            }
            extraData={this.props}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (
                !this.props.loadingChat &&
                this.page < this.props.chatPageCount
              ) {
                this.page++;
                this.props.getChatforContact(null, this.page);
              }
            }}
          />
        </NView>
        <NView style={{alignSelf: 'stretch'}}>
          {this.props.messages &&
          this.props.messages.length > 0 &&
          this.props.messages[0].stopped ? (
            <View stretch center pv={10}>
              <Text color="#A1A1A1" type={3}>
                {I18n.t('notAllowedConversations')}
              </Text>
            </View>
          ) : (
            this.renderInputToolbar()
          )}
        </NView>
        {this.renderActions()}
      </NView>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
  user: state.auth.user,
  messages: state.chat.messages,
  typing: state.chat.typing,
  loadingChat: state.chat.loadingChat,
  chatPageCount: state.chat.chatPageCount,
  messageCount: state.count.messageCount,
});

export default connect(
  mapStateToProps,
  {getChatforContact, clearChat, updateSeen},
)(Chat);
