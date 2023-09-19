import { Injectable } from "@angular/core";
import { IItem } from "../models/item";

@Injectable({
  providedIn: "root",
})
export class GameService {
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

  left(): void {}

  up(): void {}

  right(): void {
    this.items = [];
  }

  down(): void {}
}
