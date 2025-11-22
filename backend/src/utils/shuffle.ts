// Função utilitária para embaralhar um array usando o algoritmo de Fisher-Yates

export const shuffle = <T>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);
};
