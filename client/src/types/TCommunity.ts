import { TPost } from './TPost';

export type TCommunity = {
  name: string;
  members: number;
  createdOn: string;
  description: string;
  userIsCreator: boolean;
  userIsMember: boolean;
  posts: TPost[];
};
