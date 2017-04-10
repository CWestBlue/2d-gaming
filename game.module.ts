import { NgModule } from '@angular/core';

import { GameAreaComponent } from './game-area.component';
import { ObjectComponent } from './game.objects.component';

@NgModule({
    id: module.id,
    imports: [],
    exports: [GameAreaComponent, ObjectComponent],
    declarations: [GameAreaComponent, ObjectComponent],
    providers: [],
})
export class TwoDGamingModule { 

}
