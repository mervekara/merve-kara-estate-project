import { MutationTree } from "vuex";
import { AppointmentsState } from "./types";
import { ADD_APPOINMENT, SET_APPOINMENTS } from "@/constants";
import { Appointment } from "@/types";

const mutations: MutationTree<AppointmentsState> = {
  [SET_APPOINMENTS](state, appointments: Appointment[]) {
    state.appointments = appointments;
  },
  [ADD_APPOINMENT](state, appointment: Appointment) {
    state.appointments.push(appointment);
  },
};

export default mutations;
