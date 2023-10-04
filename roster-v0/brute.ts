type SquadInfo = {id: symbol, slots: number};
type Preferences = {[key: symbol]: {with: Set<symbol>, without: Set<symbol>}};
type SideInfo = {slots: number, squads: symbol[]};
type Rotation = {servers: SideInfo[][], happiness: number, disbalance: number};

/*const info: SquadInfo[] = [
    {id: 'WD', slots: 8},
    {id: 'AS', slots: 6},
    {id: 'RON', slots: 9},
    {id: 'A', slots: 11},
    {id: 'RT', slots: 9},
    {id: 'TAG', slots: 13},
    {id: 'RL', slots: 16},
    {id: '31st', slots: 12},
    {id: 'GROM', slots: 9},
    {id: 'ISKRA', slots: 10},
    {id: 'FB', slots: 10},
    {id: 'Wagner', slots: 8},
    {id: 'KSK', slots: 10},
    {id: 'ORK', slots: 8},
    {id: 'ODN', slots: 8}
];

const preferences : Preferences = {
    WD: {with: new Set(['RON', '31st']), without: new Set(['Wagner', 'TAG'])},
    AS: {with: new Set(['WD']), without: new Set([])},
    RON: {with: new Set(['AS']), without: new Set([])},
    A: {with: new Set(['RL']), without: new Set(['31st', 'KSK'])},
    RT: {with: new Set(['GROM']), without: new Set(['FB', 'ISKRA'])},
    TAG: {with: new Set(['ISKRA']), without: new Set(['Wagner', 'GROM'])},
    RL: {with: new Set(['A', 'Wagner']), without: new Set(['ISKRA'])},
    '31st': {with: new Set(['RON', 'ORK']), without: new Set(['AS'])},
    GROM: {with: new Set(['FB']), without: new Set(['TAG'])},
    ISKRA: {with: new Set([]), without: new Set([])},
    FB: {with: new Set(['A']), without: new Set(['WD'])},
    Wagner: {with: new Set(['TAG', 'GROM']), without: new Set(['KSK'])},
    KSK: {with: new Set(['RT', 'AS']), without: new Set(['RON'])},
    ORK: {with: new Set([]), without: new Set([])},
    ODN: {with: new Set([]), without: new Set([])}
}; */

const AS = Symbol('AS');
const DKK = Symbol('DKK');
const inTeam = Symbol('inTeam');
const RAF = Symbol('RAF');
const FB = Symbol('FB');
const WD = Symbol('WD');
const TAG = Symbol('TAG');
const ISKRA = Symbol('ISKRA');
const V = Symbol('V');
const BAKR = Symbol('BAKR');
const Apex = Symbol('Apex');
const RON = Symbol('RON');
const ODN = Symbol('ODN');
const RL = Symbol('RL');
const Wagner = Symbol('Wagner');
const BCS = Symbol('BCS');
const OT = Symbol('OT');
const BAT = Symbol('BAT');
const AXE = Symbol('AXE');
const ORK = Symbol('ORK');
const st31 = Symbol('31st');
const GROM = Symbol('GROM');
const KSK = Symbol('KSK');
const IT = Symbol('IT');
const SGYR = Symbol('SGYR');
const RT = Symbol('RT');
const VOG = Symbol('vog');
const MSF = Symbol('MSF');
const CBR = Symbol('CBR');
const CU = Symbol('CU');
const FNX = Symbol('FNX');
const AV = Symbol('AV');
const W8 = Symbol('W8');

let info : SquadInfo[] = [
    {id: AS, slots: 7},
    {id: DKK, slots: 10},
    {id: inTeam, slots: 13},
    {id: RAF, slots: 8},
    {id: FB, slots: 12},
    {id: WD, slots: 8},
    {id: TAG, slots: 12},
    {id: ISKRA, slots: 12},
    {id: V, slots: 8},
    {id: BAKR, slots: 6},
    {id: Apex, slots: 12},
    {id: RON, slots: 8},
    {id: ODN, slots: 12},
    {id: RL, slots: 16},
    {id: Wagner, slots: 8},
    {id: BCS, slots: 10},
    {id: OT, slots: 10},
    {id: BAT, slots: 11},
    {id: AXE, slots: 10},
    {id: ORK, slots: 8},
    {id: st31, slots: 12},
    {id: GROM, slots: 9},
    {id: KSK, slots: 10},
    {id: IT, slots: 12},
    {id: SGYR, slots: 8},
    {id: RT, slots: 10},
    {id: VOG, slots: 10},
    {id: MSF, slots: 8},
    {id: CBR, slots: 9},
    {id: CU, slots: 8},
    {id: FNX, slots: 10},
    {id: AV, slots: 10},
    {id: W8, slots: 13},
];

