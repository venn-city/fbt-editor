import deepFreeze from "deep-freeze";
import {
  clearProjectItemStatus,
  CLEAR_PROJECT_ITEM_STATUS,
  createProjectItem,
  createProjectItemSuccess,
  CREATE_PROJECT_ITEM,
  CREATE_PROJECT_ITEM_SUCCESS,
  deleteProjectItem,
  deleteProjectItemFailure,
  deleteProjectItemSuccess,
  DELETE_PROJECT_ITEM,
  DELETE_PROJECT_ITEM_FAILURE,
  DELETE_PROJECT_ITEM_SUCCESS,
  fetchProjectItemsList,
  fetchProjectItemsListFailure,
  fetchProjectItemsListSuccess,
  FETCH_PROJECT_ITEMS_LIST,
  FETCH_PROJECT_ITEMS_LIST_FAILURE,
  FETCH_PROJECT_ITEMS_LIST_SUCCESS,
  getError,
  getIsCreatingProjectItem,
  getIsLoading,
  getProjectItems,
  getProjectItemsList,
  ProjectItemsAction,
  projectItemsReducer,
  uploadSourceFile,
  UPLOAD_SOURCE_FILE,
} from "../store/duck/projectItems";
import {
  CreateItemRequest,
  DeleteItemRequest,
  ProjectItem,
} from "../store/entities";
import { ApiError } from "../utils/errorTypes";

const projectItemsState = {
  projectItemsList: [],
  isLoading: false,
  error: null,
  isUpdatingProjectItems: false,
};

const state = {
  projectItems: projectItemsState,
};

const errorMock = { message: "message", status: 409 } as ApiError;

const mockState = {
  projectId: "testProjectId",
  fileId: "testFileId",
  projectItemId: "testProjectItemId",
  parentFolderId: "parentFolderId",
  projectItems: [],
  targetLanguage: "en",
  formData: new FormData(),
  projectItemsList: [{ id: "test/main/" } as ProjectItem],
};

describe("projectItems actions", () => {
  it("fetchProjectItemsList", () => {
    const { type, projectId, projectItemId } = fetchProjectItemsList(
      mockState.projectId,
      mockState.projectItemId,
    );

    expect(type).toBe(FETCH_PROJECT_ITEMS_LIST);
    expect(projectId).toBe(mockState.projectId);
    expect(projectItemId).toBe(mockState.projectItemId);
  });

  it("fetchProjectItemsListSuccess", () => {
    const { projectItems, type } = fetchProjectItemsListSuccess(
      mockState.projectItems,
    );

    expect(type).toBe(FETCH_PROJECT_ITEMS_LIST_SUCCESS);
    expect(projectItems).toBe(mockState.projectItems);
  });

  it("fetchProjectItemsListFailure", () => {
    const { type, error } = fetchProjectItemsListFailure(errorMock);

    expect(type).toBe(FETCH_PROJECT_ITEMS_LIST_FAILURE);
    expect(error).toBe(errorMock);
  });

  it("createProjectItem", () => {
    const action = createProjectItem({
      projectId: mockState.projectId,
      parentFolderId: mockState.parentFolderId,
      name: mockState.projectItemId,
      targetLanguage: mockState.targetLanguage,
    } as CreateItemRequest);

    expect(action.type).toBe(CREATE_PROJECT_ITEM);
    expect(action.сreateItemRequest!.projectId).toBe(mockState.projectId);
    expect(action.сreateItemRequest!.name).toBe(mockState.projectItemId);
    expect(action.сreateItemRequest!.targetLanguage).toBe(
      mockState.targetLanguage,
    );
    expect(action.сreateItemRequest!.parentFolderId).toBe(
      mockState.parentFolderId,
    );
  });

  it("createProjectItemSuccess", () => {
    const { type } = createProjectItemSuccess();
    expect(type).toBe(CREATE_PROJECT_ITEM_SUCCESS);
  });

  it("clearProjectItemStatus", () => {
    const { type } = clearProjectItemStatus();

    expect(type).toBe(CLEAR_PROJECT_ITEM_STATUS);
  });

  it("deleteProjectItem", () => {
    const deleteItem: DeleteItemRequest = {
      projectId: mockState.projectId,
      itemId: mockState.projectItemId,
    } as DeleteItemRequest;
    const { type, deleteItemRequest } = deleteProjectItem(deleteItem);
    expect(type).toBe(DELETE_PROJECT_ITEM);
    expect(deleteItemRequest!.projectId).toBe(mockState.projectId);
    expect(deleteItemRequest!.itemId).toBe(mockState.projectItemId);
  });

  it("deleteProjectItemSuccess", () => {
    const { type } = deleteProjectItemSuccess();

    expect(type).toBe(DELETE_PROJECT_ITEM_SUCCESS);
  });

  it("deleteProjectItemFailure", () => {
    const { type, error } = deleteProjectItemFailure(errorMock);

    expect(type).toBe(DELETE_PROJECT_ITEM_FAILURE);
    expect(error).toBe(errorMock);
  });

  it("uploadSourceFile", () => {
    const { type, formData } = uploadSourceFile(mockState.formData);

    expect(type).toBe(UPLOAD_SOURCE_FILE);
    expect(formData).toBe(mockState.formData);
  });
});

