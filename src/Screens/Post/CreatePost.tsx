import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { CheckBox } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { AppBottomSheet } from '../../Components/BottomSheet';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { Layout } from '../../Components/Layout';
import { RichTextEditor } from '../../Components/RichTextEditor';
import { SearchModal } from '../../Components/SearchModal';
import { ImageBox } from '../../Components/UploadImage';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncCreatePost, asyncUpdatePost } from '../../Stores/actions/post.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectPostById } from '../../Stores/slices/post.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { colors } from '../../theme/colors';
import { EPostStack, PostStackParams } from '../../Types/NavigationTypes';
import { isImage, isVideo } from '../../Utils/options';

type Props = StackScreenProps<PostStackParams, 'createPost'>;

interface textEditorRefProps {
  getPostDataToSend: () => Promise<{ content: string, media: Asset[] | [], deletedMedia: { 'images': string[], 'videos': string[] } }>,
  editMedia: (media: Asset[]) => void,
  setContent: (content: string) => void,
}

const CreatePost = ({ navigation, route }: Props) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const textEditorRef = useRef<textEditorRefProps | null>(null);
  let { activityId, postId } = route?.params

  const [audience, setAudience] = useState(0);
  const [students, setStudents] = useState<any>();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const dispatch = useAppDispatch()

  const [_, createPost] = useLoaderDispatch(asyncCreatePost);
  const [__, updatePost] = useLoaderDispatch(asyncUpdatePost);

  const profile = useAppSelector(selectUserProfile)

  const isEdit = !!postId
  const post = useAppSelector(selectPostById(postId))

  const handleSend = async () => {
    let editorData = await textEditorRef.current?.getPostDataToSend()

    let { media, deletedMedia, content } = editorData || {}

    const formData = new FormData();
    formData.append('content', content);

    if (!isEdit) formData.append('activity', activityId);
    else formData.append('activity', post?.activity?._id)

    formData.append('type', audience === 0 ? 'CLASS' : 'CHILD');

    if (media?.length) {
      media?.forEach((asset: Asset) => {
        if (isEdit && (post.images.includes((asset.fileName || asset.uri)!) || post.videos.includes((asset.fileName || asset.uri)!))) return

        const mObj = {
          uri: asset?.uri,
          type: asset?.type,
          name: asset?.fileName || asset?.uri,
        }

        if (isImage((asset.fileName || asset.uri)!)) {
          return formData.append('image', mObj);
        }
        if (isVideo((asset.fileName || asset.uri)!)) {
          return formData.append('video', mObj);
        }
      })
    } else return dispatch(asyncShowError('Please select atleast one Image or Video!'))

    if (isEdit) {
      if (deletedMedia?.images?.length) formData.append('oldImages', JSON.stringify(deletedMedia.images))
      if (deletedMedia?.videos?.length) formData.append('oldVideos', JSON.stringify(deletedMedia.videos))
    }

    if (audience === 1) {
      if (students?.length) formData.append('children', JSON.stringify(students))
      else return dispatch(asyncShowError('Please select atleast one child!'))
    } else formData.append('classroom', isEdit ? post.classroom : profile?.classroom?._id);

    let res = !isEdit ? await createPost(formData) : await updatePost({ postId, data: formData })
    if (res.status) {
      navigation.navigate(EPostStack.posts)
    }
  }

  useEffect(() => {
    if (isEdit) {
      if (post.classroom) {
        setAudience(0)
      }
      else {
        setAudience(1)
        setStudents(post.children)
      }

      textEditorRef.current?.setContent(post.content)
      let images = post.images.map((image) => {
        return ({
          uri: image,
          type: `image/${image.split('.').pop()?.toLowerCase()}`,
          name: image
        })
      })
      textEditorRef.current?.editMedia(images)
    }
  }, [postId])

  return (
    <Layout customHeader={<CustomHeader title="Create Post" />}>
      <View style={styles.container}>
        <ImageBox image={{ uri: profile.image }} _imageStyle={styles.profilePic} />
        <View>
          <Text style={styles.userName}>{`${profile.firstName} ${profile.lastName}`}</Text>
          <AppButton
            title={
              audience === 0
                ? 'Class'
                : students?.length > 1
                  ? 'Children'
                  : 'Child'
            }
            bordered
            suffix
            btnStyle={{
              alignSelf: 'flex-start',
              marginTop: 5,
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 0,
            }}
            onPress={() => {
              setSheetOpen(true);
              sheetRef.current?.present();
            }}
          />
        </View>
      </View>
      <RichTextEditor ref={textEditorRef} selectionLimit={0} />
      <AppBottomSheet
        ref={sheetRef}
        snapPoints={['50%', '75%']}
        enableDismissOnClose
        onDismiss={() => {
          setSheetOpen(false);
        }}
        _handleStyle={{
          backgroundColor: colors.theme.primary,
        }}
        _sheetStyle={{
          backgroundColor: colors.theme.primary,
        }}>
        <CreatePostModalContent
          audience={audience}
          setAudience={setAudience}
          students={students}
          setStudents={setStudents}
        />
      </AppBottomSheet>
      <AppButton
        title={isSheetOpen ? 'Done' : 'Post Now'}
        onPress={() => {
          if (isSheetOpen) {
            sheetRef.current?.dismiss();
            setSheetOpen(false);
          } else {
            handleSend();
          }
        }}
        btnStyle={{
          width: '95%',
          height: 50,
          marginTop: 0,
          backgroundColor: colors.theme.secondary,
          borderWidth: 0,
          marginVertical: 10,
        }}
      />
    </Layout>
  );
};

interface CreatePostModalContentProps {
  audience: number;
  setAudience: React.Dispatch<React.SetStateAction<number>>;
  students: string[];
  setStudents: React.Dispatch<React.SetStateAction<string>>;
}

const CreatePostModalContent = ({
  audience,
  setAudience,
  students,
  setStudents,
}: CreatePostModalContentProps) => {
  const searchModalRef = useRef();

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  let children = useAppSelector(selectChildren);

  useEffect(() => {
    let item = searchModalRef.current?.selectedItem;
    if (item) {
      setStudents(item);
    }
  }, [isSearchModalOpen, setStudents]);

  return (
    <View style={styles.contentContainer}>
      <Text
        style={{
          marginVertical: 20,
          color: colors.text.white,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Choose Audience
      </Text>
      <View>
        <CheckBox
          checked={audience === 0}
          title="Class"
          textStyle={{
            fontSize: 16,
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            marginVertical: 8,
          }}
          checkedColor={colors.theme.white}
          onIconPress={() => {
            setAudience(0);
            setStudents();
          }}
        />
        <CheckBox
          checked={audience === 1}
          title="Child"
          textStyle={{
            fontSize: 16,
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'transparent',
            marginVertical: 8,
            padding: 0,
          }}
          checkedColor={colors.theme.white}
          onIconPress={() => setAudience(1)}
        />
      </View>
      {audience === 1 && (
        <SearchModal
          isMultiple={true}
          open={isSearchModalOpen}
          setOpen={setSearchModalOpen}
          children={children.map(child => {
            let { parent, ...childData } = child
            return ({
              label: `${child.firstName} ${child.lastName}`,
              value: child._id,
              parentData: parent,
              ...childData,
            })
          })}
          selectedItems={students}
          ref={searchModalRef}
          multipleText={`${students?.length} ${students?.length > 1 ? 'children' : 'child'
            } have been selected`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: colors.theme.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.theme.primary,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.dimBlack,
  },
  timeStamp: {
    fontSize: 12,
    color: '#888',
  },
  contentContainer: {
    backgroundColor: 'transparent',
  },
});

export default CreatePost;
