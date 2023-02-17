export interface ListGameRepositoryInterface {
  getGameListWithClassification(format: ('plain' | 'object'));
  getGameListWithBets(format: ('plain' | 'object'));
}