import { User } from './user';

export interface Questions {
  _id: string;
  body: string;
  author: User;
  views: number;
  faker: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuestionsPagination {
  total: number;
  page: number;
  totalPages: number;
  questions: Questions[];
}
