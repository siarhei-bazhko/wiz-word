import adaptationConstants from "../contants/adaptationConstants"
import { BatterySituation, NetworkSituation } from "../types/Adapation"

const setBatterySituation = (status: BatterySituation) => ({
  type: adaptationConstants.BATTERY_STATUS,
  status
})

const setNetworkSituation = (offline: { network: NetworkSituation, server: NetworkSituation}) => ({
  type: adaptationConstants.NETWORK_STATUS,
  offline
})

export {
  setBatterySituation,
  setNetworkSituation
}
