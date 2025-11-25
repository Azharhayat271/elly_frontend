export enum OperationType {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide',
}

export interface User {
  id: string;
  username: string;
}

export interface Calculation {
  id: string;
  userId: string;
  username: string;
  parentId: string | null;
  operation: OperationType | null;
  number: number;
  result: number;
  createdAt: Date;
  children: Calculation[];
}
