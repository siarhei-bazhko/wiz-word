import adaptationConstants from "../contants/adaptationConstants"
import { BatterySituation, NetworkSituation } from "../types/Adapation";

const initState = {
  energy: {
    status: BatterySituation.CHARGING,
    energyOffline: false
  },
  offline: {
    network: NetworkSituation.OFFLINE,
    server: NetworkSituation.SERVER_UNAVALIABLE
  },
  forcedOffline: false,
  isSynchronized: true,
}

const adaptationReducer = (state = initState, action: any) => {
  switch (action.type) {
    case adaptationConstants.BATTERY_STATUS:
      return { ...state, energy: { ...state.energy, status: action.status} }

    case adaptationConstants.NETWORK_STATUS:
      return { ...state, offline: action.offline }

    case adaptationConstants.FORCED_OFFLINE:
      // TODO: copy local state in case "true"
      return { ...state, forcedOffline: action.forcedOffline }
    case adaptationConstants.ENERGY_OFFLINE:
      return { ...state, energy: {...state.energy, energyOffline: action.energyOffline }}
    case adaptationConstants.IS_SYNCHRONIZED:
      return { ...state, isSynchronized: action.isSynchronized}
    default:
      return state;
  }
}

export default adaptationReducer
