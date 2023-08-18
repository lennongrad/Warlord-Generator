import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardTextService } from '../card-text.service';
import { CardEditorService } from '../card-editor.service';
import { CardData, Resource, UnitStats } from '../carddata';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.less']
})
export class CardEditorComponent {
  // text inputs
  @ViewChild('name', { static: true }) nameElement!: ElementRef;
  @ViewChild('credit', { static: true }) creditElement!: ElementRef;
  @ViewChild('url', { static: true }) urlElement!: ElementRef;
  @ViewChild('text', { static: true }) textElement!: ElementRef;
  @ViewChild('flavor', { static: true }) flavorElement!: ElementRef;
  @ViewChild('types', { static: true }) typesElement!: ElementRef;
  @ViewChild('subtypes', { static: true }) subtypesElement!: ElementRef;
  @ViewChild('vp', { static: true }) vpElement!: ElementRef;
  // cost inputs
  @ViewChild('costFood', { static: true }) costFoodElement!: ElementRef;
  @ViewChild('costWood', { static: true }) costWoodElement!: ElementRef;
  @ViewChild('costGemstones', { static: true }) costGemstonesElement!: ElementRef;
  @ViewChild('costGeneric', { static: true }) costGenericElement!: ElementRef;
  // stats inputs
  @ViewChild('haveStats', { static: true }) haveStatsElement!: ElementRef;
  @ViewChild('statsAttack', { static: true }) statsAttackElement!: ElementRef;
  @ViewChild('statsDefense', { static: true }) statsDefenseElement!: ElementRef;
  @ViewChild('statsDamage', { static: true }) statsDamageElement!: ElementRef;
  @ViewChild('statsHealth', { static: true }) statsHealthElement!: ElementRef;
  // abilities
  @ViewChild('abilitiesList', { static: true }) abilitiesListElement!: ElementRef;

  lastStats?: UnitStats;

  getCard(): CardData{
    return this.editorService.getCurrentCard();
  }

  // text inputs
  nameKey(event: any){
    this.getCard().name = event.target.value;
  }
  creditKey(event: any){
    this.getCard().artistCredit = event.target.value;
  }
  urlKey(event: any){
    this.getCard().imageURL = event.target.value;
  }
  textKey(event: any){
    this.getCard().text = event.target.value;
  }
  flavorKey(event: any){
    this.getCard().flavor = event.target.value;
  }
  typesKey(event:any){
    this.getCard().cardTypes = event.target.value;
  }
  subtypesKey(event:any){
    this.getCard().subTypes = event.target.value;
  }
  vpKey(event:any){
    if(event.target.value != "" && !isNaN(Number(event.target.value))){
      this.getCard().vp = Number(event.target.value);
    } else {
      this.getCard().vp = undefined;
    }
  }

  costKey(costName: string, event: any){
    var numberAmount = Number(event.target.value);
    if(isNaN(numberAmount)){
      numberAmount = 0;
    }

    switch(costName){
      case "food": this.getCard().cost[Resource.Food] = numberAmount; break;
      case "wood": this.getCard().cost[Resource.Wood] = numberAmount; break;
      case "gemstones": this.getCard().cost[Resource.Gemstones] = numberAmount; break;
      case "generic": this.getCard().cost[Resource.Generic] = numberAmount; break;
    }

    this.editorService.updateCard();
    this.loadCard();
  }

  statsKey(statsName: string, event: any){
    var numberAmount = Number(event.target.value);
    if(isNaN(numberAmount)){
      numberAmount = 0;
    }

    switch(statsName){
      case "attack": this.getCard().unitStats!.attack = numberAmount; break;
      case "defense":  this.getCard().unitStats!.defense = numberAmount; break;
      case "damage":  this.getCard().unitStats!.damage = numberAmount; break;
      case "health":  this.getCard().unitStats!.health = numberAmount; break;
    }

    this.editorService.updateCard();
    this.loadCard();
  }

