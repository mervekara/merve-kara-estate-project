import { MutationTree } from "vuex";
import { AgentsState, Agent } from "./types";
import { SET_AGENTS } from "@/constants";

const mutations: MutationTree<AgentsState> = {
  [SET_AGENTS](state, agents: Agent[]) {
    state.agents = agents;
  },
};

export default mutations;
