export type InterchangeState = Readonly<{
  working: boolean;
  completed: boolean;
  date: Date;
  publicKey?: string;
  timeoutId?: number;
}>;

export const initialInterchangeState: InterchangeState = {
  working: false,
  completed: false,
  date: null,
  publicKey: undefined
};