const preferences : Preferences = {
    [AS]: {with: new Set([st31]), without: new Set([GROM, OT])},
    [DKK]: {with: new Set([AS, FNX, IT, VOG]), without: new Set([OT, RAF, RL, W8, Wagner])},
    [inTeam]: {with: new Set([st31, AS, GROM, RAF, WD]), without: new Set([BAT, CU, IT, W8, Wagner])},
    [RAF]: {with: new Set([st31, AV, inTeam, OT]), without: new Set([Apex, TAG, WD])},
    [FB]: {with: new Set([st31, AV, GROM]), without: new Set([CU, TAG])},
    [WD]: {with: new Set([AS, FB, inTeam, RON, TAG]), without: new Set([AXE, BAT, IT, ODN, OT, RL])},
    [TAG]: {with: new Set([AS, AV, GROM, OT, RON]), without: new Set([inTeam, IT, RAF, RL, SGYR])},
    [ISKRA]: {with: new Set([st31, AS, AV, RON, TAG]), without: new Set([Apex, AXE, CU, ODN, VOG])},
    [V]: {with: new Set([st31, AS, AV, TAG]), without: new Set([KSK, OT])},
    [BAKR]: {with: new Set([st31, AV, KSK, RON, WD]), without: new Set([AXE, CU])},
    [Apex]: {with: new Set([st31, AV, FB, MSF, RON]), without: new Set([BAT, CU, ODN, OT, V])},
    [RON]: {with: new Set([st31, AS, ORK, RT, VOG]), without: new Set([inTeam, ODN, RL, SGYR, Wagner])},
    [ODN]: {with: new Set([BAT, GROM, KSK, RL, SGYR]), without: new Set([Apex, AXE, BAKR, TAG, Wagner])},
    [RL]: {with: new Set([AS, BAT, FNX, ORK, RON, WD]), without: new Set([CU, RAF])},
    [Wagner]: {with: new Set([st31, GROM, KSK, RON, W8]), without: new Set([BAKR, CU, inTeam, TAG])},
    [BCS]: {with: new Set([st31, CBR, KSK, RAF, WD]), without: new Set([AV, AXE, BAT, CU])},
    [OT]: {with: new Set([st31, AV, W8]), without: new Set([AS, DKK, inTeam, WD])},
    [BAT]: {with: new Set([st31, AXE, OT, RAF, TAG]), without: new Set([Apex, CU, KSK, RT])},
    [AXE]: {with: new Set([AV, RAF, RT, TAG, VOG]), without: new Set([BCS, inTeam, ODN, OT, RL])},
    [ORK]: {with: new Set([OT, TAG, W8]), without: new Set([st31, GROM, ISKRA, KSK, RON])},
    [st31]: {with: new Set([AV, AXE, FB, GROM, OT]), without: new Set([Apex, BAT, inTeam, RL, SGYR])},
    [GROM]: {with: new Set([st31, FB, GROM, RON]), without: new Set([Apex, AS, CU, OT, RAF, WD])},
    [KSK]: {with: new Set([st31, AV, FB, RAF, WD]), without: new Set([BAT, BCS, RL, SGYR, TAG])},
    [IT]: {with: new Set([st31, AV, FNX, GROM, TAG]), without: new Set([CU, DKK, ISKRA, ORK, RL, Wagner])},
    [SGYR]: {with: new Set([st31, AXE, inTeam, MSF, RAF]), without: new Set([CU, OT, RON, W8])},
    [RT]: {with: new Set([AS, RL, RON, TAG, VOG]), without: new Set([BAKR, BAT, Wagner])},
    [VOG]: {with: new Set([AS, ISKRA, RON, RT, W8]), without: new Set([st31, GROM, ODN, RAF, Wagner])},
    [MSF]: {with: new Set([st31, Apex, AV, AXE, RAF]), without: new Set([GROM, inTeam, ODN, W8, Wagner])},
    [CBR]: {with: new Set([st31, AV, CBR, CU, RAF]), without: new Set([AXE, FNX, IT, W8])},
    [CU]: {with: new Set([st31, AS, AV, AXE, OT]), without: new Set([BAKR, BAT, BCS, IT, RL])},
    [FNX]: {with: new Set([Apex, AV, TAG, W8]), without: new Set([st31, BAT, OT, RL, RON])},
    [AV]: {with: new Set([st31, AXE, CU, OT, RAF]), without: new Set([BAT, CBR, inTeam, SGYR, W8])},
    [W8]: {with: new Set([AV, AXE, FNX, KSK, OT]), without: new Set([inTeam, IT, RAF, RL, SGYR])},
};

