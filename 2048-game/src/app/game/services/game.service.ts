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
    this.move();
  }

  up(): void {
    this.move();
  }

  right(): void {
    this.move();
  }

  down(): void {
    this.move();
  }

  private move() {
    this.clearDeletedItems();

    const mergedItems: IItem[] = [];

    for (let row = 1; row <= this.size; row++) {
      const rowItems = this.items
        .filter((item) => item.row === row)
        .sort((a, b) => a.col - b.col);
      console.log(rowItems);
      let col = 1;
      let merged = false;
      let prevItem: IItem | null = null;

      for (let i = 0; i < rowItems.length; i++) {
        const item = rowItems[i];

        if (prevItem) {
          if (merged) {
            merged = false;
          } else if (item.value === prevItem.value) {
            col--;
            prevItem.isOnDelete = true;
            item.isOnDelete = true;

            mergedItems.push({ value: item.value * 2, col, row });

            merged = true;
          }
        }
        item.col = col;
        col++;
        prevItem = item;
      }
    }

    this.items = [...this.items, ...mergedItems];

    this.generateItems();
  }

  private clearDeletedItems() {
    this.items = this.items.filter((item) => !item.isOnDelete);
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
