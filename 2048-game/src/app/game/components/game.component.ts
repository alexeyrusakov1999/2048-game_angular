import { GameService } from "./../services/game.service";
import { Component, HostListener, OnInit } from "@angular/core";
import { IItem } from "../models/item";
import { IGameService } from "../models/game-service";

const colorMap: { [k: number]: string } = {
  2: "#626567",
  4: "#424949",
  8: "#7E5109",
  16: "#196F3D",
  32: "#138D75",
  64: "#154360",
  128: "#9859B6",
  256: "#78281F",
  512: "#C0392B",
  1024: "#7D6608",
  2048: "#45B39D",
};

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  keyEventCodeMap: { [type: string]: string } = {
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowDown: "down",
  };

  isModalOpen: boolean = true;
  isFinishGame: boolean = false;

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.updateFinish();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  get finish(): boolean {
    return this.gameService.scores >= 20212;
  }

  private updateFinish() {
    this.isFinishGame = this.finish;
  }

  getClass() {
    return this.isModalOpen && this.isFinishGame ? "opacity" : "";
  }

  getStyles(item: IItem): { [p: string]: string } {
    const top = item.row * 110 - 100 + "px";
    const left = item.col * 110 - 100 + "px";
    return {
      top,
      left,
      "background-color": colorMap[item.value] || "black",
    };
  }

  @HostListener("window:keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {
    const methodName = this.keyEventCodeMap[event.code];
    if (methodName) {
      (this.gameService as any)[methodName]();
      console.log(methodName);
      this.updateFinish();
    }
  }

  startNewGame() {
    this.gameService.resetGame();
    this.isFinishGame = false;
    this.isModalOpen = true;
  }
}