const DISBALANCE_THRESHOLD = 1;
const HAPPINESS_THRESHOLD = 0;
const INTERMEDIATE_HAPPINESS_THRESHOLD = -4;
const INTERMEDIATE_DISBALANCE_THRESHOLD = 1.5;
const BEST_ROTATIONS_LIMIT = 25;
const ROTATION_GROUP_LIMIT = 4;

const totalSlots = info.reduce((acc, squad) => {
    acc += squad.slots;
    return acc;
}, 0);

function printInfo() {
    let infoStr = 'INFO:\n';

    for (const sq of info) {
        infoStr += `Squad ${sq.id.description}. Slots: ${sq.slots}\n`;
        infoStr += `  With: [${Array.from(preferences[sq.id].with).map(tag => tag.description).join(', ')}]`;
        infoStr += `\tWithout: [${Array.from(preferences[sq.id].without).map(tag => tag.description).join(', ')}]\n`;
    }
    console.log(infoStr);
}

function printRotation(rotation: Rotation, index: number) {
    let rotStr = `Rotation #${index + 1}\n`;
    for (let i = 0; i < rotation.servers.length; i++) {
        const server = rotation.servers[i];
        rotStr += `SERVER ${i + 1}\n`;

        for (const side of server) {
            rotStr += `${side.slots}: [${side.squads.map(tag => tag.description).join(', ')}]\n`;
        }
    }
    rotStr += `HAPPINESS: ${rotation.happiness}\n`;
    rotStr += `DISBALANCE: ${rotation.disbalance}\n\n`;

    console.log(rotStr);
}

function bruteForce(squads: SquadInfo[], index?: number) : Rotation[] {
    console.log(index);

    if (index === undefined) {
        console.log('calcing for', squads.length, 'squads');
        let rotations = bruteForce(squads, squads.length - 1);
        console.log('total possible rotations', rotations.length);
        const goodRots = new Set<number>();


        let i = 0;
        let disbalanceCounter = 0;

        for (let i = 0; i < rotations.length; i++) {
            const rot = rotations[i];

            if (rot.happiness > HAPPINESS_THRESHOLD) {

                const disbalance = calcDisbalance(rot);
                if (disbalance > DISBALANCE_THRESHOLD) {
                    disbalanceCounter++;
                }
                else {
                    rot.disbalance = disbalance;
                    goodRots.add(i);
                }
            }
        }

        console.log('with disbalance', disbalanceCounter);

        rotations = rotations.filter((rot, i) => goodRots.has(i));

        //rotations.sort((a, b) => a.happiness / a.disbalance > b.happiness / b.disbalance ? -1 : 1)
        return rotations;
    }

    if (index === 0) {
        return [{servers: [
            [{slots: squads[index].slots, squads: [squads[index].id]}, {slots: 0, squads: []}],
            [{slots: 0, squads: []}, {slots: 0, squads: []}]
        ], happiness: 0, disbalance: 0}] as Rotation[];
    }

    const squad = squads[index];
    const rotations = bruteForce(squads, index - 1);
    console.log('index', index, 'total rotations', rotations.length);
    const updatedRotations : Rotation[] = [];

    for (const rot of rotations) {

        for (let i = 0; i < rot.servers.length; i++) {

            for (let j = 0; j < rot.servers[i].length; j++) {
                const updRot : Rotation = {
                    servers: rot.servers.map(server => server.map(side => ({slots: side.slots, squads: [...side.squads]}))),
                    happiness: rot.happiness,
                    disbalance: 0
                };

                const serverSide = updRot.servers[i][j];

                serverSide.slots += squad.slots;
                serverSide.squads.push(squad.id);

                for (const squadId of serverSide.squads) {
                    if (preferences[squadId].with.has(squad.id))
                        updRot.happiness += 1;
                    if (preferences[squad.id].with.has(squadId))
                        updRot.happiness += 1;
                    if (preferences[squadId].without.has(squad.id))
                        updRot.happiness -= 2;
                    if (preferences[squad.id].without.has(squadId))
                        updRot.happiness -= 2;
                }

                const percent = index / squads.length;


                if (percent < 0.6) {
                    updatedRotations.push(updRot);

                    if (i === 1) {
                        if (rot.servers[1][0].slots === 0 && rot.servers[1][1].slots === 0)
                            break;
                    }
                }

                else if (updRot.happiness > INTERMEDIATE_HAPPINESS_THRESHOLD) {

                    if (percent < 0.75) {
                        updatedRotations.push(updRot);
                    }
                    else {
                        const disbalance = calcDisbalance(updRot);

                        if (disbalance < INTERMEDIATE_DISBALANCE_THRESHOLD) {
                            updatedRotations.push(updRot);
                        }
                    }
                }
            }
        }      
    }

    return updatedRotations; 
}

