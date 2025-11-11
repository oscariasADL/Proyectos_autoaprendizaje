export interface ErrorsForCheckI {
  [key: string]: [string, string];
}

export const ERRORS_FOR_CHECK_LIST: ErrorsForCheckI = {
  notConsecutive: [
    'Números <span class="semi-bold">no</span> consecutivos',
    'Números no consecutivos'
  ],
  notRepeated: [
    'Números <span class="semi-bold">no</span> repetidos',
    'Números no repetidos'
  ]
};
