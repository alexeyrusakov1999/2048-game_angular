export interface IItem {
  value: number;
  row: number;
  col: number;
  isOnDelete?: boolean; // Если true то должен быть удален в следующем цикле
}
