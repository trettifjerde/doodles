type SquadInfo = {id: string, slots: number};
type Preferences = {[key: string]: {with: Set<string>, without: Set<string>}};
type SideInfo = {slots: number, squads: string[]};
type Rotation = {index: number, servers: SideInfo[][], happiness: number, disbalance: number};
type HappinessInfo = {tag: string, happy: string[], unhappy: string[], total: number};

const AS = 'AS';
const DKK = 'DKK';
const inTeam = 'inTeam';
const RAF = 'RAF';
const FB = 'FB';
const WD = 'WD';
const TAG = 'TAG';
const ISKRA = 'ISKRA';
const V = 'V';
const BAKR = 'BAKR';
const Apex = 'Apex';
const RON = 'RON';
const ODN = 'ODN';
const RL = 'RL';
const Wagner = 'Wagner';
const BCS = 'BCS';
const OT = 'OT';
const BAT = 'BAT';
const AXE = 'AXE';
const ORK = 'ORK';
const st31 = '31st';
const GROM = 'GROM';
const KSK = 'KSK';
const IT = 'IT';
const SGYR = 'SGYR';
const RT = 'RT';
const VOG = 'vog';
const MSF = 'MSF';
const CBR = 'CBR';
const CU = 'CU';
const FNX = 'FNX';
const AV = 'AV';
const W8 = 'W8';

