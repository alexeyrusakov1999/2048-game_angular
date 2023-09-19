import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameComponent } from "./components/game.component";
import { GameService } from "./services/game.service";

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule],
  exports: [GameComponent],
  providers: [GameService],
})
export class GameModule {}
