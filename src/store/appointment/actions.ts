import { ActionTree } from "vuex";
import { RootState } from "../index";
import { AppointmentState } from "./types";
import { fetchAppointment, updateAppointment } from "../../services";
import {
  appointmentsTableName,
  SET_APPOINMENT,
  UPDATE_APPOINMENT,
} from "@/constants";
import { AirtableError } from "@/utils/errors";
import { Appointment } from "@/types";

const actions: ActionTree<AppointmentState, RootState> = {
  async fetchAppointment({ commit }, id: string) {
    try {
      const appointment = await fetchAppointment(appointmentsTableName, id);
      commit(SET_APPOINMENT, appointment);
    } catch (error) {
      const err = new AirtableError(
        `Failed to fetch appointment from ${appointmentsTableName}`,
        error
      );
      console.error(err);
      throw err;
    }
  },
  async updateAppointment(
    { commit },
    { id, fields }: { id: string; fields: Partial<Appointment> }
  ) {
    try {
      const updatedAppointment = await updateAppointment(
        id,
        appointmentsTableName,
        fields
      );
      commit(UPDATE_APPOINMENT, updatedAppointment);
    } catch (error) {
      const err = new AirtableError(
        `Error update appointment from ${appointmentsTableName}`,
        error
      );
      console.error(err);
      throw err;
    }
  },
};

export default actions;
