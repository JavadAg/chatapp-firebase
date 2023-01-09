export const combineIds = (id1: string, id2: string) => {
  const combinedIds = id1 > id2 ? id1 + id2 : id2 + id1
  return combinedIds
}
