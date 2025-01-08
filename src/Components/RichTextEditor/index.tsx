import { useAnimations } from '@react-native-media-console/reanimated';
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
import VideoPlayer from 'react-native-media-console';

import { Controller, useForm } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';
import {
    insertImageFromCamera,
    insertImageFromGallery,
    insertVideoFromCamera,
    insertVideoFromGallery,
} from '../../Utils/cameraOptions';
import { isImage, isVideo } from '../../Utils/options';
import { colors } from '../../Theme/colors';
import { AppInput } from '../AppInput';
import { GrayMediumText } from '../GrayMediumText';
import { AppModal } from '../Modal';
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';

export const RichTextEditor = forwardRef<unknown, { enableToolbar?: boolean, selectionLimit?: number }>(({ enableToolbar = true, selectionLimit = 1 }, ref) => {
    // const videoPlayerRef = useRef<typeof VideoPlayer | null>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [media, setMedia] = useState<Asset[]>([]);
    const [deletedMedia, setDeletedMedia] = useState<Record<string, string[]>>({ images: [], videos: [] })
    const [mediaType, setMediaType] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<any>({
        defaultValues: {
            content: '',
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
                        data['deletedMedia'] = deletedMedia;
                        finalData = data;
                        resolve();
                    })();
                });
            } catch (error) {
                console.error('Error in form submission:', error);
            }
            return finalData;
        },
        editMedia: async (media: Asset[]) => {
            setMedia(media)
        },
        setContent: async (content: string) => {
            setValue('content', content)
        }
    }), [media?.length, mediaType]);

    const handleMediaDelete = (mediaObj: Asset) => {
        if (mediaObj.fileName) return setMedia((prevMedia) => prevMedia.filter((media) => media.fileName !== mediaObj.fileName))
        setDeletedMedia((prevItems) => isImage(mediaObj.uri!) ? {
            ...prevItems,
            ['images']: [...prevItems['images'], mediaObj.uri!]
        } : isVideo(mediaObj.uri!) ? {
            ...prevItems,
            ['videos']: [...prevItems['videos'], mediaObj.uri!]
        } : prevItems);
    }

    const insertFromCamera = async () => {
        setModalVisible(false);
        let method =
            mediaType === 'image' ? insertImageFromCamera : insertVideoFromCamera;
        let media = await method({ selectionLimit });
        if (media.status) {
            setMedia((prevMedia) => [...prevMedia, ...media.assets]);
        }
    }

    const insertFromGallery = async () => {
        setModalVisible(false);
        let method =
            mediaType === 'image' ? insertImageFromGallery : insertVideoFromGallery;
        let media = await method({ selectionLimit });
        if (media.status) {
            setMedia((prevMedia) => [...prevMedia, ...media.assets]);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} disableScrollViewPanResponder={false} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                        gap: 10,
                    }}>
                        {
                            media.map((media, index) => {
                                if (isImage(media.fileName! || media.uri!)) {
                                    return <View key={`${media.fileName || media.uri}_${index}`} style={{ height: 200 }}>
                                        <ImageBox image={media} _imageStyle={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 8 }} />
                                        <TouchableOpacity onPress={handleMediaDelete} style={{
                                            position: 'absolute',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 5,
                                            top: -3,
                                            right: -4,
                                            padding: 5,
                                            backgroundColor: colors.theme.white,
                                            borderRadius: 200
                                        }}>
                                            <VIcon
                                                type="AntDesign"
                                                name={"close"}
                                                size={15}
                                                color={colors.theme.darkRed}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                                else if (isVideo(media.fileName! || media.uri!)) {
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
                                            height: 200,
                                            width: '100%'
                                        }}
                                    />
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </View> : null}
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
