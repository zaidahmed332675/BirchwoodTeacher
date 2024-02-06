import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Asset, CameraOptions, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
// import profile from '../../Assets/icons/ic_profile.png';
import profile from '../../Assets/images/profile_bg.png';
import { colors } from '../../theme/colors';
// import { } from '../../Utils/dynamicSize';
// import { colors } from '../../Utils/theme';
// import { IMG_URL } from '../../services/axios';

interface UploadImageProps {
  id?: number;
  image: {
    uri?: string;
  };
  handleImage?: (param: Asset) => void;
  style?: object;
}

const UploadImage = ({ id, style, image, handleImage }: UploadImageProps) => {
  // const [loading, setLoader] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const handleImageUpload = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('response photo >>', response);
        if (response.assets) {
          setSelectedImage(response.assets[0].uri);
          // handleImage?.(response?.assets?.[0]);
        }
      }
    });

    // const options: CameraOptions = {
    //   mediaType: 'photo',
    //   includeBase64: false,
    //   maxHeight: 600,
    //   maxWidth: 800
    // }

    //   launchImageLibrary(options, response => {
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker')
    //     } else if (response.errorCode) {
    //       console.log('ImagePicker Error: ', response.errorMessage)
    //     } else {
    //       if (response.assets) {
    //         setSelectedImage(response.assets[0].uri)
    //         handleImage?.(response?.assets?.[0])
    //       }
    //     }
    //   })
  };

  const IMG_URL = '';

  console.log(selectedImage, 'selected Image ', image?.uri);

  return (
    <View style={[styles.appInput, style]}>
      <View style={styles.profile}>
        <View
          style={{
            borderWidth: 3,
            borderRadius: 100,
            backgroundColor: colors.theme.secondary,
            borderColor: colors.theme.secondary,
          }}>
          <Image
            loadingIndicatorSource={profile}
            source={
              // !loader &&
              selectedImage || image?.uri
                ? {
                    uri:
                      selectedImage || id ? image?.uri : IMG_URL + image?.uri,
                  }
                : profile
            }
            alt="User Profile Image"
            style={styles.userImage}
          />
          {id && (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={handleImageUpload}>
              <Icon name="edit" color={colors.theme.primary} size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appInput: {},
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 13,
    width: '100%',
  },
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

export default UploadImage;
