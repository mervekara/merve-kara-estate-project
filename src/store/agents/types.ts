export interface Agent {
  id: string;
  agent_name: string;
  agent_surname: string;
  color: string;
}

export interface AgentsState {
  agents: Agent[];
}
