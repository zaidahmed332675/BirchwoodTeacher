import { StackScreenProps } from '@react-navigation/stack';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from 'react-native-gifted-chat';
import { ChatStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<ChatStackParams, 'createChat'>;

const HeaderLeft = () => {
  return (
    <View style={{ marginLeft: 20 }}>
      <Image
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
        }}
        source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
      />
    </View>
  );
};

const CreateChat = ({ navigation, route }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.userName,
      headerLeft: HeaderLeft,
    });
  }, [navigation, route.params.userName]);

  useEffect(() => {
    setMessages([
      {
        _id: 3,
        text: 'I am Coming just wait 2 seconds more please.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Waqas Mumtaz',
          avatar: 'https://picsum.photos/seed/picsum/200/300',
        },
      },
      {
        _id: 2,
        text: 'I am outside of your appartment, be ready.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Waqas Mumtaz',
          avatar: 'https://picsum.photos/seed/picsum/200/300',
        },
      },
      {
        _id: 1,
        text: 'I am coming to pick you up, be ready.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Waqas Mumtaz',
          avatar: 'https://picsum.photos/seed/picsum/200/300',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((msgs: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, msgs));
  }, []);

  return (
    <GiftedChat
      messagesContainerStyle={styles.messageContainer}
      renderAvatarOnTop={true}
      renderAvatar={null}
      messages={messages}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          renderComposer={composerProps => (
            <Composer
              {...composerProps}
              textInputStyle={{
                color: colors.theme.black,
              }}
            />
          )}
        />
      )}
      showAvatarForEveryMessage={true}
      onSend={msgs => onSend(msgs)}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: colors.theme.greyAlt,
              },
              right: {
                backgroundColor: colors.theme.primary,
              },
            }}
          />
        );
      }}
      user={{
        _id: 2,
        name: 'Zaid',
        avatar: 'https://picsum.photos/id/237/200/300',
      }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
  },
  messageContainer: {},
  imageStyle: {},
});

export default CreateChat;
