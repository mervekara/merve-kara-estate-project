import { MutationTree } from "vuex";
import { AgentsState, Agent } from "./types";
import { SET_AGENTS, SET_SELECTED_AGENTS } from "@/constants";

const mutations: MutationTree<AgentsState> = {
  [SET_AGENTS](state, agents: Agent[]) {
    state.agents = agents;
  },
  [SET_SELECTED_AGENTS](state, agents: string[]) {
    state.selectedAgents = agents;
  },
};

export default mutations;
