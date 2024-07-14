import { createStore } from "vuex";
import { AgentsState } from "./agents/types";
import { AppointmentsState } from "./appointments/types";
import { AppointmentState } from "./appointment/types";
import { ContactsState } from "./contacts/types";
import { appointments } from "./appointments";
import { appointment } from "./appointment";
import { agents } from "./agents";
import { contacts } from "./contacts";

export interface RootState {
  appointments: AppointmentsState;
  appointment: AppointmentState;
  contacts: ContactsState;
  agents: AgentsState;
}

export const store = createStore({
  modules: {
    appointments,
    appointment,
    agents,
    contacts,
  },
});
