import { MutationTree } from "vuex";
import { AppointmentsState } from "./types";
import {
  ADD_APPOINMENT,
  SET_APPOINMENTS,
  SET_SELECTED_STATUS_FILTER,
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
};

export default mutations;
