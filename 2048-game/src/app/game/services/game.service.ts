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
  theEnd: boolean = false;

  constructor() {
    this.generateAvailableCells();
    this.generateItems();
  }

  left(): void {
    this.move("row", "col", false);
  }

  up(): void {
    this.move("col", "row", false);
  }

  right(): void {
    this.move("row", "col", true);
  }

  down(): void {
    this.move("col", "row", true);
  }

  private move(
    dimX: "col" | "row" = "row",
    dimY: "col" | "row" = "col",
    reverse: boolean = false
  ) {
    if (this.theEnd || !this.canIMove(dimX)) {
      return;
    }
    this.clearDeletedItems();

    const mergedItems: IItem[] = [];

    for (let x = 1; x <= this.size; x++) {
      const items: IItem[] = this.items
        .filter((item) => item[dimX] === x)
        .sort((a, b) => a[dimY] - b[dimY]);

      if (reverse) {
        items.reverse();
      }

      let y = reverse ? this.size : 1;
      let merged = false;
      let prevItem: IItem | null = null;

      for (const item of items) {
        if (prevItem) {
          if (merged) {
            merged = false;
          } else if (item.value === prevItem.value) {
            reverse ? y++ : y--;
            prevItem.isOnDelete = true;
            item.isOnDelete = true;

            mergedItems.push({
              value: item.value * 2,
              [dimY]: y,
              [dimX]: x,
            } as any);

            merged = true;
          }
        }
        item[dimY] = y;
        reverse ? y-- : y++;
        prevItem = item;
      }
    }

    this.items = [...this.items, ...mergedItems];

    this.generateItems();

    this.theEnd = this.thisIsTheEnd();
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

  private thisIsTheEnd() {
    return !this.canIMove("row") && !this.canIMove("col");
  }

  private canIMove(dimX: "row" | "col") {
    const dimY = dimX === "row" ? "col" : "row";
    for (let x = 1; x <= this.size; x++) {
      const items = this.items
        .filter((item) => !item.isOnDelete && item[dimX] === x)
        .sort((a, b) => a[dimY] - b[dimY]);

      if (items.length !== this.size) {
        return true;
      }

      let prevValue = 0;

      for (const item of items) {
        if (item.value === prevValue) {
          return true;
        }

        prevValue = item.value;
      }
    }

    return false;
  }

  private generateAvailableCells() {
    for (let row = 1; row <= this.size; row++) {
      for (let col = 1; col <= this.size; col++) {
        this.availableCells.push(row * 10 + col);
      }
    }
  }
}
