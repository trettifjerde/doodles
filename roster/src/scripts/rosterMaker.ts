import { Squad } from "./squads";
import { BitPreferences, IdToTagMap, Preferences, Roster, Rotation, TagToIdMap } from "./types";
import { calcDisbalance } from "./utils";

type Memo = {[key: string]: Rotation};

export function makeRoster(
    squadsDict: {[key: string]: Squad}, 
    tagPreferences: Preferences, 
    tagToIdMap: TagToIdMap,
    idToTagMap: IdToTagMap) {
    const memo : Memo = {};

    const squads = sortSquads(squadsDict, tagPreferences);
    const preferences : BitPreferences = makeBitPreferences(tagPreferences, tagToIdMap);

    const best = calcRoster(squads, preferences, memo);

    return {
        happiness: best.happiness, 
        disbalance: best.disbalance,
        servers: best.servers.map(server => server.map(side => ({
            slots: side.slots, 
            squads: getSquadsFromMask(side.squads, idToTagMap)
        })))
    } as Roster;
}

function calcRoster(squads: Squad[], preferences: BitPreferences, memo: Memo, server=0, side=0, index?: number) : Rotation {

    if (index === undefined) {

        const rotations : Rotation[] = [];

        for (let i = 0; i < 2; i ++) 
            for (let j = 0; j < 2; j++)
                rotations.push(calcRoster(squads, preferences, memo, i, j, squads.length - 1));
            
        const best = getBestRotation(rotations);

        return best;
    }

    if (index < 0) {
        return {
            happiness: 1,
            disbalance: 1,
            servers: [
                [{slots: 0, squads: BigInt(0)}, {slots: 0, squads: BigInt(0)}],
                [{slots: 0, squads: BigInt(0)}, {slots: 0, squads: BigInt(0)}]
            ]
        } as Rotation;
    }

    const hash = getMemoHash(index, server, side);

    if (memo[hash]) {
        return memo[hash];
    }

    const prevSquadPlacements : Rotation[] = [];
    
    for (let i = 0; i < 2; i++) {
        
        for (let j = 0; j < 2; j++) {
            
            const rot = calcRoster(squads, preferences, memo, i, j, index - 1);
            prevSquadPlacements.push(rot);
        }
    }
    
    const squad = squads[index];
    const rotations : Rotation[] = [];

    for (const rot of prevSquadPlacements) 
        rotations.push(addSquadToSide(rot, squad, server, side, preferences));

    const bestVariant = getBestRotation(rotations);

    memo[hash] = bestVariant;
    console.log('Saving', squad.tag);

    return bestVariant;
}

function addSquadToSide(rotation: Rotation, squad: Squad, serverI: number, sideI: number, preferences: BitPreferences) {
    const updRot : Rotation = {
        happiness: rotation.happiness,
        disbalance: rotation.disbalance,
        servers: rotation.servers.map(server => server.map(side => ({slots: side.slots, squads: side.squads})))
    };

    const side = updRot.servers[serverI][sideI];
    
    let squadFlags = side.squads;
    let otherSquadId = 1;

    while (squadFlags > 0) {

        if (squadFlags & BigInt(0x1)) {

            if (preferences[squad.id].with.has(otherSquadId))
                updRot.happiness += 0.5;
            else if (preferences[squad.id].without.has(otherSquadId))
                updRot.happiness -= 1;

            if (preferences[otherSquadId].with.has(squad.id))
                updRot.happiness += 0.5;
            else if (preferences[otherSquadId].without.has(squad.id))
                updRot.happiness -= 1;
        }

        otherSquadId *= 2;
        squadFlags >>= BigInt(1);
    }

    side.slots += squad.slots;
    side.squads |= BigInt(squad.id);

    updRot.disbalance = calcDisbalance(updRot);

    return updRot;    
}

function getBestRotation(rotations: Rotation[]) {
    return [...rotations].sort((a, b) => {
        const [aRatio, bRatio] = [a, b].map(rot => rot.happiness / rot.disbalance);

        if (aRatio > bRatio)
            return -1;
        else if (aRatio < bRatio)
            return 1;
        else
            return a.happiness > b.happiness ? -1 : 1;
    })[0];
}

function getMemoHash(index: number, server: number, side: number) {
    return `${index}-${server}-${side}`;
}

function getSquadsFromMask(mask: bigint, idToTagMap: IdToTagMap) {
    let slicedMask = mask;
    let squadId = 1;

    const tags : string[] = [];

    while (slicedMask > BigInt(0)) {

        if (slicedMask & BigInt(0x1)) {
            tags.push(idToTagMap[squadId]);
        }

        squadId *= 2;
        slicedMask >>= BigInt(1);

    }

    return tags.sort((a, b) => a > b ? 1 : -1);
}

function sortSquads(squadsDict: {[key: string]: Squad}, tagPreferences: Preferences) {
    return Object.values(squadsDict).sort(((a, b) => {
        if (a.slots > b.slots)
            return -1;
        else if (a.slots < b.slots)
            return 1;
        else {
            const [aPrefs, bPrefs] = [a, b].map(s => tagPreferences[s.tag].with.size + tagPreferences[s.tag].without.size * 2);
            if (aPrefs > bPrefs)
                return -1;
            else
                return 1;
        }
    }));
}

function makeBitPreferences(tagPreferences: Preferences, tagToIdMap: TagToIdMap) {
    const preferences: BitPreferences = {};

    for (const [tag, prefs] of Object.entries(tagPreferences)) {
        const squadId = tagToIdMap[tag];
        preferences[squadId] = {with: new Set(), without: new Set()};

        for (const otherTag of prefs.with) 
            preferences[squadId].with.add(tagToIdMap[otherTag]);

        for (const otherTag of prefs.without)
            preferences[squadId].without.add(tagToIdMap[otherTag]);

    }

    return preferences;
}