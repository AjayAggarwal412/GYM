import {
  CLIENTS_CREATE_FAIL,
  CLIENTS_CREATE_REQUEST,
  CLIENTS_CREATE_SUCCESS,
  CLIENTS_DASHBOARD_FAIL,
  CLIENTS_DASHBOARD_REQUEST,
  CLIENTS_DASHBOARD_SUCCESS,
  CLIENTS_DELETE_FAIL,
  CLIENTS_DELETE_REQUEST,
  CLIENTS_DELETE_SUCCESS,
  CLIENTS_LIST_FAIL,
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_SUCCESS,
  CLIENTS_NOTIFY_FAIL,
  CLIENTS_NOTIFY_REQUEST,
  CLIENTS_NOTIFY_SUCCESS,
  CLIENTS_UPDATE_FAIL,
  CLIENTS_UPDATE_REQUEST,
  CLIENTS_UPDATE_SUCCESS,
} from "../constants/clientConstants";
import axios from "axios";

export const listClients = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENTS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get(
      "http://localhost:5000/api/newClients",
      config
    );

    dispatch({ type: CLIENTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: CLIENTS_LIST_FAIL, payload: message });
  }
};

export const createClientAction =
  (clientId, name, phone, joiningDate, plan) => async (dispatch, getState) => {
    try {
      dispatch({ type: CLIENTS_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/newClients/create`,
        { clientId, name, phone, joiningDate, plan },
        config
      );

      dispatch({ type: CLIENTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CLIENTS_CREATE_FAIL, payload: message });
    }
  };

export const updateClientAction =
  (id, clientId, name, phone, joiningDate, plan) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CLIENTS_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/newClients/${id}`,
        { clientId, name, phone, joiningDate, plan },
        config
      );

      dispatch({ type: CLIENTS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CLIENTS_UPDATE_FAIL, payload: message });
    }
  };

export const deleteClientAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENTS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/newClients/${id}`,
      config
    );

    dispatch({ type: CLIENTS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: CLIENTS_DELETE_FAIL, payload: message });
  }
};

export const clientDashboard = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENTS_DASHBOARD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.post(
      "http://localhost:5000/api/newClients/dashboard",
      config
    );

    dispatch({ type: CLIENTS_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: CLIENTS_DASHBOARD_FAIL, payload: message });
  }
};
