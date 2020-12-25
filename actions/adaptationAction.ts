import adaptationConstants from "../contants/adaptationConstants"
import { BatterySituation } from "../types/Adapation"

const setBatterySituation = (situation: BatterySituation) => ({
  type: adaptationConstants.BATTERY_STATUS,
  situation })

const setSyncReady = (readyToSync: boolean, isAdaptationOn: boolean) => ({
  type: adaptationConstants.SYNC,
  readyToSync,
  isAdaptationOn
})

const setNetworkSituation = (isOffline: boolean) => ({
  type: adaptationConstants.NETWORK_STATUS,
  isOffline
})

export {
  setBatterySituation,
  setSyncReady,
  setNetworkSituation
}
