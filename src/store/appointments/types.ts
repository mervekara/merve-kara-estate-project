import { Appointment } from "@/types";

export interface AppointmentsState {
  appointments: Appointment[];
  selectedStatusFilter: string;
}
