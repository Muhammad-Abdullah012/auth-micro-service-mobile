export interface IScreenOptions {
  name: string;
  title: string;
}

export enum ROLE {
  PROMPT = "PROMPT",
  RESPONSE = "RESPONSE",
}

export interface IAction {
  type: string;
  payload: any;
}
