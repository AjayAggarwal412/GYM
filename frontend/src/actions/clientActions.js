import Axios from "axios";
import {
  CLIENTS_CREATE_FAIL,
  CLIENTS_CREATE_REQUEST,
  CLIENTS_CREATE_SUCCESS,
  CLIENTS_LIST_FAIL,
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_SUCCESS,
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

    const { data } = await Axios.get(
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
  (clientId, name, phone, joiningDate) => async (dispatch, getState) => {
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
        { clientId, name, phone, joiningDate },
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
  (id, clientId, name, phone, joiningDate) => async (dispatch, getState) => {
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
        { clientId, name, phone, joiningDate },
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
