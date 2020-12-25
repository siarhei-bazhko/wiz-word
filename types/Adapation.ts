enum BatterySituation {
  CHARGING = 0,
  GOOD_BATTERY = 1,
  MEDIUM_BATTERY = 2,
  LOW_BATTERY = 3
}

enum NetworkSituation {
  ONLINE = 0,
  OFFLINE = 1,
  SERVER_UNAVALIABLE = 2
}

export {
  BatterySituation,
  NetworkSituation
}
