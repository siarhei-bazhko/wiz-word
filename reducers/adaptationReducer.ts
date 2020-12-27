import adaptationConstants from "../contants/adaptationConstants"
import { BatterySituation, NetworkSituation } from "../types/Adapation";

const initState = {
  energy: {
    status: BatterySituation.CHARGING,
    forcedOffline: false
  },
  offline: {
      network: NetworkSituation.OFFLINE,
      server: NetworkSituation.SERVER_UNAVALIABLE
  },
  isSynchronized: false,
}

const adaptationReducer = (state = initState, action: any) => {
  switch (action.type) {
    case adaptationConstants.BATTERY_STATUS:
      return { ...state, energy: { ...state.energy, status: action.status} }

    case adaptationConstants.NETWORK_STATUS:
      return { ...state, offline: action.offline }

    case adaptationConstants.FORCED_OFFLINE:
      // TODO: copy local state in case "true"
      return { ...state, energy: { ...state.energy, forcedOffline: action.forcedOffline } }

    case adaptationConstants.IS_SYNCHRONIZED:
      return { ...state, isSynchronized: action.isSynchronized}
    default:
      return state;
  }
}

export default adaptationReducer
