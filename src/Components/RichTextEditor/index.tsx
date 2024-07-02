import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useAnimations } from '@react-native-media-console/reanimated';
import VideoPlayer from 'react-native-media-console';

import { Controller, useForm } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';
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
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';

export const RichTextEditor = forwardRef<unknown, { enableToolbar?: boolean }>(({ enableToolbar = true }, ref) => {
    // const RichText = useRef(null);

    // const videoPlayerRef = useRef<typeof VideoPlayer | null>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [media, setMedia] = useState<Asset[]>([]);
    const [mediaType, setMediaType] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            content: 'Post 001',
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
    }), [media?.length, mediaType]);

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
        setModalVisible(false);
        let method =
            mediaType === 'image' ? insertImageFromCamera : insertVideoFromCamera;
        let media = await method();
        if (media.status) {
            setMedia((prevMedia) => [...prevMedia, ...media.assets]);
        }
        // RichText.current?.insertVideo(
        // 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'
        // );
    }

    async function insertFromGallery() {
        setModalVisible(false);
        let method =
            mediaType === 'image' ? insertImageFromGallery : insertVideoFromGallery;
        let media = await method({ selectionLimit: 1 });
        if (media.status) {
            setMedia((prevMedia) => [...prevMedia, ...media.assets]);
        }
        // RichText.current?.insertImage(
        //   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
        //   'width: 250px; height: 250px;'
        // );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} disableScrollViewPanResponder={false} >
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

                    {media.length ? <View style={{
                        gap: 10
                    }}>
                        {
                            media.map((media, index) => {
                                if (media.type?.includes('image/')) {
                                    return <ImageBox key={`${media.fileName}_${index}`} image={media} _imageStyle={{ height: 250, borderRadius: 8, }} />
                                }
                                else if (media.type?.includes('video/')) {
                                    return <VideoPlayer
                                        key={`${media.fileName}_${index}`}
                                        useAnimations={useAnimations}
                                        disableBack
                                        paused={true}
                                        poster={media.uri}
                                        source={{
                                            uri: media?.uri,
                                        }}
                                        resizeMode='contain'
                                        containerStyle={{
                                            borderRadius: 10
                                        }}
                                        style={{
                                            height: 250,
                                            width: '100%'
                                        }}
                                    />
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </View> : null}

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
