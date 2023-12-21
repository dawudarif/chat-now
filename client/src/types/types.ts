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
  latestMessage: null | { body: string };
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