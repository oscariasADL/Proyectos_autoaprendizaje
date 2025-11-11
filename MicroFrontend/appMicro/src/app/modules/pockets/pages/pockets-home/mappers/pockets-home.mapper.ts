import {
  GroupedPockets,
  Pocket,
  POCKET_STATUS,
  POCKET_STATUS_CLASS,
  POCKETS_ALLOWED,
  PocketsComplete
} from '@modules/pockets/entities/pockets.interface';

export function mapPocketsHome(pockets: PocketsComplete): PocketsComplete {
  const traditionalPockets = pockets?.traditionalPockets ?? [];
  const profitabilityPockets = pockets?.profitabilityPockets ?? [];
  const pocketsData = [...traditionalPockets, ...profitabilityPockets]
    .filter((pocket: Pocket) => POCKETS_ALLOWED.includes(pocket.status))
    .map((pocket: Pocket) => ({
      ...pocket,
      statusName: POCKET_STATUS[pocket.status],
      statusClass: POCKET_STATUS_CLASS[pocket.status]
    }));
  return { ...pockets, pockets: pocketsData };
}

export function mapGroupPockets(pockets: Pocket[]): GroupedPockets[] {
  const grouped = new Map<string, GroupedPockets>();
  pockets.forEach((pocket) => {
    if (!grouped.has(pocket.pocketType)) {
      grouped.set(pocket.pocketType, {
        pocketType: pocket.pocketType,
        pockets: []
      });
    }
    grouped.get(pocket.pocketType).pockets.push(pocket);
    grouped.get(pocket.pocketType).pockets.sort(sortPocketsFn);
  });
  return Array.from(grouped.values()).sort((a, b) =>
    a.pocketType.toString().localeCompare(b.pocketType)
  );
}

export function sortPocketsFn(a: Pocket, b: Pocket): number {
  if (a.status !== b.status) {
    return a.status - b.status;
  }
  return b.amountSaved - a.amountSaved;
}
