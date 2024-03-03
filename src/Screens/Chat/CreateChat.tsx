import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from 'react-native-gifted-chat';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { ChatStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { TouchableOpacity } from 'react-native';

type Props = StackScreenProps<ChatStackParams, 'createChat'>;

const CustomChatHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.titlContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VIcon
            type="Ionicons"
            name="chevron-back-outline"
            size={30}
            color={colors.theme.white}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
            }}
            source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
          />
          <Text
            style={{
              color: colors.text.white,
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CreateChat = ({ route }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

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
    <Layout
      _styleSheetView={{
        paddingHorizontal: 10,
      }}
      customHeader={<CustomChatHeader title={route.params?.parentName} />}>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {},
  imageStyle: {},
});

export default CreateChat;
