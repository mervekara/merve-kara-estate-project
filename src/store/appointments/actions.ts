import { ActionTree } from "vuex";
import { RootState } from "../index";
import { AppointmentsState } from "./types";
import { fetchData, createAppointment } from "../../services/";
import {
  ADD_APPOINMENT,
  appointmentsTableName,
  SET_APPOINMENTS,
  SET_FROM_DATE,
  SET_SEARCH_QUERY,
  SET_SELECTED_STATUS_FILTER,
  SET_TO_DATE,
} from "@/constants";
import { AirtableError } from "@/utils/errors";
import { Appointment } from "@/types";

const actions: ActionTree<AppointmentsState, RootState> = {
  async fetchAppointments({ commit }) {
    try {
      const appointments = await fetchData(appointmentsTableName);
      commit(SET_APPOINMENTS, appointments);
    } catch (error) {
      const err = new AirtableError(
        `Failed to fetch appointments from ${appointmentsTableName}`,
        error
      );
      console.error(err);

      throw err;
    }
  },
  async createAppointment({ commit }, fields: Partial<Appointment>) {
    try {
      const appointment = await createAppointment(
        appointmentsTableName,
        fields
      );
      commit(ADD_APPOINMENT, appointment);
    } catch (error) {
      const err = new AirtableError(
        `Failed to create appointment in ${appointmentsTableName}`,
        error
      );
      console.error(err);

      throw err;
    }
  },
  updateStatusFilter({ commit }, status: string) {
    commit(SET_SELECTED_STATUS_FILTER, status);
  },
  updateFromDate({ commit }, date: string) {
    commit(SET_FROM_DATE, date);
  },
  updateToDate({ commit }, date: string) {
    commit(SET_TO_DATE, date);
  },
  updateSearchQuery({ commit }, query: string) {
    commit(SET_SEARCH_QUERY, query);
  },
};

export default actions;
