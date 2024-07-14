export interface Appointment {
  id: string;
  appointment_date: string;
  appointment_address: string;
  contact_id: string[];
  contact_name: string[];
  contact_surname: string[];
  contact_email: string[];
  contact_phone: string[];
  agent_id: string[];
  is_cancelled: boolean;
}
