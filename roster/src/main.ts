import { makeRoster } from "./scripts/rosterMaker";
import { Squad } from "./scripts/squads";
import { SQUADS_INFO } from "./scripts/squads-info";
import { Preferences, TagToIdMap, IdToTagMap, Roster, HappinessInfo } from "./scripts/types";

class App {
    squads: {[key: string]: Squad} = {};
    preferences: Preferences = {};
    tagToIdMap : TagToIdMap = {};
    idToTagMap: IdToTagMap = {};
    roster: Roster | null = null;

    root: HTMLDivElement;

    constructor() {
        this.root = document.getElementById('app')! as HTMLDivElement;

        for (const squad of SQUADS_INFO) {
            const s = new Squad(squad);

            this.squads[s.tag] = s;
            this.tagToIdMap[s.tag] = s.id;
            this.idToTagMap[s.id] = s.tag;

            this.preferences[s.tag] = {with: new Set(s.with), without: new Set(s.without)};
        }
    }

    init() {
        let str = 'SQUADS:<br>';

        for (const squadTag in this.squads) {
            const squad = this.squads[squadTag];
            str += `[${squad.tag}] id: ${squad.id}, slots: ${squad.slots}<br>`;
            str += `\tWith: [${Array.from(this.preferences[squad.tag].with).sort((a, b) => a > b ? 1 : -1).join(', ')}]<br>`;
            str += `\tWithout: [${Array.from(this.preferences[squad.tag].without).join(', ')}]<br>`;
            str += '<br>';
        }

        str += 'ID TO TAG MAP:<br>'

        for (const id in this.idToTagMap) {
            str += `${id}: ${this.idToTagMap[+id]}<br>`;
        }

        this.root.innerHTML = str;

        this.roster = makeRoster(this.squads, this.preferences, this.tagToIdMap, this.idToTagMap);

        this.printRoster();
        this.printHappiness();
    }

    printRoster() {

        if (!this.roster)
            return;

        let str = 'BEST ROTATION\n';
    
        for (const server of this.roster.servers) {
    
            str += 'Server:\n';
    
            for (const side of server) {
                str += `${side.slots}: [${side.squads.join(', ')}]\n`;
            }
        }
    
        str += `HAPPINESS: ${this.roster.happiness}\n`;
        str += `DISBALANCE: ${this.roster.disbalance}\n`
        console.log(str);
    }

    printHappiness() {
        if (!this.roster)
            return;

        const happinessInfo : HappinessInfo[] = [];

        for (const server of this.roster.servers) {

            for (const side of server) {

                for (const squad of side.squads) {

                    const squadHappiness : HappinessInfo = {tag: squad, happy: [], unhappy: [], total: 0};

                    for (const otherSquad of side.squads) {

                        if (squad === otherSquad)
                            continue;

                        if (this.preferences[squad].with.has(otherSquad)) {
                            squadHappiness.happy.push(otherSquad);
                            squadHappiness.total += 0.5;
                        }
                        if (this.preferences[squad].without.has(otherSquad)) {
                            squadHappiness.unhappy.push(otherSquad);
                            squadHappiness.total -= 1;
                        }
                    }
                    happinessInfo.push(squadHappiness);
                }
            }
        }

        happinessInfo.sort((a, b) => a.total > b.total ? -1 : 1);
        
        let output = '';
        for (const entry of happinessInfo) {
            output += `[${entry.tag}]: ${this.squads[entry.tag].slots}. Happiness: ${entry.total}.\n`;
            output += entry.happy.length > 0 ? `Рады играть с [${entry.happy.join(', ')}].\n` : '';
            output += entry.unhappy.length > 0 ? `Ворчат из-за [${entry.unhappy.join(', ')}].\n` : '';
            output += '\n';
        }
        console.log(output);
    }
    
}

const app = new App();
app.init();
