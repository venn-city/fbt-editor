import deepFreeze from 'deep-freeze';
import {
  clearFilteredFileContent, CLEAR_FILTERED_FILE_CONTENT,
  fetchFileContent,
  fetchFileContentFailure,
  fetchFileContentSuccess, FETCH_FILE_CONTENT,
  FETCH_FILE_CONTENT_FAILURE,
  FETCH_FILE_CONTENT_SUCCESS,
  FileContentAction, fileContentReducer,
  FileContentState, getError,
  getFileContent,
  getFileContentList,
  getFilteredContentList,
  getIsLoading,
  getTargetLanguage,
  setFilteredFileContent, SET_FILTERED_FILE_CONTENT,
  updateFileContent,
  updateFileContentFailure,
  updateFileContentField,
  updateFileContentSuccess, UPDATE_FILE_CONTENT,
  UPDATE_FILE_CONTENT_FAILURE,
  UPDATE_FILE_CONTENT_FIELD,
  UPDATE_FILE_CONTENT_SUCCESS,
} from '../store/duck/fileContent';
import { ProjectFileItem } from '../store/entities';
import { ApiError } from '../utils/errorTypes';

const fileContentState:FileContentState = {
  fileContentMap: {},
  isLoading: false,
  error: null,
  filteredFileContentList: [],
  targetLanguage: 'English',
};

const state = {
  fileContent: fileContentState,
};

const errorMock = { message: 'testMessage', status: 409 } as ApiError;

const fileContentAction: FileContentAction = {
  projectId: 'testProjectId',
  fileId: 'testFileId',
  projectFileItems: [{id:"hash", source:"source", target:"target"} as ProjectFileItem],
  targetLanguage: 'testTargetLanguage',
  updateFileItemData: { id: 'testField', value: "value" },
  searchTerm: 'testSearchTerm',
  type: '',
  error: errorMock,
};

describe('fileContent actions', () => {
  it('fetchFileContent', () => {
    const { type, projectId, fileId } = fetchFileContent(fileContentAction.projectId, fileContentAction.fileId);

    expect(type).toBe(FETCH_FILE_CONTENT);
    expect(projectId).toBe(fileContentAction.projectId);
    expect(fileId).toBe(fileContentAction.fileId);
  });

  it('fetchFileContentSuccess', () => {
    const { targetLanguage, projectFileItems, type } = fetchFileContentSuccess(
      fileContentAction.projectFileItems!,
      fileContentAction.targetLanguage!,
    );

    expect(type).toBe(FETCH_FILE_CONTENT_SUCCESS);
    expect(targetLanguage).toBe(fileContentAction.targetLanguage);
    expect(projectFileItems).toBe(fileContentAction.projectFileItems);
  });

  it('fetchFileContentFailure', () => {
    const { type, error } = fetchFileContentFailure(errorMock);

    expect(type).toBe(FETCH_FILE_CONTENT_FAILURE);
    expect(error).toBe(errorMock);
  });

  it('updateFileContent', () => {
    const { type, projectId, fileId, targetLanguage, projectFileItems } = updateFileContent(
      fileContentAction.projectId,
      fileContentAction.fileId,
      fileContentAction.targetLanguage!,
      fileContentAction.projectFileItems!,
    );

    expect(type).toBe(UPDATE_FILE_CONTENT);
    expect(projectId).toBe(fileContentAction.projectId);
    expect(targetLanguage).toBe(fileContentAction.targetLanguage);
    expect(projectFileItems).toBe(fileContentAction.projectFileItems);
  });

  it('updateFileContentSuccess', () => {
    const { type } = updateFileContentSuccess();
    expect(type).toBe(UPDATE_FILE_CONTENT_SUCCESS);
  });

  it('updateFileContentFailure', () => {
    const { type, error } = updateFileContentFailure(errorMock);

    expect(type).toBe(UPDATE_FILE_CONTENT_FAILURE);
    expect(error).toBe(errorMock);
  });

  it('updateFileContentField', () => {
    const { type, updateFileItemData } = updateFileContentField(fileContentAction.updateFileItemData!);

    expect(updateFileItemData).toBe(fileContentAction.updateFileItemData);
    expect(type).toBe(UPDATE_FILE_CONTENT_FIELD);
  });

  it('setFilteredFileContent', () => {
    const { type, searchTerm } = setFilteredFileContent(fileContentAction.searchTerm!);

    expect(type).toBe(SET_FILTERED_FILE_CONTENT);
    expect(searchTerm).toBe(fileContentAction.searchTerm);
  });

  it('clearFilteredFileContent', () => {
    const { type } = clearFilteredFileContent();

    expect(type).toBe(CLEAR_FILTERED_FILE_CONTENT);
  });
});

