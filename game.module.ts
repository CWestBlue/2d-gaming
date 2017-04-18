import { NgModule } from '@angular/core';
import { ObjectComponent } from './game.objects.component';
import { GameAreaCom } from "./game-area.view.component";
import { GameAreaObject } from './game-area.object';

@NgModule({
    id: module.id,
    imports: [ ],
    exports: [ GameAreaCom, ObjectComponent],
    declarations: [GameAreaCom, ObjectComponent],
    providers: [],
})
export class TwoDGamingModule { 

}
