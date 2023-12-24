export interface IUserProfile {
  id: string,
  name: string,
  email: string,
  username: string;
}


export interface ISearchResult {
  id: string;
  name: string;
  username: string
}

export interface IFeedItem {
  id: string;
  latestMessage: { body: string } | any;
  latestMessageId: null | string;
  participants: Array<IParticipant>
  createdAt: string;
  updatedAt: string;
}

export interface IParticipant {
  hasSeenLatestMessage: boolean;
  id: string;
  user: { name: string, username: string };
  userId: string
}

export interface IMessage {
  body: string;
  conversationId: string;
  createdAt: string;
  id: string;
  sender: ISender;
  senderId: string;
  updatedAt: string
}


export interface ISender { id: string, name: string, username: string }