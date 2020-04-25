import { combineReducers } from "redux";

import user from "./user";
import project from "./project";
import task from "./task";
import label from "./label";
import feedback from "./feedback";
import dynamic from "./dynamic";
import help from "./help";
import cache from "./cache";
import statistics from "./statistics";
import home from "./home";
export default combineReducers({
  user,
  project,
  task,
  label,
  feedback,
  dynamic,
  help,
  cache,
  statistics,
  home
});
