export type Preferences = {[key: string]: {with: Set<string>, without: Set<string>}};
export type TagToIdMap = {[key: string]: number};
export type IdToTagMap = {[key: number]: string};
export type SideInfo = {slots: number, squads: bigint};
export type BitPreferences = {[key: number]: {with: Set<number>, without: Set<number>}}
export type Rotation = {servers: SideInfo[][], happiness: number, disbalance: number};
export type Roster = {servers: {slots: number, squads: string[]}[][], happiness: number, disbalance: number};
export type HappinessInfo = {tag: string, happy: string[], unhappy: string[], total: number};