describe("projectItems reducer", () => {
  beforeAll(() => {
    deepFreeze(state);
  });

  describe("when receiving not relative action", () => {
    it("should return default state", () => {
      const newState = projectItemsReducer(projectItemsState, {
        type: "RANDOM_NAME",
      } as ProjectItemsAction);
      expect(newState).toEqual(projectItemsState);
    });
  });

  describe("start fetching projectItems list", () => {
    describe("on success", () => {
      const newState = projectItemsReducer(projectItemsState, {
        type: FETCH_PROJECT_ITEMS_LIST_SUCCESS,
        projectItems: mockState.projectItemsList,
      } as ProjectItemsAction);

      it("should set isLoading flag to false", () => {
        expect(newState.isLoading).toEqual(false);
      });

      it("should update projectItems list", () => {
        expect(newState.projectItemsList).toEqual(mockState.projectItemsList);
      });
    });

    describe("on failure", () => {
      const newState = projectItemsReducer(projectItemsState, {
        type: FETCH_PROJECT_ITEMS_LIST_FAILURE,
        error: errorMock,
      } as ProjectItemsAction);

      it("should set isLoading flag to false", () => {
        expect(newState.isLoading).toEqual(false);
      });

      it("should update error property", () => {
        expect(newState.error).toEqual(errorMock);
      });
    });
  });

  describe("create projectItem", () => {
    describe("on success", () => {
      const newState = projectItemsReducer(projectItemsState, {
        type: CREATE_PROJECT_ITEM,
      } as ProjectItemsAction);

      it("should set isLoading flag to true", () => {
        expect(newState.isLoading).toEqual(true);
      });
    });
  });

  describe("upload source file", () => {
    describe("on success", () => {
      const newState = projectItemsReducer(projectItemsState, {
        type: UPLOAD_SOURCE_FILE,
      } as ProjectItemsAction);

      it("should update status properties", () => {
        expect(newState.isLoading).toEqual(true);
        expect(newState.isUpdatingProjectItems).toEqual(false);
      });
    });
  });
});

describe("selectors", () => {
  describe("getProjectItems", () => {
    it("should return projectItems", () => {
      expect(getProjectItems(state)).toEqual(projectItemsState);
    });
  });

  describe("getIsLoading", () => {
    it("should return loading status", () => {
      expect(getIsLoading(state)).toEqual(projectItemsState.isLoading);
    });
  });

  describe("getProjectItemsList", () => {
    it("should return projectItems list", () => {
      expect(getProjectItemsList(state)).toEqual(
        Object.values(projectItemsState.projectItemsList),
      );
    });
  });

  describe("getIsCreatingProjectItem", () => {
    it("should return status of creating projectItem", () => {
      expect(getIsCreatingProjectItem(state)).toEqual(
        projectItemsState.isUpdatingProjectItems,
      );
    });
  });

  describe("getError", () => {
    it("should return error", () => {
      expect(getError(state)).toEqual(projectItemsState.error);
    });
  });
});
