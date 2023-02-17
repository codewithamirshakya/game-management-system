export interface IseTransIdUniqueRepositoryInterface{
  isUnique(eTransId:string):Promise<boolean>;
}