describe('fileContent reducer', () => {
  beforeAll(() => {
    deepFreeze(state);
  });

  describe('when receiving not relative action', () => {
    it('should return default state', () => {
      const newState = fileContentReducer(fileContentState, { type: 'RANDOM_NAME' } as FileContentAction);
      expect(newState).toEqual(fileContentState);
    });
  });

  describe('start fetching file content', () => {
    const fileContentMap = { [fileContentAction.projectFileItems![0].id]: fileContentAction.projectFileItems![0] };

    describe('on success', () => {
      const newState = fileContentReducer(
        fileContentState,
        {
          type: FETCH_FILE_CONTENT_SUCCESS,
          projectFileItems: fileContentAction.projectFileItems,
          targetLanguage: fileContentAction.targetLanguage,
        } as FileContentAction,
      );

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update file content map', () => {
        expect(newState.fileContentMap).toEqual(fileContentMap);
      });
    });

    describe('on failure', () => {
      const newState = fileContentReducer(fileContentState, {
        type: FETCH_FILE_CONTENT_FAILURE,
        error: errorMock,
      } as FileContentAction);

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update error property', () => {
        expect(newState.error).toEqual(errorMock);
      });
    });
  });

  describe('update file content', () => {
    describe('on success', () => {
      const newState = fileContentReducer(
        fileContentState,
        {
          type: UPDATE_FILE_CONTENT,
        } as FileContentAction,
      );

      it('should set isLoading flag to true', () => {
        expect(newState.isLoading).toEqual(true);
      });
    });

    describe('on failure', () => {
      const newState = fileContentReducer(fileContentState, {
        type: UPDATE_FILE_CONTENT_FAILURE,
        error: errorMock,
      } as FileContentAction);

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update error property', () => {
        expect(newState.error).toEqual(errorMock);
      });
    });
  });

  describe('clear filtered file content', () => {
    describe('on success', () => {
      const newState = fileContentReducer(
        fileContentState,
        {
          type: CLEAR_FILTERED_FILE_CONTENT,
        } as FileContentAction,
      );

      it('should clear file content', () => {
        expect(newState.filteredFileContentList).toEqual([]);
      });
    });
  });
});

describe('selectors', () => {
  describe('getFileContent', () => {
    it('should return fileContent', () => {
      expect(getFileContent(state)).toEqual(fileContentState);
    });
  });

  describe('getIsLoading', () => {
    it('should return loading status', () => {
      expect(getIsLoading(state)).toEqual(fileContentState.isLoading);
    });
  });

  describe('getFileContentList', () => {
    it('should return fileContentList', () => {
      expect(getFileContentList(state)).toEqual(Object.values(fileContentState.fileContentMap));
    });
  });

  describe('getFilteredContentList', () => {
    it('should return filtered content list', () => {
      expect(getFilteredContentList(state)).toEqual(fileContentState.filteredFileContentList);
    });
  });

  describe('getTargetLanguage', () => {
    it('should return target language', () => {
      expect(getTargetLanguage(state)).toEqual(fileContentState.targetLanguage);
    });
  });

  describe('getError', () => {
    it('should return error', () => {
      expect(getError(state)).toEqual(fileContentState.error);
    });
  });
});
