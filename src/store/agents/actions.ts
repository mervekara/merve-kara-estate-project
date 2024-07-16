import { ActionTree } from "vuex";
import { RootState } from "../index";
import { AgentsState } from "./types";
import { fetchData } from "../../services/index";
import { agentTableName, SET_AGENTS, SET_SELECTED_AGENTS } from "@/constants";
import { AirtableError } from "@/utils/errors";

const actions: ActionTree<AgentsState, RootState> = {
  async fetchAgents({ commit }) {
    try {
      const agents = await fetchData(agentTableName);
      commit(SET_AGENTS, agents);
    } catch (error) {
      const err = new AirtableError(
        `Error fetching agents from ${agentTableName}`,
        error
      );
      console.error(err);
      throw err;
    }
  },
  updateSelectedAgents({ commit }, agents: string[]) {
    commit(SET_SELECTED_AGENTS, agents);
  },
};

export default actions;
