import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
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
  const [createChatLoader, createChat, setCreateChatLoader] = useLoaderDispatch<CreateChatPayload, CreateChatResponse>(asyncCreateChat);
  const [messagesLoader, getMessages] = useLoaderDispatch<{ chatRoomId: string }, MessagesResponse>(asyncGetMessagesByChatRoomId);
  const [messageLoader, createMessage] = useLoaderDispatch<CreateChatRoomMessagePayload, CreateChatRoomMessageResponse>(asyncCreateChatRoomMessage);
  const { childId, chatRoomId } = route.params

  const child = useAppSelector(selectChildById(childId));
  const profile = useAppSelector(selectUserProfile);
  const messages = useAppSelector(selectChatRoomMessages(chatRoomId || child?.chatRoomId));

  useLayoutEffect(() => {
    if (chatRoomId) {
      setCreateChatLoader(false)
    }
  }, [])

  const onSend = useCallback(async (msg: IMessage[]) => {
    console.log(msg)
    await createMessage({ chatId: child?.chatRoomId, content: msg[0].text })
  }, [child?.chatRoomId]);

  const handleCreateChatAndLoadMessages = useCallback(async () => {
    let RoomId = chatRoomId || child.chatRoomId

    if (!RoomId) {
      const createRes = await createChat({ parent: child.parent, teacher: child.classroom.teacher, childId })

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
      customHeader={<CustomChatHeader title={child.parent?.parentName || "Parent Name"} />}>
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
        keyboardShouldPersistTaps="handled"
        inverted={false}
        alwaysShowSend={true}
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
        listViewProps={{
          onEndReachedThreshold: 0.5
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