let info : SquadInfo[] = [
    {id: AS, slots: 7},
    {id: DKK, slots: 10},
    {id: inTeam, slots: 13},
    {id: RAF, slots: 8},
    {id: FB, slots: 12},
    {id: WD, slots: 8},
    {id: TAG, slots: 13},
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
const ROT_STRINGS = `[
{"index":1, "happiness":52,"disbalance":0.59,"servers":[[{"slots":93,"squads":["31st","MSF","CU","AV","Apex","RON","AXE","AS","DKK","V"]},{"slots":88,"squads":["IT","FNX","W8","Wagner","OT","BAT","TAG","ISKRA"]}],[{"slots":71,"squads":["GROM","KSK","CBR","ODN","BCS","inTeam","RAF"]},{"slots":78,"squads":["SGYR","RT","vog","RL","ORK","FB","WD","BAKR"]}]]},
{"index":2,"happiness":48,"disbalance":0.28,"servers":[[{"slots":89,"squads":["31st","GROM","IT","Apex","RON","BCS","FB","WD","BAKR"]},{"slots":84,"squads":["SGYR","RT","MSF","CBR","ODN","RL","inTeam","RAF"]}],[{"slots":78,"squads":["KSK","CU","AV","Wagner","OT","ORK","TAG","ISKRA"]},{"slots":79,"squads":["vog","FNX","W8","BAT","AXE","AS","DKK","V"]}]]},
{"index":3,"happiness":48,"disbalance":0.37,"servers":[[{"slots":91,"squads":["31st","MSF","CU","AV","Apex","RON","AXE","AS","RAF","V"]},{"slots":88,"squads":["IT","FNX","W8","Wagner","OT","BAT","TAG","ISKRA"]}],[{"slots":74,"squads":["GROM","KSK","CBR","ODN","BCS","DKK","WD","BAKR"]},{"slots":77,"squads":["SGYR","RT","vog","RL","ORK","inTeam","FB"]}]]},
{"index":4,"happiness":42,"disbalance":0.43,"servers":[[{"slots":73,"squads":["31st","GROM","CBR","ODN","BCS","inTeam","RAF"]},{"slots":78,"squads":["SGYR","RT","vog","RL","ORK","FB","WD","BAKR"]}],[{"slots":91,"squads":["KSK","MSF","CU","AV","Apex","RON","AXE","AS","DKK","V"]},{"slots":88,"squads":["IT","FNX","W8","Wagner","OT","BAT","TAG","ISKRA"]}]]},
{"index":15,"happiness":36,"disbalance":0.12,"servers":[[{"slots":80,"squads":["31st","GROM","IT","ODN","BCS","AS","DKK","V"]},{"slots":80,"squads":["SGYR","RT","MSF","CBR","RL","ORK","inTeam","RAF"]}],[{"slots":84,"squads":["KSK","CU","AV","Apex","RON","AXE","FB","WD","BAKR"]},{"slots":86,"squads":["vog","FNX","W8","Wagner","OT","BAT","TAG","ISKRA"]}]]},
{"index":11,"happiness":38,"disbalance":0.22,"servers":[[{"slots":76,"squads":["31st","GROM","CBR","ODN","BCS","DKK","WD","BAKR"]},{"slots":77,"squads":["SGYR","RT","vog","RL","ORK","inTeam","FB"]}],[{"slots":89,"squads":["KSK","MSF","CU","AV","Apex","RON","AXE","AS","RAF","V"]},{"slots":88,"squads":["IT","FNX","W8","Wagner","OT","BAT","TAG","ISKRA"]}]]},
{"index":12,"happiness":38,"disbalance":0.23,"servers":[[{"slots":85,"squads":["31st","KSK","CBR","Apex","RON","BCS","DKK","WD","BAKR"]},{"slots":84,"squads":["GROM","IT","RT","ODN","RL","inTeam","FB"]}],[{"slots":83,"squads":["SGYR","MSF","CU","AV","Wagner","OT","ORK","AS","RAF","V"]},{"slots":78,"squads":["vog","FNX","W8","BAT","AXE","TAG","ISKRA"]}]]},
{"index":19,"happiness":34,"disbalance":0.23,"servers":[[{"slots":85,"squads":["31st","KSK","CBR","Apex","RON","BCS","DKK","WD","BAKR"]},{"slots":84,"squads":["GROM","IT","FNX","ODN","RL","inTeam","FB"]}],[{"slots":83,"squads":["SGYR","MSF","CU","AV","Wagner","OT","ORK","AS","RAF","V"]},{"slots":78,"squads":["RT","vog","W8","BAT","AXE","TAG","ISKRA"]}]]}]`;


/*const rotations : Rotation[] = [
    {happiness: 0, index: 1, disbalance: 0, servers: [
        [
            {slots: 0, squads: [st31, FNX, OT, ISKRA, IT, RAF, AXE, MSF]},
            {slots: 0, squads: [FB, BAT, VOG, CU, Wagner, AV, ODN, CBR]}
        ],
        [
            {slots: 0, squads: [WD, RON, GROM, DKK, KSK, SGYR, W8, BCS, V]},
            {slots: 0, squads: [AS, Apex, inTeam, RT, TAG, RL, ORK, BAKR]}
        ]
    ]}
]*/

const rotations = JSON.parse(ROT_STRINGS);

console.log(rotations);

function getSquadHappiness(rotation: Rotation) {
    const happinessInfo : HappinessInfo[] = [];

    for (const server of rotation.servers) {
        for (const side of server) {
            for (const squad of side.squads) {
                const squadHappiness : HappinessInfo = {tag: squad, happy: [], unhappy: [], total: 0};

                for (const otherSquad of side.squads) {
                    if (squad === otherSquad)
                        continue;

                    if (preferences[squad].with.has(otherSquad)) {
                        squadHappiness.happy.push(otherSquad);
                        squadHappiness.total += 1;
                    }
                    if (preferences[squad].without.has(otherSquad)) {
                        squadHappiness.unhappy.push(otherSquad);
                        squadHappiness.total -= 2;
                    }
                }
                happinessInfo.push(squadHappiness);
            }
        }
    }
    return happinessInfo;
}

function printHappiness(info: HappinessInfo[]) {
    let output = '';
    for (const entry of info) {
        output += `[${entry.tag}]: ${entry.total}. `;
        output += entry.happy.length > 0 ? `Рады играть с [${entry.happy.join(', ')}]. ` : '';
        output += entry.unhappy.length > 0 ? `Ворчат из-за [${entry.unhappy.join(', ')}]. ` : '';
        output += '\n';
    }
    console.log(output);
}

function fillRotationInfo(rotation: Rotation) {
    for (const server of rotation.servers) {

        for (const side of server) {

            for (const squad of side.squads) {

                side.slots += info.find(entry => entry.id === squad)?.slots!;

                for (const otherSquad of side.squads) {
                    if (squad === otherSquad)
                        continue;

                    if (preferences[squad].with.has(otherSquad)) 
                        rotation.happiness += 1;

                    if (preferences[squad].without.has(otherSquad)) 
                        rotation.happiness -= 2;
                }
            }
        }
    }
    rotation.disbalance = calcDisbalance(rotation);
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

for (const rotation of rotations) {
    //fillRotationInfo(rotation);
    const h = getSquadHappiness(rotation);
    console.log(`Ротация #${rotation.index}`);
    console.log(`Счастье: ${rotation.happiness}`);
    console.log(`Дисбаланс: ${rotation.disbalance}`);
    printHappiness(h);
}