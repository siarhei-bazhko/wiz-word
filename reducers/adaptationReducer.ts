import adaptationConstants from "../contants/adaptationConstants"
import { BatterySituation } from "../types/Adapation";

const initState = {
  energy: { situation: BatterySituation.CHARGING},
  readyToSync: true,
  isAdaptationOn: false,
  isOffline: false }

const adaptationReducer = (state = initState, action: any) => {
  switch (action.type) {

    case adaptationConstants.BATTERY_STATUS:
      return { ...state, energy: { situation: action.situation }}

    case adaptationConstants.SYNC:
      return { ...state, readyToSync : action.readyToSync, isAdaptationOn: action.isAdaptationOn}

    case adaptationConstants.NETWORK_STATUS:
      return { ...state, isOffline: action.isOffline }

    default:
      return state;
  }
}

export default adaptationReducer
