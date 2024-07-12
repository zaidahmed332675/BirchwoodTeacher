import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from 'react-native-gifted-chat';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { asyncCreateChat, asyncCreateChatRoomMessage, asyncGetMessagesByChatRoomId } from '../../Stores/actions/class.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChatRoomMessages, selectChildById } from '../../Stores/slices/class.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { CreateChatPayload, CreateChatResponse, CreateChatRoomMessagePayload, CreateChatRoomMessageResponse, MessagesResponse } from '../../Types/Class';
import { ChatStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

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
  const [createChatLoader, createChat, setCreateChatLoader] = useLoaderDispatch<{ childId: string, data: CreateChatPayload }, CreateChatResponse>(asyncCreateChat);
  const [messagesLoader, getMessages] = useLoaderDispatch<{ chatRoomId: string }, MessagesResponse>(asyncGetMessagesByChatRoomId);
  const [messageLoader, createMessage] = useLoaderDispatch<CreateChatRoomMessagePayload, CreateChatRoomMessageResponse>(asyncCreateChatRoomMessage);
  const { childId, chatRoomId } = route.params

  const child = useAppSelector(selectChildById(childId));
  const profile = useAppSelector(selectUserProfile);
  const messagess = useAppSelector(selectChatRoomMessages(chatRoomId || child?.chatRoomId));

  console.log(messagess, 'messsages')

  useLayoutEffect(() => {
    if (chatRoomId) {
      setCreateChatLoader(false)
    }
  }, [])

  useEffect(() => {
    setMessages([
      {
        _id: 3,
        text: 'When are you comming to pick me up?',
        createdAt: new Date(),
        user: {
          _id: profile?._id,
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
    console.log(msgs)
    // await createMessage()
    // setMessages(previousMessages => GiftedChat.append(previousMessages, msgs));
  }, []);

  const handleCreateChatAndLoadMessages = useCallback(async () => {
    let RoomId = chatRoomId || child.chatRoomId

    if (!RoomId) {
      const createRes = await createChat({ childId, data: { parent: child.parent, teacher: child.classroom.teacher } })

      if (createRes.status && createRes.data) {
        RoomId = createRes.data._id || createRes.data?.chat?._id
      }
    }

    if (RoomId) {
      getMessages({ chatRoomId: RoomId })
    }

  }, [])

  useEffect(() => {
    handleCreateChatAndLoadMessages()
  }, [createChat]);

  if (createChatLoader) {
    return <DataLoader text='Creating Chat Room ...' />;
  }

  if (messagesLoader) {
    return <DataLoader text='Fetching Messages ...' />;
  }

  return (
    <Layout
      customHeader={<CustomChatHeader title={child.parent?.parentName || "Waqas Mumtaz"} />}>
      <GiftedChat
        messagesContainerStyle={styles.messageContainer}
        renderAvatarOnTop={true}
        renderAvatar={null}
        messages={messages}
        // renderMessageText={(test) => <Text>{}</Text>}
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
        // renderMessage={(data) => <View>{}</View>}
        // renderMessageText={(message) => <Text>{message?.}</Text>}
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
          _id: profile?._id,
          name: `${profile?.firstName} ${profile?.lastName}`,
          // avatar: 'https://picsum.photos/id/237/200/300',
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
});

export default CreateChat;
