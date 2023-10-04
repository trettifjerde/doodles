type SquadInfo = {id: symbol, slots: number};
type SideInfo = {slots: number, squads: symbol[]};
type Preferences = {[key: symbol]: {with: Set<symbol>, without: Set<symbol>}};
type Rotation = {servers: SideInfo[][], happiness: number, disbalance: number};

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

function printInfo() {
    let infoStr = 'INFO:\n';

    for (const sq of info) {
        infoStr += `Squad ${sq.id.description}. Slots: ${sq.slots}\n`;
        infoStr += `  With: [${Array.from(preferences[sq.id].with).map(tag => tag.description).join(', ')}]`;
        infoStr += `\tWithout: [${Array.from(preferences[sq.id].without).map(tag => tag.description).join(', ')}]\n`;
    }
    console.log(infoStr);
}

function printRotation(rotation: Rotation) {
    let rotStr = `Happiness: ${rotation.happiness}\n`;
    for (const server of rotation.servers) {
        rotStr += 'SERVER:\n';

        for (const side of server) {
            rotStr += `${side.slots}: [${side.squads.map(tag => tag.description).join(', ')}]\n`;
        }
    }

    console.log(rotStr);
}

printInfo();

function addSquad(rotation: Rotation, squad: SquadInfo) {

    const variants : {rotation: Rotation, server: number, side: number}[] = [];

    for (let serverI = 0; serverI < rotation.servers.length; serverI++) {

        for (let sideI = 0; sideI < rotation.servers[serverI].length; sideI++) {

            const updRot : Rotation = {
                happiness: rotation.happiness,
                disbalance: rotation.disbalance,
                servers: rotation.servers.map(server => server.map(side => ({slots: side.slots, squads: [...side.squads]})))
            };
            const toSide = updRot.servers[serverI][sideI];
            
            for (const squadId of toSide.squads) {
                if (preferences[squad.id].with.has(squadId))
                    updRot.happiness += 1;
                if (preferences[squadId].with.has(squad.id))
                    updRot.happiness += 1;
                if (preferences[squad.id].without.has(squadId))
                    updRot.happiness -= 2;
                if (preferences[squadId].without.has(squad.id))
                    updRot.happiness -= 2;
            }

            toSide.slots += squad.slots;
            toSide.squads.push(squad.id);
            updRot.disbalance = calcDisbalance(updRot);

            variants.push({rotation: updRot, server: serverI, side: sideI});
        }
    }

    for (const variant of variants) {
        console.log('happiness', variant.rotation.happiness, 'disbalance', variant.rotation.disbalance, 'ratio', variant.rotation.happiness / variant.rotation.disbalance);
    }

    variants.sort((a, b) => {
        const [aRatio, bRatio] = [a, b].map(info => info.rotation).map(r => r.happiness / r.disbalance);
        if (aRatio > bRatio)
            return -1;
        else if (aRatio < bRatio)
            return 1;
        else {
            if (a.rotation.happiness > b.rotation.happiness)
                return -1;
            else return 1;
        }
    });

    const best = variants[0];

    console.log(`Squad ${squad.id.description} to server ${best.server + 1} side ${best.side + 1}`)

    return best.rotation;
}

function calcServerDisbalance(server: SideInfo[]) {
    const serverSlots = server[0].slots + server[1].slots;
    return [Math.abs(server[0].slots - server[1].slots) / (serverSlots * 5), serverSlots];
}

function calcDisbalance(rotation: Rotation) {
    const [disbalance1, slots1] = calcServerDisbalance(rotation.servers[0]);
    const [disbalance2, slots2] = calcServerDisbalance(rotation.servers[1]);

    const serverDisbalance = (slots1 > slots2 ? slots1 / slots2 : slots2 / slots1) - 1;

    return +((serverDisbalance + disbalance1 + disbalance2).toFixed(2));
}

function makeRotation() {
    const sortedSquads = [...info].sort((a, b) => {
        if (a.slots > b.slots)
            return -1;
        else if (a.slots < b.slots) {
            return 1;
        }
        else {
            const [aPrefs, bPrefs] = [a, b].map(s => preferences[s.id].with.size + preferences[s.id].without.size * 2);

            if (aPrefs > bPrefs)
                return -1;
            else
                return 1;
        }
    });
    const firstFour = sortedSquads.splice(0, 4);

    let rotation : Rotation = {servers: [
        [
            {slots: firstFour[0].slots, squads: [firstFour[0].id]},
            {slots: firstFour[1].slots, squads: [firstFour[1].id]}
        ],
        [
            {slots: firstFour[2].slots, squads: [firstFour[2].id]},
            {slots: firstFour[3].slots, squads: [firstFour[3].id]}
        ]
    ], happiness: 0.5, disbalance: 0};

    rotation.disbalance = calcDisbalance(rotation);

    for (const squad of sortedSquads) {

        rotation = addSquad(rotation, squad);
        
    }
    return rotation;
}

const rotation = makeRotation();
printRotation(rotation);