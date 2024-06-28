import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Post from '../Screens/Post';
import ActivityList from '../Screens/Post/ActivityList';
import CreatePost from '../Screens/Post/CreatePost';
import { EPostStack, PostStackParams } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<PostStackParams>();

const PostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EPostStack.posts}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EPostStack.posts} component={Post} />
      <Stack.Screen
        name={EPostStack.activityList}
        component={ActivityList}
      />
      <Stack.Screen
        name={EPostStack.createPost}
        component={CreatePost}
      />
    </Stack.Navigator>
  );
};

export default PostNavigator;
