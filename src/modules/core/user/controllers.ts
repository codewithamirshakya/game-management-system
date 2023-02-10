import {DetailController} from "../../../../apps/api/arpStudio/user/detail.controller";
import {DetailController as EvolutionDetailController} from "../../../../apps/api/evolution/user/detail.controller";
import {UpdateController} from "../../../../apps/api/arpStudio/user/update.controller";
import {CreateController} from "../../../../apps/api/vela/user/create.controller";

const ArpStudioControllers = [
    DetailController, UpdateController
];

const VelaGamingControllers = [
    CreateController
];

const EvolutionGamingControllers = [
    EvolutionDetailController
];

export const Controllers = [
    ...VelaGamingControllers,
    ...ArpStudioControllers,
    ...EvolutionGamingControllers,
];