  getAbilitiesLength(): number{
    return this.getCard().abilities.length;
  }

  getHaveStats(): boolean{
    return this.getCard().unitStats != undefined;
  }

  haveStatsClick(event:Event){
    var isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked){
      if(this.getCard().unitStats == undefined){
        if(this.lastStats != undefined){
          this.getCard().unitStats = structuredClone(this.lastStats);
        } else {
          this.getCard().unitStats = {attack: 0, defense: 0, damage: 0, health: 0};
        }
      }
    } else {
      if(this.getCard().unitStats != undefined){
        this.lastStats = this.getCard().unitStats;
      }
      this.getCard().unitStats = undefined;
    }
    this.loadCard();
  }

  abilityNameInput(index:number, event:any){
    this.getCard().abilities[index].name = event.target.value;
  }

  abilityReminderInput(index:number, event:any){
    this.getCard().abilities[index].reminder = event.target.value;
  }

  abilityOverrideInput(index:number, event:any){
    this.getCard().abilities[index].overrideReminder = event.target.checked;
  }

  addAbility(){
    this.getCard().abilities.push({name:""})
  }

  removeAbility(){
    this.getCard().abilities.pop();
  }  
  
  onFileChanged(event: any) {
    const file = event.target.files[0];
    var fr = new FileReader();
    fr.onload = () => { 
      if(typeof(fr.result) == "string"){
        this.getCard().imageURL = fr.result;
        this.loadCard();
      }
    };
    fr.readAsDataURL(file);
  }

  loadCard(){
    this.nameElement.nativeElement.value = this.getCard().name;
    this.creditElement.nativeElement.value = this.getCard().artistCredit;
    this.flavorElement.nativeElement.value = this.getCard().flavor;
    this.textElement.nativeElement.value = this.getCard().text;
    this.typesElement.nativeElement.value = this.getCard().cardTypes;
    this.subtypesElement.nativeElement.value = this.getCard().subTypes;
    this.vpElement.nativeElement.value = this.getCard().vp == undefined ? "" : this.getCard().vp;

    // set url
    this.urlElement.nativeElement.value = this.getCard().imageURL;

    // costs
    this.costFoodElement.nativeElement.value = this.getCard().cost[Resource.Food];
    this.costWoodElement.nativeElement.value = this.getCard().cost[Resource.Wood];
    this.costGemstonesElement.nativeElement.value = this.getCard().cost[Resource.Gemstones];
    this.costGenericElement.nativeElement.value = this.getCard().cost[Resource.Generic];

    //stats
    this.haveStatsElement.nativeElement.checked = this.getCard().unitStats != undefined;
    if(this.getCard().unitStats != undefined){
      this.statsAttackElement.nativeElement.value = this.getCard().unitStats?.attack;
      this.statsDefenseElement.nativeElement.value = this.getCard().unitStats?.defense;
      this.statsDamageElement.nativeElement.value = this.getCard().unitStats?.damage;
      this.statsHealthElement.nativeElement.value = this.getCard().unitStats?.health;
    }

    // abilities
    for(var i = 0; i < this.abilitiesListElement.nativeElement.children.length; i++){
      var childRow = this.abilitiesListElement.nativeElement.children[i];
      var nameInput = childRow.getElementsByClassName("ability-name")[0];
      var reminderInput = childRow.getElementsByClassName("ability-reminder")[0];
      var overrideInput = childRow.getElementsByClassName("ability-override")[0];

      nameInput.value = this.getCard().abilities[i].name;
      reminderInput.value = this.getCard().abilities[i].reminder == undefined ? "" : this.getCard().abilities[i].reminder;
      overrideInput.checked = this.getCard().abilities[i].overrideReminder;
    }
  }

  ngOnInit(){
    setTimeout(() => {this.loadCard()}, 1)
  }

  constructor(private element:ElementRef, private textService: CardTextService, private editorService: CardEditorService){  }
}
