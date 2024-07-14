export interface Contact {
  id: string;
  contact_id: string;
  contact_name: string;
  contact_surname: string;
  contact_email: string;
  contact_phone: string;
}

export interface ContactsState {
  contacts: Contact[];
}
