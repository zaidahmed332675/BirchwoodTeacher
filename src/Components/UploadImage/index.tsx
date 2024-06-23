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
import profile from '../../Assets/images/avatar.jpg';
import {
  insertImageFromCamera,
  insertImageFromGallery,
} from '../../Utils/cameraOptions';
import { getImagePath } from '../../services/axios';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

interface UploadImageProps {
  isEditable?: boolean;
  image: Asset;
  _imageStyle?: Record<string, any>;
  _indicatorStyle?: Record<string, any>;
  originalImage: string | undefined;
  handleImage?: (param: Asset & { status?: boolean; message?: string }) => void;
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
  // console.log(originalImage, 'casdasdas');
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
    let media = await method();

    if (media.status) {
      handleImage?.(media);
    }
  };

  return (
    <View style={[style]}>
      <View
        style={{
          borderRadius: 100,
        }}>
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
                    ? getImagePath(originalImage)
                    : originalImage,
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
  _imageStyle = {},
  _indicatorStyle = {},
}: {
  image: Asset;
  imagePlaceholder?: ImageProps;
  _imageStyle?: object;
  _indicatorStyle?: object;
}) => {
  const [imageLoader, setImageLoader] = useState(false);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
        style={[styles.userImage, _imageStyle]}
        resizeMode="cover"
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

const styles = StyleSheet.create({
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 200,
  },
  editBtn: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: 46,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.theme.primary,
    textTransform: 'capitalize',
    marginTop: 8,
  },
});
