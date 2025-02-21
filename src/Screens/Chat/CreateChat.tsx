import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar
} from 'react-native-gifted-chat';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { asyncCreateChat, asyncCreateChatRoomMessage, asyncGetMessagesByChatRoomId } from '../../Stores/actions/class.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChatRoomMessages, selectChatRoomPagination, selectChildById, setChatRoomMessage } from '../../Stores/slices/class.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { colors } from '../../Theme/colors';
import { ChatStackParams } from '../../Types/NavigationTypes';
import { socket } from '../../Utils/socket';
import { vh } from '../../Utils/units';
import { ImageBox } from '../../Components/UploadImage';

type Props = StackScreenProps<ChatStackParams, 'createChat'>;

const CustomChatHeader = ({ title, subTitle, image }: { title: string, subTitle: string, image: any }) => {
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
          <ImageBox
            image={{ uri: image }}
            _imageStyle={{
              width: 40,
              height: 40,
              borderRadius: 50,
            }}
          />
          <View style={{
            marginLeft: 10,
          }}>
            <Text
              style={{
                color: colors.text.white,

                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {title}
            </Text>
            {subTitle && <Text
              style={{
                color: colors.text.white,
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              {subTitle}
            </Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

const CreateChat = ({ route }: Props) => {

  const dispatch = useAppDispatch();

  const [createChatLoader, createChat, setCreateChatLoader] = useLoaderDispatch(asyncCreateChat);
  const [messagesLoader, getMessages] = useLoaderDispatch(asyncGetMessagesByChatRoomId);
  const [_, createMessage] = useLoaderDispatch(asyncCreateChatRoomMessage);

  const { childId, chatRoomId } = route.params

  const child = useAppSelector(selectChildById(childId));
  const profile = useAppSelector(selectUserProfile);
  const messages = useAppSelector(selectChatRoomMessages(chatRoomId || child?.chats?._id));
  const messagesPagination = useAppSelector(selectChatRoomPagination(chatRoomId || child?.chats?._id));

  const handleNewMessage = (record: any) => {
    let { sender, reciever, ...data } = record
    dispatch(setChatRoomMessage({
      chatRoomId: record?.chat,
      message: {
        sender: sender?._id,
        ...data
      }
    }))
  }

  useLayoutEffect(() => {
    if (chatRoomId) {
      setCreateChatLoader(false)
    }
  }, [])

  useEffect(() => {
    socket.emit('join chat', child?.chats?._id);
    socket.on('message', handleNewMessage)

    return () => {
      socket.off('message', handleNewMessage)
    }
  }, [child?.chats?._id])

  const onSend = useCallback(async (msg: IMessage[]) => {
    let res = await createMessage({ chatId: child?.chats?._id, content: msg[0].text, senderType: 'teacher' })
    if (res.status) {
      socket.emit('new message', {
        senderType: 'teacher',
        reciever: child.parent?._id,
        ...res.data?.message
      })
    }
  }, [child?.chats?._id]);

  const handleCreateChatAndLoadMessages = useCallback(async () => {
    let RoomId = chatRoomId || child?.chats?._id

    if (!RoomId) {
      const createRes = await createChat({ parent: child?.parent?._id, teacher: profile?._id, children: childId })

      if (createRes.status && createRes.data?._id) {
        RoomId = createRes.data._id
      }
    }

    if (RoomId) {
      getMessages({ chatRoomId: RoomId, isFresh: true })
    }
  }, [])

  const handleLoadEarlierMessages = useCallback(async () => {
    getMessages({ chatRoomId: child?.chats?._id, isFresh: false })
  }, [])

  useEffect(() => {
    handleCreateChatAndLoadMessages()
  }, [createChat]);

  if (createChatLoader) {
    return <DataLoader text='Creating Chat Room ...' />;
  }

  if (!messages.length && messagesLoader) {
    return <DataLoader text='Fetching Messages ...' />;
  }

  return (
    <Layout
      customHeader={<CustomChatHeader
        title={`${child.firstName} ${child.lastName}`}
        subTitle={`${child.parent?.motherFirstName} ${child.parent?.motherLastName} ( Mother )`}
        image={child.image}
      />}>
      <GiftedChat
        messagesContainerStyle={styles.messageContainer}
        renderAvatarOnTop={true}
        renderAvatar={null}
        keyboardShouldPersistTaps="handled"
        inverted={true}
        alwaysShowSend={true}
        showAvatarForEveryMessage={true}
        onSend={msgs => onSend(msgs)}
        infiniteScroll={true}
        loadEarlier={messagesPagination.page < messagesPagination.pages}
        isLoadingEarlier={!!messages.length && messagesLoader}
        onLoadEarlier={handleLoadEarlierMessages}
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
  messageContainer: {
    marginBottom: vh * 2.63, // 20
  },
});

export default CreateChat;
