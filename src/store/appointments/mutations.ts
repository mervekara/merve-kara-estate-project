import { MutationTree } from "vuex";
import { AppointmentsState } from "./types";
import {
  ADD_APPOINMENT,
  SET_APPOINMENTS,
  SET_FROM_DATE,
  SET_SEARCH_QUERY,
  SET_SELECTED_STATUS_FILTER,
  SET_TO_DATE,
} from "@/constants";
import { Appointment } from "@/types";

const mutations: MutationTree<AppointmentsState> = {
  [SET_APPOINMENTS](state, appointments: Appointment[]) {
    state.appointments = appointments;
  },
  [ADD_APPOINMENT](state, appointment: Appointment) {
    state.appointments.push(appointment);
  },
  [SET_SELECTED_STATUS_FILTER](state, status: string) {
    state.selectedStatusFilter = status;
  },
  [SET_FROM_DATE](state, date: string) {
    state.fromDate = date;
  },
  [SET_TO_DATE](state, date: string) {
    state.toDate = date;
  },
  [SET_SEARCH_QUERY](state, query: string) {
    state.searchQuery = query;
  },
};

export default mutations;
