import { Component, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { CardData, Resource } from '../carddata';
import { CardTextService } from '../card-text.service';
import { CardEditorService } from '../card-editor.service';

import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.less']
})
export class CardDisplayComponent {
  @ViewChild('bigCard', { static: true }) bigCard!: ElementRef;

  // card sizes
  public cardWidth: number = 0;
  public cardHeight: number = 0;
  public innerCardWidth: number = 0;
  public innerCardHeight: number = 0;
  // font sizes
  public fontSizeTiny: number = 0;
  public fontSizeSmall: number = 0;
  public fontSizeMedium: number = 0;
  public fontSizeLarge: number = 0;
  // textbox font sizes
  public fontSizeReminder: number = 0;
  // resource icons
  public statIconSize: number = 0;
  public resourceIconSize: number = 0;

  getCurrentCard(): CardData{
    return this.editorService.getCurrentCard();
  }

  clickCard(){
    domtoimage.toBlob(this.bigCard.nativeElement).then(function (blob) {
      var url = window.URL.createObjectURL(blob);
      window.open(url);
      //alert(blob);//(window as Window).saveAs(blob, 'my-node.png');
    });
  }

  setCardDimensions(){
    var containerWidth = this.element.nativeElement.offsetWidth;
    var containerHeight = this.element.nativeElement.offsetHeight;

    if(containerHeight < containerWidth * 7/5){
      this.cardHeight = containerHeight - 40;
      this.cardWidth = (this.cardHeight) * 5/7;
    } else {
      this.cardWidth = containerWidth - 40;
      this.cardHeight = this.cardWidth * 7/5;
    }

    var borderDistance = this.cardWidth * .065;
    this.innerCardHeight = this.cardHeight - borderDistance;
    this.innerCardWidth = this.cardWidth - borderDistance * 1.2;

    // set font sizes
    this.fontSizeTiny = this.cardWidth * .03;
    this.fontSizeSmall = this.cardWidth * .045;
    this.fontSizeMedium = this.cardWidth * .055;
    this.fontSizeLarge = this.cardWidth * .065;

    // reminder size change based on amount of text
    this.fontSizeReminder = this.cardWidth * .0375;
    if(this.getTotalText() > 200){
      this.fontSizeReminder *= .8;
    }

    // set icon size
    this.statIconSize = this.cardWidth * .075;
    this.resourceIconSize = this.cardWidth * .075;
    if(this.getResourcesTotal() > 6){
      this.resourceIconSize *= Math.pow(.9, this.getResourcesTotal() - 5);
    }
  }

  //////////////
  // getter functions for card properties
  //////////////
  getName(): string{
    return this.getCurrentCard().name;
  }

  getTypeline(isMain: boolean): string{
    if(isMain){
      return this.textService.getMainTypeline(this.getCurrentCard());
    } else {
      return this.textService.getSubTypeline(this.getCurrentCard());
    }
  }

  getTotalText(): number{
    var amount = 0;
    var abilities = this.getWithReminders();
    for(let index in abilities){
      amount += abilities[index].length;
    }
    return amount;
  }

  getWithReminders(): {[name: string]: string}{
    var remindedAbilities: {[name: string]: string} = {};//{"Guard": "Death!", "Melee": "Womp!"};
    var abilities = this.getCurrentCard().abilities;
    for(let index in abilities){
      var ability = abilities[index];
      var reminderText = this.textService.getReminderText(ability.name);
      if(ability.reminder != null && ability.reminder != ""){
        reminderText = ability.reminder;
      }

      if(reminderText != "" && !ability.overrideReminder){
        remindedAbilities[abilities[index].name] = reminderText;
      }
    }
    return remindedAbilities;
  }

  getReminderless(): string{
    var baseline = "";
    var abilities = this.getCurrentCard().abilities;
    for(let index in abilities){
      var ability = abilities[index];
      var reminderText = this.textService.getReminderText(ability.name);

      if(((ability.reminder == null || ability.reminder == "") && reminderText == "") || (ability.overrideReminder)){
        baseline += ability.name + ", ";
      }
    }
    return baseline.slice(0, baseline.length - 2);
  }

  getText(): string{
    return this.getCurrentCard().text != null ? this.getCurrentCard().text! : "";
  }

  getFlavorText(): string{
    return this.getCurrentCard().flavor;
  }

  getResourceCount(resourceID: number): number{
    switch(resourceID){
      case 0: return this.getCurrentCard().cost[Resource.Food];
      case 1: return this.getCurrentCard().cost[Resource.Wood];
      case 2: return this.getCurrentCard().cost[Resource.Gemstones];
    }
    return this.getCurrentCard().cost[Resource.Generic];
  }

  getResourcesTotal(): number{
    var total = 0;
    for(let e of [Resource.Food, Resource.Wood, Resource.Gemstones]){
      total += this.getCurrentCard().cost[e];
    }
    if(this.getCurrentCard().cost[Resource.Generic] >= 1){
      total += 1;
    }
    return total;
  }

  getResourcesHeight(): string{
    var total = this.getResourcesTotal();
    return "calc(5% + " + total * (this.resourceIconSize * 1.2) + "px)";
  }

  getVP(): number | null{
    if(this.getCurrentCard().vp == undefined){
      return null;
    }
    return this.getCurrentCard().vp!;
  }

  getStat(statName: string): number | null{
    if(this.getCurrentCard().unitStats == undefined){
      return null;
    }

    switch(statName){
      case "attack": return this.getCurrentCard().unitStats?.attack!;
      case "defense": return this.getCurrentCard().unitStats?.defense!;
      case "damage": return this.getCurrentCard().unitStats?.damage!;
    }
    return this.getCurrentCard().unitStats?.health!;
  }

  getImageURL(): string{
    return this.getCurrentCard().imageURL;
  }

  getArtistCredit(): string{
    return this.getCurrentCard().artistCredit;
  }

  ngOnInit(){
    this.setCardDimensions();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.setCardDimensions();
  }

  constructor(private element:ElementRef, private textService: CardTextService, private editorService: CardEditorService){
    editorService.cardDisplayComponent = this;
  }
}
