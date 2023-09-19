import { Injectable } from "@angular/core";
import { IItem } from "../models/item";

@Injectable({
  providedIn: "root",
})
export class GameService {
  private size = 4;
  private availableCells: number[] = [];

  private get emptyCells(): number[] {
    const notEmptyCells = this.notEmptyCells;
    return this.availableCells.filter(
      (position) => !notEmptyCells.includes(position)
    );
  }

  private get notEmptyCells(): number[] {
    return this.items.map((item) => item.row * 10 + item.col);
  }
  items: IItem[] = [];

  constructor() {
    this.generateAvailableCells();
    this.generateItems();
  }

  left(): void {
    this.generateItems();
  }

  up(): void {
    this.generateItems();
  }

  right(): void {
    this.generateItems();
  }

  down(): void {
    this.generateItems();
  }

  private generateItems(length: number = 2) {
    const positions: number[] = this.emptyCells
      .sort(() => Math.random() - 0.5)
      .slice(0, length);

    this.items = [
      ...this.items,
      ...positions.map<IItem>((position) => ({
        value: 2,
        col: position % 10,
        row: (position - (position % 10)) / 10,
      })),
    ];
  }

  private generateAvailableCells() {
    for (let row = 1; row <= this.size; row++) {
      for (let col = 1; col <= this.size; col++) {
        this.availableCells.push(row * 10 + col);
      }
    }
  }
}
