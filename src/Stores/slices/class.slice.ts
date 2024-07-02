import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { Child, ClassResponse, Message, MessagesResponse } from '../../Types/Class';

interface ClassSliceState {
  children: Record<string, Child>;
  pagination: {
    totalDocs: number,
    limit: number,
    page: number,
    totalPages: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number | null,
    nextPage: number | null
  },
  chatRooms: Record<string, {
    messages: Record<string, Message>,
    messagePagination: any
  }>;
}

const initialState: ClassSliceState = {
  children: {},
  pagination: {
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  },
  chatRooms: {}
};

const ClassSlice = createSlice({
  name: 'Class',
  initialState,
  reducers: {
    setChildren: (state, { payload }: PayloadAction<ClassResponse>) => {
      const { docs, ...pagination } = payload;
      state.children = docs.reduce((acc, curr) => {
        acc["child_" + curr._id] = curr;
        return acc;
      }, {} as Record<string, Child>);
      state.pagination = pagination;
    },
    setChild: (state, { payload }: PayloadAction<Partial<Child>>) => {
      state.children["child_" + payload._id] = { ...state.children["child_" + payload._id], ...payload };
    },
    setChatRoom: (state, { payload }: PayloadAction<MessagesResponse & { chatRoomId: string }>) => {
      const { chatRoomId, docs, ...pagination } = payload;
      const chatRoomKey = `chatRoom_${chatRoomId}`;
      state.chatRooms[chatRoomKey] = state.chatRooms[chatRoomKey] || { messages: {}, messagePagination: {} };
      docs.forEach((message) => {
        state.chatRooms[chatRoomKey].messages[`message_${message._id}`] = {
          ...message, user: {
            _id: "6673fe3a586f9969aa07e034",
            name: 'Waqas Mumtaz',
          },
        };
      });
      state.chatRooms[chatRoomKey].messagePagination = pagination;
    },
    setChatRoomMessage: (state, { payload }: PayloadAction<{ chatRoomId: string, message: Message }>) => {
      const { chatRoomId, message } = payload;
      const chatRoomKey = `chatRoom_${chatRoomId}`;
      state.chatRooms[chatRoomKey].messages[`message_${message._id}`] = message;
    },
    removeChatRoomMessage: (state, { payload }: PayloadAction<{ chatRoomId: string, messageId: string }>) => {
      const { chatRoomId, messageId } = payload;
      const chatRoomKey = `chatRoom_${chatRoomId}`;
      delete state.chatRooms[chatRoomKey].messages[`message_${messageId}`];
    },
    resetClassState: _ => initialState,
  },
});

export const { setChildren, setChild, setChatRoom, setChatRoomMessage, resetClassState } =
  ClassSlice.actions;

export default ClassSlice.reducer;

export const selectChildren = createDraftSafeSelector(
  [(state: RootState) => state.class],
  state => Object.values(state.children) as Child[]
);

// export const selectChildrens = createDraftSafeSelector(
//   [(state: RootState) => state.class],
//   state => state.children
// );

export const selectChildById = (childId: string) =>
  createDraftSafeSelector(
    [(state: RootState) => state.class.children],
    children => children["child_" + childId] as Child
  );

export const selectChatRoomMessages = (chatRoomId: string) =>
  createDraftSafeSelector(
    [(state: RootState) => state.class.chatRooms],
    chatRooms => Object.values(chatRooms?.["chatRoom_" + chatRoomId]?.messages || {})
  );