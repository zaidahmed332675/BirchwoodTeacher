import { useAnimations } from '@react-native-media-console/reanimated';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Asset } from 'react-native-image-picker';
import VideoPlayer from 'react-native-media-console';
import profile from '../../Assets/images/avatar.jpg';
import {
  insertImageFromCamera,
  insertImageFromGallery,
} from '../../Utils/cameraOptions';
import { getImagePath } from '../../Service/axios';
import { colors } from '../../Theme/colors';
import { VIcon } from '../VIcon';
import { vh, vw } from '../../Utils/units';

interface UploadImageProps {
  isEditable?: boolean;
  image: Asset;
  _imageStyle?: Record<string, any>;
  _indicatorStyle?: Record<string, any>;
  originalImage: string | undefined;
  handleImage?: (asset: Asset) => void;
  style?: object;
}

export const UploadImage = ({
  isEditable,
  style,
  image,
  _imageStyle = {},
  _indicatorStyle = {},
  originalImage,
  handleImage,
}: UploadImageProps) => {

  const selectOptionIMG = () => {
    Alert.alert(
      'Select Image',
      'Choose an option for image upload',
      [
        { text: 'Camera', onPress: () => handleImageUpload('camera') },
        { text: 'Gallery', onPress: () => handleImageUpload('gallery') },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('cancel'),
        },
      ],
      { cancelable: false }
    );
  };

  const handleImageUpload = async (mediaType: String) => {
    let method =
      mediaType === 'camera' ? insertImageFromCamera : insertImageFromGallery;
    let media = await method({ selectionLimit: 1 });

    if (media.status && media.assets?.length) {
      handleImage?.(media.assets[0]);
    }
  };

  return (
    <View style={[style]}>
      <View>
        <ImageBox
          image={image}
          _imageStyle={_imageStyle}
          _indicatorStyle={_indicatorStyle}
        />
        {isEditable &&
          (image?.fileName ? (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() =>
                handleImage?.({
                  uri: originalImage
                })
              }>
              <VIcon
                type="Feather"
                name="x"
                color={colors.theme.primary}
                size={24}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editBtn} onPress={selectOptionIMG}>
              <VIcon
                type="Feather"
                name="edit"
                color={colors.theme.primary}
                size={24}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export const ImageBox = ({
  image,
  imagePlaceholder,
  _containerStyle,
  _imageStyle = {},
  _indicatorStyle = {},
}: {
  image: Asset;
  imagePlaceholder?: ImageProps;
  _containerStyle?: object;
  _imageStyle?: object;
  _indicatorStyle?: object;
}) => {
  const [imageLoader, setImageLoader] = useState(false);

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, _containerStyle]}>
      <Image
        onLoadStart={() => {
          setImageLoader(true);
        }}
        onLoadEnd={() => {
          setImageLoader(false);
        }}
        source={
          image?.uri
            ? { uri: image?.fileName ? image?.uri : getImagePath(image?.uri) }
            : imagePlaceholder || profile
        }
        alt="User Profile Image"
        resizeMode="contain"
        style={[styles.userImage, _imageStyle]}
      />
      <View
        style={[
          styles.userImage,
          _indicatorStyle,
          { position: 'absolute', justifyContent: 'center' },
        ]}>
        <ActivityIndicator
          animating={imageLoader}
          size="large"
          color={colors.theme.primary}
        />
      </View>
    </View>
  );
};

export const VideoBox = ({ media }) => {
  const [videoLoader, setVideoLoader] = useState(true);

  return (<View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
    <VideoPlayer
      useAnimations={useAnimations}
      disableBack
      paused={true}
      onLoadStart={() => {
        setVideoLoader(true);
      }}
      onLoad={() => {
        setVideoLoader(false);
      }}
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
      }}
    />
    <View
      style={[
        styles.userImage,
        { position: 'absolute', justifyContent: 'center' },
      ]}>
      <ActivityIndicator
        animating={videoLoader}
        size="large"
        color={colors.theme.primary}
      />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  userImage: {
    height: vh * 15.79, // 120
    width: vw * 33.33, // 120
    borderRadius: (vw * 33.33) / 2,
  },
  editBtn: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    alignItems: 'center',
    justifyContent: 'center',
    height: vh * 6.05, // 46
    width: vw * 12.78, // 46
    borderRadius: (vw * 12.78) / 2, // 50
    backgroundColor: '#F5F5F5',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: vh * 1.58, // 12
    lineHeight: 14.4,
    color: colors.theme.primary,
    textTransform: 'capitalize',
    marginTop: vh * 1.05, // 8
  },
});