function hasEmptySlots(rot: Rotation) {
    return rot.servers.some(server => server.some(side => side.slots === 0));
}

function calcServerDisbalance(server: SideInfo[]) {
    const serverSlots = server[0].slots + server[1].slots;
    return [Math.abs(server[0].slots - server[1].slots) / serverSlots * 5, serverSlots];
}

function calcDisbalance(rotation: Rotation) {
    const [disbalance1, slots1] = calcServerDisbalance(rotation.servers[0]);
    const [disbalance2, slots2] = calcServerDisbalance(rotation.servers[1]);

    const serverDisbalance = (slots1 > slots2 ? slots1 / slots2 : slots2 / slots1) - 1;

    return +((serverDisbalance + disbalance1 + disbalance2).toFixed(2));
}

function getBestRotations(rotations: Rotation[]) {
    console.log('good rots', rotations.length);
    
    const happiestRotationsDict : {[key: number]: Rotation[]} = {};
    
    rotations.forEach(rot => {
        if (!(rot.happiness in happiestRotationsDict))
            happiestRotationsDict[rot.happiness] = [];
    
        happiestRotationsDict[rot.happiness].push(rot);
    });

    console.log('looking for the best rotations');
    const bestRotations = Object.keys(happiestRotationsDict)
        .sort((a, b) => +a > +b ? -1 : 1)
        .slice(0, 10)
        .reduce((acc, key) => {
            console.log('happiness key', key);
            const happiestSorted = [...happiestRotationsDict[key]].sort((a, b) => a.disbalance > b.disbalance ? 1 : -1);

            const limit = Math.min(happiestSorted.length, ROTATION_GROUP_LIMIT);
        
            for (let i = 0; i < limit; i++) {
                acc.push(happiestSorted[i]);
            } 
            return acc;
        }, [] as Rotation[])
        .slice(0, BEST_ROTATIONS_LIMIT)
        .map((rot, i) => ({rotation: rot, index: i, ratio: rot.happiness / rot.disbalance}));
    
    const counterLimit = Math.min(ROTATION_GROUP_LIMIT, bestRotations.length);

    const returnedIndexes = new Set<number>();

    const happiestRotations = bestRotations.slice(0, ROTATION_GROUP_LIMIT);
    
    console.log(counterLimit, 'happiest rotations:');
    happiestRotations.forEach(rot => {
        printRotation(rot.rotation, rot.index);
        returnedIndexes.add(rot.index);
    });
    
    console.log(counterLimit, 'balances rotations');
    const balancedRotations = [...bestRotations]
        .sort((a, b) => a.rotation.disbalance > b.rotation.disbalance ? 1 : -1)
        .slice(0, ROTATION_GROUP_LIMIT);
    balancedRotations.forEach(rot => {
        printRotation(rot.rotation, rot.index);
        returnedIndexes.add(rot.index);
    });

    const bestRatioRotations = [...bestRotations]
        .sort((a, b) => a.ratio > b.ratio ? -1 : 1)
        .slice(0, ROTATION_GROUP_LIMIT);
    
    console.log('best happiness/balance ratio:');
    bestRatioRotations.forEach(rot => {
        console.log('Ratio:', rot.ratio);
        printRotation(rot.rotation, rot.index);
        returnedIndexes.add(rot.index);
    });

    console.log('returned indexes size', returnedIndexes.size);

    return Array.from(returnedIndexes).map(index => bestRotations[index].rotation);
}

