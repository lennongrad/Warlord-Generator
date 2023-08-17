import { Injectable } from '@angular/core';
import { CardData } from './carddata';

@Injectable({
  providedIn: 'root'
})
export class CardTextService {
  reminderText: {[keyword: string]: string} = {
    "Absorb Strength": "This unit gains atk equal to the number of other units you control", 
    "Aimed Shot": "If this unit is in the same column as a friendly guard it gains 1 atk.", 
    "Armor of Absorption": "this unit's defense is qual to the highest def on the field", 
    "Armor of Thorns": "all guards you control gain 1 extra damage", 
    "Blitz": "This unit may attack the turn it is played or moved.", 
    "Bound to Serve": "This unit is automatically killed if you control no other units without Bound to Serve.", 
    "Build": "On entry, place one building from your deck to your hand then shuffle a card from your deck back to your hand", 
    "Clear Strike": "If this unit declares an attack to a unit in the Melee row it gains 1 damage.", 
    "Conceal": "When you play this unit, you can place it face down rather than face up and if it attack or is attacked you must flip it face up. It the  behaves like a normal unit.", 
    "Craft": "On entry, equip an equipment from your deck to this unit. That equipment loses its VP and you must spend an amount of G equal to its total cost", 
    "Devour": "Whenever a unit in an adjacent column is killed, gain one health.", 
    "Double": "You can activate orders of units in this row Twice per turn and triggered abilities trigger twice. You do not have to spend resources for the copy.", 
    "Entrancing Song": "All opposing units in this column lose one DMG.", 
    "Ethereal": "This Unit cannot be damaged by a unit in its same column on the Melee row or a unit with Blitz.", 
    "Flawless Victory": "All units you control gain victory points until they have two", 
    "Flying": "Cannot be attacked by any unit with the Melee ability.", 
    "Guard": "Your other units in the same column as this unit cannot take damage", 
    "Harvest": "If this unit is on a column that could produce F, it adds FF", 
    "Horsemanship": "Gains one health in plains. Loses one damage in forest. Has blitz if played opposing a ranged unit.", 
    "Leadership": "All units of the same type gain 1 ATK, DEF, and VP", 
    "Melee": "This unit may only perform an attack in the melee row", 
    "Mining": "If this unit is on a mountain space, that mountain space adds GG instead of G.", 
    "Obstructed Sight": "Cannot be attacked by any unit with the Ranged ability.", 
    "Pack Attack": "This unit’s ATK is equal to highest ATK you control", 
    "Parry": "This unit takes one less damage from units on the melee row.", 
    "Protect Me": "A friendly unit in the same column as this unit gains guard.", 
    "Quickcast": "This unit may activate its order abilities the turn it enters.", 
    "Ranged": "This unit may only perform an attack in the ranged row", 
    "Reach": "Allows this unit to deal damage to units on the ranged row even if a unit has guard.", 
    "Resistance": "Unaffected by the effects of spells and magic attacks", 
    "Slayer": "If this unit hits an opposing unit, that unit is immediately killed unless it is a Warlord or Hero. In that case, the unit loses half of their health rounded down.", 
    "Slumber": "When this unit performs an attack action it gains stalk. If this unit performed an attack during your last turn, it cannot attack this turn. If this unit does not attack during your turn it loses stalk.", 
    "Smash": "This unit attacks all enemy units in this column.", 
    "Spear": "Negates the effect all blitz in the same column as this card", 
    "Spectral Existence": "This unit is immediately killed if X is not on the battlefield.", 
    "Steal": "You may harvest resources from the opposing resource in the column that this unit is on as if it were your own and your opponent may not regardless of whether they have a unit there or not.", 
    "Three Headed": "This unit can attack all units on the melee row but its damage is split between the three units.", 
    "Terrify": "Negate all abilities of other units in this unit's column.", 
    "Wander Alone": "This unit gains one damage if this is the only unit on your side of the field", 
    "Bloodlust": "If this unit is damaged, this unit gains one damage until it deals a different unit damage. This ability cannot apply to aunit that already has a damage increase from Bloodlust", 
    "Blood Suck": "If this unit deals damage to an enemy unit, increases this unit's health by one", 
    "Blood Tribute": "At the start of the War Phase, You may damage a unit in an adjacent column to give this and that unit 2 extra defense. This cannot increase that defense higher than 9.", 
    "Call": "On entry, move a unit with type X to this unit's column", 
    "Chain Lightning": "If this unit's attack hits a unit, deal one damage to a different enemy unit in the same column.", 
    "Concealment": "At the start of your turn, the next unit you play can be played as though it had conceal until the end of the turn", 
    "Consume": "If this unit kills another non hero unit, it gains health equal to that unit's starting health", 
    "Create": "On entry, Spawn and play a X token on your side of the battlefield.", 
    "Crush the Earth": "At the end of the round, if there is no opposing unit in this unit's column, that resource cannot be used for the next round. This ability cannot be used more than once in the same round.", 
    "Defend the Tower": "on entry, if you control Mage Tower, spawn and play Magical Guardian", 
    "Die for the Cause": "at the end of the round, kill this unit and draw a card", 
    "Drop": "On Entry, Each Player Discards a card", 
    "Explosion": "When this unit is killed, kill one other unit in its column.", 
    "Heal": "Increase the health of a unit in an adjacent column by 2, after the unit is damaged.", 
    "Imbue With Magic": "At the start of any turn, you can reveal one spell in your hand and this unit gains 2 in the category X until the end of the turn", 
    "Imprison": "On entry, move a unit out of the game until this unit leaves the battlefield", 
    "Inspired": "On victory point calculation phase. Gain 4 VP if on an area that is X.", 
    "Land of the Dragons": "On entry, the space this unit is on is now capable of producing the resource D until the end of the round. The resource D is used to play dragons.", 
    "Last Stand": "If this unit would be killed, Instead Reduce starting health by one.", 
    "Love For the Kill": "When this unit kills a unit, it gains one DMG and VP.", 
    "Magical Defense": "When this unit is attacked, reveal a spell in your hand to have this unit gain 2 def", 
    "Morph": "On entry, this unit may copy the stats, abilities, and type of any non hero unit It still keeps its original type. For example, a Face Stealer that copied a Knight would be a Human Dark One.", 
    "Necromancy": "On entry, play one unit from your graveyard that was not put there from the battlefield.", 
    "Piercing": "If this unit attacks, reduce the targets armor by two before damage.", 
    "Raise From Death": "If this unit is put into a graveyard but not killed, you may play it from your graveyard.", 
    "Revenge": "If a unit you controlled that shares a type with this unit died last turn, this unit gains 1 damage.", 
    "Rubble": "On successful hit, if this unit hit a building, kill that building", 
    "Shadow Step": "Triggers at the start of your opponent's war step before any attacks can be made. You may move this unit to any space on the board that your opponent does not have a unit in the same column.", 
    "Shift": "At the beginning of your turn, this unit shift may one space to the left. If it cannot, it may move to the right.", 
    "Spellbook": " On entry, Add one spell from your deck to your hand then place one card from your hand back into your deck and shuffle.", 
    "Spread Flames": "On entry, X target columns you control can produce P instead of the resource it could produce before until the end of the round. One of these columns must be the column this unit is in.", 
    "Stalk": "Entry trigger. This unit cannot take damage until the beginning of your next turn", 
    "Strategize": "At start of your turn, move a unit you control to another area on the board which has the same resource as the one it was on before. That unit is treated as if it was played this turn so it cannot attack unless it has blitz. This unit must remain in the same row. The letter in parenthesis determines which resources the units your start on can target.", 
    "Strength from the Grave": "On death, units of type X gain 1 dmg until the end of the round", 
    "Stun": "If this unit successfully deals damage, reduce the damaged unit's damage by one next turn. This effect cannot reduce damage to 0.", 
    "Teleport": "Allows the unit at the start of your turn to instantly move to another legal area on the board. This unit must start on and move to the described type. If this unit does move, it gains blitz.", 
    "The Forest Fights Back": "On entry, place rTeants on any of your W where you have opposing units", 
    "Tinker": "On entry, This unit gains Double Attack or Blitz.", 
    "Undying Servitude": "At the beginning of your turn, if this unit was killed on your opponent's last turn, you may summon this unit from your graveyard, but it loses this ability.", 
    "Victory Cry": "During victory point calculation, if yours are higher, draw a card if you control another unit.", 
    "Wounded": "When this unit is damaged, lower its maximum health by one.", 
    "Bramble Volley": "Use only if this unit has a guard in its column, this unit performs a magic attack on any unit in it's or adjacent columns but on a successful hit, it deals damage equal to the unit that has guard in its same column.", 
    "Call of the Wild": "Place a Bear, Boar, or Wolf unit in the same or adjacent column as this unit without paying its resource cost and it is killed at the end of the round before victory points are tallied.", 
    "Cleave": "This unit makes an attack on each unit on the melee row in its and adjacent columns once each.", 
    "Divine Shield": "The first time this unit would take damage next turn it does not take damage.", 
    "Duel": "Target an enemy in the same column as this unit. This unit attacks that unit then if that unit survived it can attack this unit. Repeat this process until one unit is killed.", 
    "Fireball": "Special attack that can hit units in adjacent columns with one reduced damage.", 
    "Forge": "Spend one Gem to give a unit one extra damage until the end of the turn.", 
    "Forged Blades": "Spend one gem to give a unit 3 more attack until the end of turn.", 
    "Frenzy": "Target a unit you control. That unit may attack twice this turn.", 
    "Mind Control": "Target unit controlled by your opponent performs an attack against a unit in its column.", 
    "Mirage": "Create a unit with blitz in any adjacent space to this unit. This crated unit must be a unit you control. That unit dies at the end of the turn and does not trigger death effects.", 
    "Reanimate": "Summon one non hero unit from your graveyard to an empty space in an adjacent column. It has blitz and is killed at the end of your turn. This does not trigger any death effects.", 
    "Shadow Bolt": "Magic attack that can target any unit on the battlefield.", 
    "Summon Treant": "Spawn and Play a treant token on the melee row of this or any adjacent column", 
    "Summon Undead": "Summon one Undead non hero unit other than Lich from your graveyard to an empty space in this or an adjacent column. It has blitz and is killed at the end of your turn. This does not trigger any death effects."
  };

  getReminderText(abilityName: string): string{
    if(abilityName in this.reminderText){
      return this.reminderText[abilityName];
    }
    return "";
  }

  getMainTypeline(data: CardData): string{
    var baseline = "Hero Unit";


    return baseline;
  }

  getSubTypeline(data: CardData): string{
    var baseline = "Ogre Soldier";


    return baseline;
  }

  constructor() { }
}
