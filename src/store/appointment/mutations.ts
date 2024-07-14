import { MutationTree } from "vuex";
import { AppointmentState } from "./types";
import { SET_APPOINMENT, UPDATE_APPOINMENT } from "@/constants";
import { Appointment } from "@/types";

const mutations: MutationTree<AppointmentState> = {
  [SET_APPOINMENT](state, appointment: Appointment | null) {
    state.appointment = appointment;
  },
  [UPDATE_APPOINMENT](state, updatedAppointment: Appointment) {
    state.appointment = updatedAppointment;
  },
};

export default mutations;
