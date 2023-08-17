import { Injectable } from '@angular/core';
import { CardData, Resource,   } from './carddata';
import { CardDisplayComponent } from './card-display/card-display.component';

@Injectable({
  providedIn: 'root'
})
export class CardEditorService {
  currentCard: CardData = {
    unitStats: {attack: 4, defense: 7, damage: 2, health: 6},
    vp: 4,
    cardTypes: "Hero Unit",
    subTypes:"Ogre Soldier",
    cost: {[Resource.Food]: 1, [Resource.Wood]: 1, [Resource.Gemstones]: 1, [Resource.Generic]: 1},
    abilities: [{name: "Conceal", overrideReminder:false}, {name: "Stalk", reminder: "On entry, cannot take damage until beginning of your next turn."}, {name: "Melee", overrideReminder: true}, {name: "Guard", overrideReminder: true}],
    text: "",
    flavor: "\"Ooka booga!\"",
    name: "Gilrok, the Indomitable",
    imageURL: "https://cards.scryfall.io/art_crop/front/c/5/c557f035-f93b-41ce-b8de-dea79dcf15be.jpg?1562764198",
    artistCredit: "Thomas M. Baxa"
  };
  
  cardDisplayComponent?: CardDisplayComponent;

  getCurrentCard(): CardData{
    return this.currentCard;
  }

  updateCard(){
    if(this.cardDisplayComponent != undefined){
      this.cardDisplayComponent.setCardDimensions();
    }
  }

  constructor() { }
}
