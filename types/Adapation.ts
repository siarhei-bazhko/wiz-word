enum BatterySituation {
  CHARGING = 0,
  GOOD_BATTERY = 1,
  MEDIUM_BATTERY = 2,
  LOW_BATTERY = 3
}

enum NetworkSituation {
  ONLINE = 0,
  SERVER_AVALIABLE = 1,

  OFFLINE = 2,
  SERVER_UNAVALIABLE = 3
}

enum UserNotification {
  INTERNET_UNREACHABLE = 0,
  LIMITED_FUNCTIONALITY = 1,
}

export {
  BatterySituation,
  NetworkSituation,
  UserNotification
}
