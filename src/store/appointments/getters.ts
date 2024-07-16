import { GetterTree } from "vuex";
import { RootState } from "../index";
import { AppointmentsState } from "./types";

export const getters: GetterTree<AppointmentsState, RootState> = {
  getAppointmentsData: (state) => {
    return state.appointments;
  },
  selectedStatusFilter: (state) => state.selectedStatusFilter,
  fromDate: (state) => state.fromDate,
  toDate: (state) => state.toDate,
};
