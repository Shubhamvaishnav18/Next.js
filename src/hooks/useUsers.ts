import { useState, useEffect, useMemo, useReducer } from 'react';
import { User } from '@/src/types/index';
import { api } from '@/src/lib/api';
import { UsersState, UsersAction } from '@/src/types/user';

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortField: 'id',
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 10,
  selectedUser: null,
  modalOpen: false,
};

function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, filteredUsers: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_SORT':
      return { ...state, sortField: action.payload.field, sortOrder: action.payload.order };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'TOGGLE_MODAL':
      return { ...state, modalOpen: action.payload };
    default:
      return state;
  }
}

export const useUsers = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const users = await api.getUsers();
        dispatch({ type: 'SET_USERS', payload: users });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to fetch users'
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = [...state.users];

    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[state.sortField];
      const bValue = b[state.sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return state.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return state.sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    dispatch({ type: 'SET_USERS', payload: state.users });
  }, [state.users, state.searchTerm, state.sortField, state.sortOrder]);

  const paginatedUsers = useMemo(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    return state.filteredUsers.slice(start, start + state.itemsPerPage);
  }, [state.filteredUsers, state.currentPage, state.itemsPerPage]);

  const totalPages = Math.ceil(state.filteredUsers.length / state.itemsPerPage);

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setSort = (field: 'name' | 'email' | 'id', order: 'asc' | 'desc') => {
    dispatch({ type: 'SET_SORT', payload: { field, order } });
  };

  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const selectUser = (user: User | null) => {
    dispatch({ type: 'SET_SELECTED_USER', payload: user });
  };

  const toggleModal = (open: boolean) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: open });
  };

  return {
    ...state,
    paginatedUsers,
    totalPages,
    setSearchTerm,
    setSort,
    setPage,
    selectUser,
    toggleModal,
  };
};