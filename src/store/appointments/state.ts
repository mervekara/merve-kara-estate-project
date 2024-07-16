import { AppointmentsState } from "./types";

const state: AppointmentsState = {
  appointments: [],
  selectedStatusFilter: "All Statuses",
  fromDate: "",
  toDate: "",
  searchQuery: "",
};

export default state;
