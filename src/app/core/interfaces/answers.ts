import { User } from './user';

export interface Answers {
  _id: string;
  question_id: string;
  body: string;
  author: User;
  upvotes: number;
  downvotes: number;
  faker: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnswersPagination {
  total: number;
  page: number;
  totalPages: number;
  answers: Answers[];
}
