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

export interface IChat {
  id: string;
  latestMessage: null | { body: string };
  latestMessageId: null | string;
  participants: Array<IParticipant>
  createdAt: string;
  updatedAt: string;
}

export interface IParticipant {
  hasSeenLatestMessage: string;
  id: string;
  user: { name: string };
  userId: string
}