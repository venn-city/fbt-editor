import deepFreeze from 'deep-freeze';
import { ProjectItemsAction } from '../store/duck/projectItems';
import {
  fetchProjectsList,
  fetchProjectsListFailure,
  fetchProjectsListSuccess, FETCH_PROJECTS_LIST,
  FETCH_PROJECTS_LIST_FAILURE,
  FETCH_PROJECTS_LIST_SUCCESS,
  getError,
  getIsLoading,
  getProjects,
  getProjectsList,

  ProjectsAction, projectsReducer,

  ProjectsState,
} from '../store/duck/projects';
import { Project } from '../store/entities';
import { ApiError } from '../utils/errorTypes';

const projectsState: ProjectsState = {
  projectsList: [],
  isLoading: false,
  error: null,
};

const state = {
  projects: projectsState,
};

const errorMock = { message: "message", status: 409 } as ApiError;

const mockState = {
  projectsList: [{id:'test/main/'} as Project],
};

describe('projects actions', () => {
  it('fetchProjectsList', () => {
    const { type } = fetchProjectsList();

    expect(type).toBe(FETCH_PROJECTS_LIST);
  });

  it('fetchProjectsListSuccess', () => {
    const { projects, type } = fetchProjectsListSuccess(mockState.projectsList);

    expect(type).toBe(FETCH_PROJECTS_LIST_SUCCESS);
    expect(projects).toBe(mockState.projectsList);
  });

  it('fetchProjectsListFailure', () => {
    const { type, error } = fetchProjectsListFailure(errorMock);

    expect(type).toBe(FETCH_PROJECTS_LIST_FAILURE);
    expect(error).toBe(errorMock);
  });
});

describe('projects reducer', () => {
  beforeAll(() => {
    deepFreeze(state);
  });

  describe('when receiving not relative action', () => {
    it('should return default state', () => {
      const newState = projectsReducer(projectsState, { type: 'RANDOM_NAME' } as ProjectsAction);
      expect(newState).toEqual(projectsState);
    });
  });

  describe('start fetching projects list', () => {
    describe('on success', () => {
      const newState = projectsReducer(
        projectsState,
        {
          type: FETCH_PROJECTS_LIST_SUCCESS,
          projects: mockState.projectsList,
        } as ProjectsAction,
      );

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update projects list', () => {
        expect(newState.projectsList).toEqual(mockState.projectsList);
      });
    });

    describe('on failure', () => {
      const newState = projectsReducer(projectsState, {
        type: FETCH_PROJECTS_LIST_FAILURE,
        error: errorMock,
      } as ProjectsAction);

      it('should set isLoading flag to false', () => {
        expect(newState.isLoading).toEqual(false);
      });

      it('should update error property', () => {
        expect(newState.error).toEqual(errorMock);
      });
    });
  });
});

describe('selectors', () => {
  describe('getProjects', () => {
    it('should return projects', () => {
      expect(getProjects(state)).toEqual(projectsState);
    });
  });

  describe('getIsLoading', () => {
    it('should return loading status', () => {
      expect(getIsLoading(state)).toEqual(projectsState.isLoading);
    });
  });

  describe('getProjectsList', () => {
    it('should return projects list', () => {
      expect(getProjectsList(state)).toEqual(projectsState.projectsList);
    });
  });

  describe('getError', () => {
    it('should return error', () => {
      expect(getError(state)).toEqual(projectsState.error);
    });
  });
});
