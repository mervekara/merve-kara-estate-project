import { MutationTree } from "vuex";
import { ContactsState, Contact } from "./types";
import { SET_CONTACTS } from "@/constants";

const mutations: MutationTree<ContactsState> = {
  [SET_CONTACTS](state, contacts: Contact[]) {
    state.contacts = contacts;
  },
};

export default mutations;
