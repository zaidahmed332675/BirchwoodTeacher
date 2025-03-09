import { BottomSheetFooter, BottomSheetModal } from '@gorhom/bottom-sheet';
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
import { colors } from '../../Theme/colors';
import { EPostStack, PostStackParams } from '../../Types/NavigationTypes';
import { isImage, isVideo } from '../../Utils/options';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<PostStackParams, 'createPost'>;

interface textEditorRefProps {
  getPostDataToSend: () => Promise<{ content: string, media: Asset[] | [], deletedMedia: { 'images': string[], 'videos': string[] } }>,
  editMedia: (media: Asset[]) => void,
  setContent: (content: string) => void,
}

const CreatePost = ({ navigation, route }: Props) => {
  const sheetRef = useRef<BottomSheetModalMethods>(null);
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
    } else formData.append('classroom', isEdit ? post.classroom?._id : profile?.classroom?._id);

    let res = !isEdit ? await createPost(formData) : await updatePost({ postId, data: formData })
    if (res.status) {
      navigation.navigate(EPostStack.posts)
    }
  }

  useEffect(() => {
    if (isEdit) {
      if (post.classroom?._id) {
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
      let videos = post.videos.map((video) => {
        return ({
          uri: video,
          type: `video/${video.split('.').pop()?.toLowerCase()}`,
          name: video
        })
      })
      textEditorRef.current?.editMedia([...images, ...videos])
    }
  }, [postId])

  return (
    <Layout customHeader={<CustomHeader title={isEdit ? "Update Post" : "Create Post"} />}>
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
            btnStyle={styles.audienceBtn}
            onPress={() => {
              setSheetOpen(true);
              sheetRef.current?.present();
            }}
          />
        </View>
      </View>
      <RichTextEditor ref={textEditorRef} selectionLimit={0} isEdit={isEdit} />
      <AppBottomSheet
        ref={sheetRef}
        isSheetOpen={isSheetOpen}
        snapPoints={['40%']}
        enableDismissOnClose
        onDismiss={() => {
          setSheetOpen(false);
        }}
        _handleStyle={{
          backgroundColor: colors.theme.primary,
        }}
        _sheetStyle={{
          backgroundColor: colors.theme.primary,
        }}
        footerComponent={({ animatedFooterPosition }) => <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
          <AppButton
            title='Done'
            onPress={() => {
              sheetRef.current?.dismiss();
              setSheetOpen(false);
            }}
            btnStyle={styles.postDoneBtn}
          />
        </BottomSheetFooter>
        }
      >
        <PostBottomSheetContent
          audience={audience}
          setAudience={setAudience}
          students={students}
          setStudents={setStudents}
        />
      </AppBottomSheet>
      <AppButton
        title={isEdit ? 'Update Post' : 'Post Now'}
        onPress={handleSend}
        btnStyle={[styles.postDoneBtn, { width: "95%" }]}
      />
    </Layout>
  );
};

interface PostBottomSheetContentProps {
  audience: number;
  setAudience: React.Dispatch<React.SetStateAction<number>>;
  students: string[];
  setStudents: React.Dispatch<React.SetStateAction<string>>;
}

const PostBottomSheetContent = ({
  audience,
  setAudience,
  students,
  setStudents,
}: PostBottomSheetContentProps) => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  let children = useAppSelector(selectChildren);

  return (
    <View style={styles.contentContainer}>
      <Text
        style={styles.contentTitle}>
        Choose Audience
      </Text>
      <View>
        <CheckBox
          checked={audience === 0}
          title="Class"
          textStyle={{
            fontSize: vh * 2.11, // 16
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.checkBox}
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
            fontSize: vh * 2.11, // 16
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.checkBox}
          checkedColor={colors.theme.white}
          onIconPress={() => setAudience(1)}
        />
      </View>
      {audience === 1 && (
        <SearchModal
          placeholder="Please select"
          value={students?.length ? students : []}
          onChange={setStudents}
          isMultiple={true}
          required={true}
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
          multipleText={`${students?.length} ${students?.length > 1 ? 'children' : 'child'
            } have been selected`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: vh * 1.97, // 15
    backgroundColor: colors.theme.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: vw * 13.89, // 50
    height: vh * 6.58, // 50
    borderRadius: (vw * 13.89) / 2,
    marginRight: vw * 1.32, // 10
    borderWidth: 2,
    borderColor: colors.theme.primary,
  },
  userName: {
    fontSize: vh * 2.11, // 16
    fontWeight: 'bold',
    color: colors.text.dimBlack,
  },
  audienceBtn: {
    alignSelf: 'flex-start',
    marginTop: vh * 0.66, // 5
    borderRadius: 6,
    paddingHorizontal: vw * 2.78, // 10
    paddingVertical: 0,
  },
  postDoneBtn: {
    width: '85%',
    height: vh * 6.58, // 50
    marginTop: 0,
    backgroundColor: colors.theme.secondary,
    borderWidth: 0,
    marginVertical: vh * 1.32, // 10
  },
  contentContainer: {
    backgroundColor: 'transparent',
  },
  contentTitle: {
    marginVertical: vh * 2.63, // 20
    color: colors.text.white,
    fontWeight: 'bold',
    fontSize: vh * 2.37, // 18
  },
  checkBox: {
    backgroundColor: 'transparent',
    padding: 0,
    marginVertical: vh * 1.05, // 8
  }
});

export default CreatePost;
