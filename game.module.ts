import { NgModule } from '@angular/core';
import { ObjectComponent } from './game.objects.component';
import { TwoDGaming } from "./game-area.view.component";
import { GameAreaObject } from './game-area.object';
import { Animation } from './animator.component';
export { TwoDGaming } from "./game-area.view.component";
export { GameAreaObject } from './game-area.object';
export { Animation } from './animator.component';

@NgModule({
    id: module.id,
    imports: [ ],
    exports: [ TwoDGaming , ObjectComponent, GameAreaObject, Animation ],
    declarations: [ TwoDGaming ],
    providers: []
})
export class TwoDGamingModule { }
