import deepFreeze from 'deep-freeze';
import { reverse } from 'ramda';
import {
  fetchRecentFilesList,
  fetchRecentFilesListFailure,
  fetchRecentFilesListSuccess, FETCH_RECENT_FILES_LIST,
  FETCH_RECENT_FILES_LIST_FAILURE,
  FETCH_RECENT_FILES_LIST_SUCCESS,
  getError,
  getIsLoading,
  getRecentFiles,
  getRecentFilesList,
  RecentFilesAction, recentFilesReducer,
  reverseRecentFilesList,
  REVERSE_RECENT_FILES_LIST,
} from '../store/duck/recentFiles';
import { RecentFile } from '../store/entities';
import { ApiError } from '../utils/errorTypes';

const recentFilesState = {
  recentFilesList: [],
  isLoading: false,
  error: null,
};

const state = {
  recentFiles: recentFilesState,
};

const errorMock = { message: "message", status: 409 } as ApiError;

const createRecentFile = (id: string):RecentFile => {
  return { id: 'testFile' } as RecentFile;
};

const mockState = {
  recentFiles: [createRecentFile('testFile'), createRecentFile('testFile2')],
};

describe('recentFiles actions', () => {
  it('fetchRecentFilesList', () => {
    const { type } = fetchRecentFilesList();

    expect(type).toBe(FETCH_RECENT_FILES_LIST);
  });

  it('fetchRecentFilesListSuccess', () => {
    const { recentFiles, type } = fetchRecentFilesListSuccess(mockState.recentFiles);

    expect(type).toBe(FETCH_RECENT_FILES_LIST_SUCCESS);
    expect(recentFiles).toBe(mockState.recentFiles);
  });

  it('fetchRecentFilesListFailure', () => {
    const { type, error } = fetchRecentFilesListFailure(errorMock);

    expect(type).toBe(FETCH_RECENT_FILES_LIST_FAILURE);
    expect(error).toBe(errorMock);
  });

  it('reverseRecentFilesList', () => {
    const { type } = reverseRecentFilesList();

    expect(type).toBe(REVERSE_RECENT_FILES_LIST);
  });
});

describe('recentFiles reducer', () => {
  beforeAll(() => {
    deepFreeze(state);
  });

  describe('when receiving not relative action', () => {
    it('should return default state', () => {
      const newState = recentFilesReducer(recentFilesState, { type: 'RANDOM_NAME' } as RecentFilesAction);
      expect(newState).toEqual(recentFilesState);
    });
  });

  describe('start fetching recentFiles list', () => {
    describe('on success', () => {
      const newState = recentFilesReducer(
        recentFilesState,
        {
          type: FETCH_RECENT_FILES_LIST_SUCCESS,
          recentFiles: mockState.recentFiles,
        } as RecentFilesAction,
      );

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update recentFiles list', () => {
        expect(newState.recentFilesList).toEqual(mockState.recentFiles);
      });
    });

    describe('on failure', () => {
      const newState = recentFilesReducer(recentFilesState, {
        type: FETCH_RECENT_FILES_LIST_FAILURE,
        error: errorMock,
      } as RecentFilesAction);

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update error property', () => {
        expect(newState.error).toEqual(errorMock);
      });
    });
  });
  describe('should reverse recent files list', () => {
    const newState = recentFilesReducer(recentFilesState, { type: 'REVERSE_RECENT_FILES_LIST' } as RecentFilesAction);

    expect(newState.recentFilesList).toEqual(reverse(newState.recentFilesList));
  });
});

describe('selectors', () => {
  describe('getRecentFiles', () => {
    it('should return recentFiles', () => {
      expect(getRecentFiles(state)).toEqual(recentFilesState);
    });
  });

  describe('getIsLoading', () => {
    it('should return loading status', () => {
      expect(getIsLoading(state)).toEqual(recentFilesState.isLoading);
    });
  });

  describe('getRecentFilesList', () => {
    it('should return recentFiles list', () => {
      expect(getRecentFilesList(state)).toEqual(recentFilesState.recentFilesList);
    });
  });

  describe('getError', () => {
    it('should return error', () => {
      expect(getError(state)).toEqual(recentFilesState.error);
    });
  });
});
