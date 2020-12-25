import adaptationConstants from "../contants/adaptationConstants"
import { BatterySituation, NetworkSituation } from "../types/Adapation";

const initState = {
  energy: { status: BatterySituation.CHARGING },
  offline: {
      network: NetworkSituation.OFFLINE,
      server: NetworkSituation.SERVER_UNAVALIABLE
  }
}

const adaptationReducer = (state = initState, action: any) => {
  switch (action.type) {

    case adaptationConstants.BATTERY_STATUS:
      return { ...state, energy: action.status}

    case adaptationConstants.NETWORK_STATUS:
      return { ...state, offline: action.offline }

    default:
      return state;
  }
}

export default adaptationReducer
