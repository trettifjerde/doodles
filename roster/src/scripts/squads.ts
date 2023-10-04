import { SquadInfo } from "./squads-info";

export class Squad {

    static nextSquadId = 1;
    
    public tag: string;
    public id: number;
    public slots: number;
    public with: string[];
    public without: string[];

    constructor(squad: SquadInfo) {
        this.tag = squad.tag;
        this.slots = squad.slots;
        this.with = [...squad.with];
        this.without = [...squad.without];

        this.id = Squad.nextSquadId;
        Squad.nextSquadId *= 2;
    }
}