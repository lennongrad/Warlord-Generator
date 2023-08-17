export enum Resource{
    Generic,
    Food,
    Wood,
    Gemstones,
}

export interface UnitStats{
    attack: number,
    defense: number,
    damage: number,
    health: number,
}

export interface AbilityData{
    name: string,
    reminder?: string,
    overrideReminder?: boolean
}

export interface CardData{
    abilities: Array<AbilityData>,
    text: string,
    flavor: string,
    name: string,
    imageURL: string,
    artistCredit: string
    cardTypes: string,
    subTypes: string,
    cost: Record<Resource, number>,
    vp?: number,
    unitStats?: UnitStats,
}