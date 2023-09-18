import { Component, OnInit } from "@angular/core";
import { IItem } from "../models/item";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  items: IItem[] = [
    { value: 2, col: 1, row: 1 },
    { value: 4, col: 1, row: 2 },
    { value: 8, col: 1, row: 3 },
    { value: 16, col: 1, row: 4 },
    { value: 32, col: 2, row: 1 },
    { value: 64, col: 2, row: 2 },
    { value: 128, col: 2, row: 3 },
    { value: 256, col: 2, row: 4 },
    { value: 512, col: 3, row: 1 },
    { value: 1024, col: 3, row: 2 },
    { value: 2048, col: 3, row: 3 },
  ];

  constructor() {}

  ngOnInit(): void {}

  getStyles(item: IItem): { [p: string]: string } {
    return { top: "120px", left: "10px", "background-color": "blue" };
  }
}
