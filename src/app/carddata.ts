export enum Resource{
    Generic,
    Food,
    Wood,
    Gemstones,
}

export enum Supertype{
    None,
    Elite = 1 << 0,
    Hero = 1 << 1
}

export enum Cardtype{
    Unit,
    Spell,
    Reaction
}

export enum UnitType{
    None = 0,
    Ogre = 1 << 0,
    Human = 1 << 1,
    Goblin = 1 << 2
}

export interface AbilityData{
    name: string,
    reminder?: string,
    overrideReminder?: boolean
}

export interface CardData{
    attack: number,
    defense: number,
    damage: number,
    health: number,
    vp: number,
    supertypes: Supertype,
    cardType: Cardtype,
    unitTypes: UnitType,
    cost: Record<Resource, number>,
    abilities: Array<AbilityData>,
    text?: string,
    flavor: string,
    name: string,
    imageURL: string,
    artistCredit: string
}