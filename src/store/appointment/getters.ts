import { GetterTree } from "vuex";
import { RootState } from "../index";
import { AppointmentState } from "./types";

export const getters: GetterTree<AppointmentState, RootState> = {
  getAppointmentData: (state) => {
    return state.appointment;
  },
};
