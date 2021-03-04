import { api } from "infraestructure/helpers";
import { IRainFall } from "application/types";

function getAll(): Promise<IRainFall[]> {
  return api.get(`weather34/rain`) ;
}

export const weatherService = {
  getAll,
};
