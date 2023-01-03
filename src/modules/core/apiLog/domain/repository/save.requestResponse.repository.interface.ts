import { SaveApiLogDto } from "../dto/saveApiLog.dto";

export interface SaveRequestResponseRepositoryInterface {
  save(dto: SaveApiLogDto);
}