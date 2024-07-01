import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Controller, useForm } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';
import Video from 'react-native-video';
import {
  insertImageFromCamera,
  insertImageFromGallery,
  insertVideoFromCamera,
  insertVideoFromGallery,
} from '../../Utils/cameraOptions';
import { colors } from '../../theme/colors';
import { AppInput } from '../AppInput';
import { GrayMediumText } from '../GrayMediumText';
import { AppModal } from '../Modal';
import { VIcon } from '../VIcon';

export const RichTextEditor = forwardRef<unknown, { enableToolbar?: boolean }>(({ enableToolbar = true }, ref) => {
  // const RichText = useRef(null);

  const videoPlayer = useRef<Video | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [media, setMedia] = useState<Asset | undefined>(undefined);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      content: 'Hellow World! This is the first post on this platform',
    },
  });

  useImperativeHandle(ref, () => ({
    getPostDataToSend: async () => {
      let finalData = {};
      try {
        // Using a promise to handle async form submission
        await new Promise<void>((resolve) => {
          handleSubmit((data) => {
            data['media'] = media;
            finalData = data;
            resolve();
          })();
        });
      } catch (error) {
        console.error('Error in form submission:', error);
      }

      return finalData;
    },
  }), [media?.uri, mediaType]);

  // 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'
  // 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'

  // function editorInitializedCallback() {
  //   RichText.current?.registerToolbar(function (items) {
  //     console.log(
  //       'Toolbar click, selected items (insert end callback):',
  //       items
  //     );
  //   });
  // }

  async function insertFromCamera() {
    let method =
      mediaType === 'image' ? insertImageFromCamera : insertVideoFromCamera;
    let media = await method();
    if (media.status) {
      setMedia(media);
    }
    setModalVisible(false);
    // RichText.current?.insertVideo(
    // 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'
    // );
  }

  async function insertFromGallery() {
    let method =
      mediaType === 'image' ? insertImageFromGallery : insertVideoFromGallery;
    let media = await method();
    if (media.status) {
      setMedia(media);
    }
    setModalVisible(false);
    // RichText.current?.insertImage(
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
    //   'width: 250px; height: 250px;'
    // );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {/* <TextInput
            multiline
            style={[styles.editor, { height: Math.max(60, contentHeight) }]}
            textAlignVertical="top"
            placeholder={"What's in your mind?...."}
            placeholderTextColor={colors.text.altGrey}
            onContentSizeChange={event => {
              setContentHeight(event.nativeEvent.contentSize.height);
            }}
          /> */}

          <Controller
            name="content"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please write your thoughts!',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                isMultiple={true}
                label=''
                style={[styles.editor, { height: Math.max(60, contentHeight) }]}
                textAlignVertical="top"
                placeholder={"What's in your mind?...."}
                placeholderTextColor={colors.text.altGrey}
                onContentSizeChange={event => {
                  setContentHeight(event.nativeEvent.contentSize.height);
                }}
                value={value}
                onChange={onChange}
              />
            )}
          />

          {errors.content?.message && (
            <GrayMediumText
              text={errors.content.message}
              _style={{ color: colors.theme.lightRed }}
            />
          )}

          {mediaType === 'image'
            ? media?.uri && (
              <Image
                source={{ uri: media?.uri }}
                resizeMode="cover"
                style={{
                  height: 250,
                  borderRadius: 8,
                }}
              />
            )
            : media?.uri && (
              <Video
                ref={ref => (videoPlayer.current = ref)}
                controls={true}
                paused={true}
                source={{
                  uri: media?.uri,
                }}
                resizeMode="cover"
                style={{
                  height: 250,
                  borderRadius: 8,
                }}
              />
            )}
          {/* <RichEditor
            style={styles.rich}
            ref={RichText}
            placeholder={"What's in your mind?...."}
            initialFocus={false}
            disabled={false}
            useContainer
            editorInitializedCallback={editorInitializedCallback}
            onHeightChange={e => {
              console.log(e, 'aasd');
            }}
          /> */}
        </KeyboardAvoidingView>
      </ScrollView>

      {enableToolbar && (
        <View style={styles.richBar}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setMediaType('video');
            }}>
            <VIcon
              type="Ionicons"
              name="videocam-outline"
              size={30}
              color={colors.theme.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setMediaType('image');
            }}>
            <VIcon
              type="Ionicons"
              name="image-outline"
              size={30}
              color={colors.theme.primary}
            />
          </TouchableOpacity>
        </View>
      )}

      <AppModal
        onClose={() => setModalVisible(false)}
        isModalVisible={isModalVisible}
        statusBarTranslucent={true}
        _styleContent={{
          width: '80%',
          backgroundColor: colors.theme.secondary,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={insertFromGallery}
          style={{
            padding: 10,
          }}>
          <Text>Select from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={insertFromCamera}
          style={{
            padding: 10,
          }}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
      </AppModal>

      {/* <RichToolbar
        style={[styles.richBar1]}
        editor={RichText}
        disabled={false}
        iconTint={colors.theme.primary}
        selectedIconTint={colors.theme.secondary}
        disabledIconTint={colors.theme.secondary}
        iconSize={30}
        actions={['insertVideo', 'insertImage']}
        iconMap={{
          ['insertVideo']: () => (
            <Ionicon
              name="videocam-outline"
              size={30}
              color={colors.theme.primary}
            />
          ),
          ['insertImage']: () => (
            <Ionicon
              name="image-outline"
              size={30}
              color={colors.theme.primary}
            />
          ),
        }}
        insertVideo={insertVideo}
        insertImage={insertImage}
      /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    marginHorizontal: 12,
    color: colors.text.black,
  },
  richBar: {
    flexDirection: 'row',
    gap: 16,
    width: 100,
    backgroundColor: colors.theme.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
