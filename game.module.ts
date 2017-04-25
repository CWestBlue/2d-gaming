import { NgModule } from '@angular/core';
import { ObjectComponent } from './game.objects.component';
import { TwoDGaming } from "./game-area.view.component";
import { GameAreaObject } from './game-area.object';
export { TwoDGaming } from "./game-area.view.component";
export { GameAreaObject } from './game-area.object';

@NgModule({
    id: module.id,
    imports: [ ],
    exports: [ TwoDGaming , ObjectComponent, GameAreaObject ],
    declarations: [ TwoDGaming ],
    providers: []
})
export class TwoDGamingModule { }
