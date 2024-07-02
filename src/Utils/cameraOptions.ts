import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface Options extends CameraOptions, ImageLibraryOptions { }

const ImageOptions: Options = {
  mediaType: 'photo',
  quality: 1,
  maxWidth: 800,
  maxHeight: 800,
  includeBase64: false,
  selectionLimit: 0
};

const VideoOptions: Options = {
  mediaType: 'video',
  quality: 1,
  selectionLimit: 0
};

export const insertImageFromCamera = async (props?: Options) => {
  const response: ImagePickerResponse = await launchCamera({ ...ImageOptions, ...props });
  return cameraResponseCallback(response, true);
};

export const insertImageFromGallery = async (props?: Options) => {
  const response: ImagePickerResponse = await launchImageLibrary({ ...ImageOptions, ...props });
  return cameraResponseCallback(response, true);
};

export const insertVideoFromCamera = async (props?: Options) => {
  const response: ImagePickerResponse = await launchCamera({ ...VideoOptions, ...props });
  return cameraResponseCallback(response, false);
};

export const insertVideoFromGallery = async (props?: Options) => {
  const response: ImagePickerResponse = await launchImageLibrary({ ...VideoOptions, ...props });
  return cameraResponseCallback(response, false);
};

const cameraResponseCallback = (
  response: ImagePickerResponse,
  isImage: boolean
) => {
  if (response.didCancel) {
    return {
      status: false,
      message: `${isImage ? 'Image' : 'Video'} cancelled`,
      assets: []
    };
  } else if (response.errorCode) {
    return { status: false, message: 'Error Occured' + response.errorMessage, assets: [] };
  } else {

    // console.log(response, 'image response is here')

    if (response.assets?.length) {
      return { status: true, message: 'Success', ...response };
    }
    return { status: false, message: 'Something went wrong', assets: [] };
  }
};
