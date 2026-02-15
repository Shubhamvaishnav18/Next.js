import { User } from './index';

export interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortField: 'name' | 'email' | 'id';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  selectedUser: User | null;
  modalOpen: boolean;
}

export type UsersAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_SORT'; payload: { field: 'name' | 'email' | 'id'; order: 'asc' | 'desc' } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'TOGGLE_MODAL'; payload: boolean };