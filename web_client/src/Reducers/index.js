import {combineReducers} from "redux";
import tabIndexReducer from "./TabIndexReducer"
import ServiceListReducer from "./ServiceListReducer";
import ActionListReducer from "./ActionListReducer";
import ActionParamListReducer from "./ActionParamListReducer";
import AppletListReducer from "./AppletListReducer";
import WallListReducer from "./WallListReducer";
import {reducer as notifications} from 'react-notification-system-redux';
import ReactionListReducer from "./ReactionListReducer";
import ReactionParamListReducer from "./ReactionParamListReducer";
import SelectedActionReducer from "./SelectedActionReducer";
import AppletReducer from "./AppletReducer";
import FormCardReducer from "./FormCardReducer";
import SelectedReactionReducer from "./SelectedReactionReducer";
import displayDialogReducer from "./DisplayDialogReducer";

const allReducers = combineReducers({
   formCard: FormCardReducer,
   displayDialog: displayDialogReducer,
   applet: AppletReducer,
   tabIndex: tabIndexReducer,
   serviceList: ServiceListReducer,
   selectedAction: SelectedActionReducer,
   selectedReaction: SelectedReactionReducer,
   actionList: ActionListReducer,
   reactionList: ReactionListReducer,
   actionParamList: ActionParamListReducer,
   reactionParamList: ReactionParamListReducer,
   notifications: notifications,
   appletList: AppletListReducer,
   wallList: WallListReducer,
});

export default allReducers;