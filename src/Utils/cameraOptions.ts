import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const ImageOptions: CameraOptions | ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
  maxWidth: 800,
  maxHeight: 800,
};

const VideoOptions: CameraOptions | ImageLibraryOptions = {
  mediaType: 'video',
  quality: 1,
};

export const insertImageFromCamera = async () => {
  const response: ImagePickerResponse = await launchCamera(ImageOptions);

  if (response.didCancel) {
    return { status: false, message: 'Image cancelled' };
  } else if (response.errorCode) {
    return { status: false, message: 'Error Occured' + response.errorMessage };
  } else {
    if (response.assets) {
      return { status: true, ...response.assets?.[0] };
    }
    return { status: false, message: 'Something went wrong' };
  }
};

export const insertImageFromGallery = async () => {
  const response: ImagePickerResponse = await launchImageLibrary(ImageOptions);

  if (response.didCancel) {
    return { status: false, message: 'Image cancelled' };
  } else if (response.errorCode) {
    return { status: false, message: 'Error Occured' + response.errorMessage };
  } else {
    if (response.assets) {
      return { status: true, ...response.assets?.[0] };
    }
    return { status: false, message: 'Something went wrong' };
  }
};

export const insertVideoFromCamera = async () => {
  const response: ImagePickerResponse = await launchCamera(VideoOptions);

  if (response.didCancel) {
    return { status: false, message: 'Video cancelled' };
  } else if (response.errorCode) {
    return { status: false, message: 'Error Occured' + response.errorMessage };
  } else {
    if (response.assets) {
      return { status: true, ...response.assets?.[0] };
    }
    return { status: false, message: 'Something went wrong' };
  }
};

export const insertVideoFromGallery = async () => {
  const response: ImagePickerResponse = await launchImageLibrary(VideoOptions);

  if (response.didCancel) {
    return { status: false, message: 'Video cancelled' };
  } else if (response.errorCode) {
    return { status: false, message: 'Error Occured' + response.errorMessage };
  } else {
    if (response.assets) {
      return { status: true, ...response.assets?.[0] };
    }
    return { status: false, message: 'Something went wrong' };
  }
};