function combineRotations(rotations: Rotation[][], index?: number) : Rotation[] {
    if (index === undefined) {
        const combinedRotations = combineRotations(rotations, rotations.length - 1);

        combinedRotations.forEach(rotation => {
            console.log('MUST BE 0', rotation.happiness);
            for (const server of rotation.servers) {

                for (const side of server) {

                    for (const squad1 of side.squads) {

                        for (const squad2 of side.squads) {

                            if (squad1 === squad2)
                                continue;

                            if (preferences[squad1].with.has(squad2)) 
                                rotation.happiness += 1;
                            if (preferences[squad2].with.has(squad1)) 
                                rotation.happiness += 1;
                            if (preferences[squad1].without.has(squad2))
                                rotation.happiness -= 2;
                            if (preferences[squad2].without.has(squad1))
                                rotation.happiness -= 2;
                        }
                    }
                }
            }

            rotation.disbalance = calcDisbalance(rotation);
        });

        return combinedRotations;
    }
    if (index === 0) {
        return rotations[index].map(rot => ({servers: rot.servers, happiness: 0, disbalance: 0} as Rotation))
    }

    const combinedRotations = combineRotations(rotations, index - 1);
    const rotationsPart = rotations[index];
    const updatedRotations : Rotation[] = [];

    for (const rot1 of rotationsPart) {
        
        for (const rot2 of combinedRotations) {

            for (let thisServerI = 0; thisServerI < rot2.servers.length; thisServerI++) {
                const otherServer = +(!thisServerI);

                for (let thisSideI = 0; thisSideI < rot2.servers[thisServerI].length; thisSideI++) {
                    const otherSide = +(!thisSideI);

                    const updRot : Rotation = {
                        happiness: 0,
                        disbalance: 0,
                        servers: rot1.servers.map(server => server.map(side => ({slots: side.slots, squads: [...side.squads]})))
                    }

                    updRot.servers[0][0].slots += rot2.servers[thisServerI][thisSideI].slots;
                    updRot.servers[0][0].squads.push(...rot2.servers[thisServerI][thisSideI].squads);
                    updRot.servers[0][1].slots += rot2.servers[thisServerI][otherSide].slots;
                    updRot.servers[0][1].squads.push(...rot2.servers[thisServerI][otherSide].squads);

                    updRot.servers[1][0].slots += rot2.servers[otherServer][thisSideI].slots;
                    updRot.servers[1][0].squads.push(...rot2.servers[otherServer][thisSideI].squads);
                    updRot.servers[1][1].slots += rot2.servers[otherServer][otherSide].slots;
                    updRot.servers[1][1].squads.push(...rot2.servers[otherServer][otherSide].squads);

                    updatedRotations.push(updRot);
                
                }
            }

        }
    }

    return updatedRotations;
}

function rotsToJSON(rotations: Rotation[]) {
    for (const rot of rotations) {
        const rotWithTags : any = {...rot};
        rotWithTags.servers = rotWithTags.servers.map(server => server.map(side => ({slots: side.slots, squads: side.squads.map(tag => tag.description!)})));
        console.log(JSON.stringify(rotWithTags));
    }
}

printInfo();
console.log('total slots', totalSlots);

console.log('starting');

let third = Math.floor(info.length / 3);
third = third % 2 === 0 ? third : third - 1;
const part1 = bruteForce(info.slice(0, third));
const bestOfPart1 = getBestRotations(part1);
const part2 = bruteForce(info.slice(third, third + third));
const bestOfPart2 = getBestRotations(part2);
const part3 = bruteForce(info.slice(third + third));
const bestOfPart3 = getBestRotations(part3);

const combinedRotations = combineRotations([bestOfPart1, bestOfPart2, bestOfPart3]);
console.log('COMBINED COMBINED COMBINED COMBINED COMBINED');
const bestCombines = getBestRotations(combinedRotations);
rotsToJSON(bestCombines);