import { Agent } from "@/store/agents/types";
import { Appointment } from "@/types";

// Format contact names
export const formatNames = (appointment: Appointment): string => {
  const { contact_name, contact_surname } = appointment;

  if (contact_name && contact_surname) {
    return contact_name
      .map((name, index) => `${name} ${contact_surname[index]}`)
      .join(", ");
  }
  return "";
};

// Format contact emails
export const formatEmails = (appointment: Appointment): string => {
  return appointment.contact_email ? appointment.contact_email.join(", ") : "";
};

// Format contact phone numbers
export const formatPhoneNumbers = (appointment: Appointment): string => {
  return appointment.contact_phone ? appointment.contact_phone.join(", ") : "";
};

// Get agent initials
export const getAgentInitial = (agent: Agent): string => {
  const { agent_name, agent_surname } = agent;

  if (agent_name && agent_surname) {
    return `${agent_name.charAt(0)}${agent_surname.charAt(0)}`;
  }
  return "";
};

// Get agent initials
export const getAgentInitials = (agentId: string, agents: Agent[]): string => {
  const agent = agents.find((agent) => agent.id === agentId);

  return agent ? getAgentInitial(agent) : "";
};

// Get agent color
export const getAgentColor = (agentId: string, agents: Agent[]): string => {
  const agent = agents.find((agent) => agent.id === agentId);
  return agent?.color || "#ccc";
};

// Get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Completed":
      return "text-green-500";
    case "Cancelled":
      return "text-red-500";
    case "Upcoming":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

// Format appointment date to "MM/DD/YYYY HH:mm"
export const formatDate = (date: string): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

// Determine status
export const determineStatus = (appointment: Appointment): string => {
  const { is_cancelled, appointment_date } = appointment;

  if (is_cancelled) {
    return "Cancelled";
  }
  const appointmentDate = new Date(appointment_date);
  if (appointmentDate < new Date()) {
    return "Completed";
  }
  return "Upcoming";
};

// Calculate time until the appointment
export const calculateTimeUntil = (date: string): string => {
  const appointmentDate = new Date(date);
  const now = new Date();
  const diffMs = appointmentDate.getTime() - now.getTime();

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (diffDays > 0) {
    return `${diffDays} days`;
  } else if (diffHours > 0) {
    return `${diffHours} hours`;
  } else {
    return "less than an hour";
  }
};
