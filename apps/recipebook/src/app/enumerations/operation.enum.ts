export enum Operation {
  Modify = 'm',
  Inquiry = 'i',
  Correct = 'c'
}

export type OperationType = Operation.Modify | Operation.Inquiry | Operation.Correct;