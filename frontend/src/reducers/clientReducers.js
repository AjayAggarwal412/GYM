import {
  CLIENTS_CREATE_FAIL,
  CLIENTS_CREATE_REQUEST,
  CLIENTS_CREATE_SUCCESS,
  CLIENTS_DELETE_FAIL,
  CLIENTS_DELETE_REQUEST,
  CLIENTS_DELETE_SUCCESS,
  CLIENTS_LIST_FAIL,
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_SUCCESS,
  CLIENTS_UPDATE_FAIL,
  CLIENTS_UPDATE_REQUEST,
  CLIENTS_UPDATE_SUCCESS,
} from "../constants/clientConstants";

export const clientListReducer = (state = { clients: [] }, action) => {
  switch (action.type) {
    case CLIENTS_LIST_REQUEST:
      return { loading: true };
    case CLIENTS_LIST_SUCCESS:
      return { loading: false, clients: action.payload };
    case CLIENTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_CREATE_REQUEST:
      return { loading: true };
    case CLIENTS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case CLIENTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clientUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_UPDATE_REQUEST:
      return { loading: true };
    case CLIENTS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CLIENTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const clientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_DELETE_REQUEST:
      return { loading: true };
    case CLIENTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CLIENTS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
