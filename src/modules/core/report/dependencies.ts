import {TYPES} from "./application/constants/types";
import {
    GetReportRepository,
} from "./infrastructure/persistence/repository/evolution/getReport.repository";

export const DependenciesConstants = [
    // arp studio

    // vela gaming

    //evolution
    {provide: TYPES.evolutionRepository.GetReportRepositoryInterface, useClass: GetReportRepository},
];