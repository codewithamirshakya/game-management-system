enum PlayModeEnum {
  'real_money' = "real_money" ,
  'reward_games'= "reward_games",
  'play_for_fun'= "play_for_fun",
  'demo'= "demo",
}

class Brand {

  readonly id: string;

  readonly skin: string;
}
class Table {

  readonly id: string;

  readonly seat: number;
}

class Channel {
  readonly wrapped: Boolean;

  readonly mobile: Boolean;
}

class Game {
  readonly category: string;

  readonly interface: string;

  readonly table: Table;

  readonly playMode: PlayModeEnum;
}

class Urls {
  readonly cashier: string;

  readonly responsibleGaming: string;

  readonly lobby: string;

  readonly sessionTimeout: string;

  readonly gameHistory: string;

  readonly realityCheckURL: string;

  readonly rngGoLiveURL: string;

  readonly rngGoLiveURLMobile: string;

  readonly rngLobbyButton: string;

  readonly rngCloseButton: string;

  readonly rngHomeButton: string;

  readonly rngSessionTimeout: string;

  readonly rngErrorHandling: string;

  readonly sweSelfTest: string;

  readonly sweGameLimits: string;

  readonly sweSelfExclusion: string;
}
export class ConfigDto {
  
  readonly brand: Brand;

  readonly game: Game;

  readonly channel: Channel;

  readonly urls: Urls;

  readonly freeGames: boolean;
}






