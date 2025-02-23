import { ClassRoom, Parent } from "./Class";
import { PaginationProps } from "./Common";
import { User } from "./User";

export interface Activity {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  author: Pick<User, '_id' | 'firstName' | 'lastName' | 'image'>;
  content: string;
  images: string[];
  videos: string[];
  activity: Activity;
  classroom?: ClassRoom;
  children?: string[];
  type: string;
  likes: string[];
  loves: string[];
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
}

export interface Comment {
  _id: string;
  content: string;
  post: string;
  author: Pick<User, "_id" | "firstName" | "lastName" | "image"> | Pick<Parent, "_id" | "motherFirstName" | "motherLastName" | "image">;
  createdAt: string;
  updatedAt: string;
}

export interface GetActivities extends PaginationProps {
  docs: Activity[];
}

export interface CreatePostPayload {
  content: string;
  image: string;
  video: string;
  activity: string;
  classroom?: string;
  children?: string;
  type: string;
}

export interface GetAllClassPosts extends PaginationProps {
  docs: Post[];
}

export interface GetAllPostComments extends PaginationProps {
  docs: Comment[];
}
