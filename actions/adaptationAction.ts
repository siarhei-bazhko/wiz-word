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

const setForcedOffline = (forcedOffline : boolean) => ({
  type: adaptationConstants.FORCED_OFFLINE,
  forcedOffline
})

const isSynchronized = (isSynchronized: boolean) => ({
  type: adaptationConstants.IS_SYNCHRONIZED,
  isSynchronized
})

export {
  setBatterySituation,
  setNetworkSituation,
  setForcedOffline,
  isSynchronized
}
