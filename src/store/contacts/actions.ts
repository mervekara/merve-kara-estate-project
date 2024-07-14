import { ActionTree } from "vuex";
import { RootState } from "../index";
import { ContactsState } from "./types";
import { fetchData } from "../../services/index";
import { contactsTableName, SET_CONTACTS } from "@/constants";
import { AirtableError } from "@/utils/errors";

const actions: ActionTree<ContactsState, RootState> = {
  async fetchContacts({ commit }) {
    try {
      const contacts = await fetchData(contactsTableName);
      commit(SET_CONTACTS, contacts);
    } catch (error) {
      const err = new AirtableError(
        `Failed to fetch contacts from ${contactsTableName}`,
        error
      );
      console.error(err);

      throw err;
    }
  },
};

export default actions;
