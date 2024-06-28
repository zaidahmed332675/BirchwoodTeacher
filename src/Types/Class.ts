import { PaginationProps } from "./Common";

export interface ClassRoom {
  _id: string;
  classroomId: string;
  classroomName: string;
  classroomGrade: number;
  classroomBatch: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  teacher: string
}

export interface Child {
  _id: string;
  rollNumber: string;
  term: string;
  firstName: string;
  lastName: string;
  age: number;
  birthday: string;
  classroom: ClassRoom;
  checkIn: false;
  status: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  parent: string
  newAttendance: ChildCheckInOutResponse;
  chatRoomId: string
}

export interface Message {
  _id: string;
  sender: string;
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassResponse extends PaginationProps {
  docs: Child[];
}

export interface MessagesResponse extends PaginationProps {
  docs: Message[];
}

export interface CreateChatPayload {
  teacher: string;
  parent: string;
}

export interface CreateChatResponse {
  chat: {
    _id: string;
    isGroupChat: boolean;
    unreadMessage: number;
    teacher: string;
    parent: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
}

export interface CreateChatRoomMessagePayload {
  chatId: string;
  content: string;
}

export interface CreateChatRoomMessageResponse {
  message: Message;
}

export interface CategoryResponse extends PaginationProps {
  docs: Category[],
}

export interface ChildCheckInOutPayload {
  children: string;
  checkIn: string;
}

export interface ChildCheckInOutResponse {
  _id: string;
  children: string;
  checkIn: string | null;
  checkOut: string | null;
  leaveReason: string;
  sickDescription: string;
  status: string;
}