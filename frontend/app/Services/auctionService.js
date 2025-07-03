// auctionService.js
import apiClient from '@/app/Axios/axios';

export async function createAuction(dto) {
  // POST a http://localhost:8080/api/auctions
  const { data } = await apiClient.post('/auctions', {
    productId:    dto.productId,
    initialPrice: dto.initialPrice,
    startDate:    dto.startDate,
    endDate:      dto.endDate,
    status:       dto.status,
    visible:      dto.visible
  });
  return data;
}
export async function getAuction(id) {
  const res = await fetch(`${AUCTION_BASE_URL}/${id}`);
  return res.json();
}

export async function getAllAuctions() {
  const res = await fetch(AUCTION_BASE_URL);
  return res.json();
}

export async function getAuctionsByStatus(status) {
  const res = await fetch(`${AUCTION_BASE_URL}/status/${status}`);
  return res.json();
}

export async function updateAuction(id, dto) {
  const res = await fetch(`${AUCTION_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  return res.json();
}

export async function deleteAuction(id) {
  await fetch(`${AUCTION_BASE_URL}/${id}`, { method: 'DELETE' });
}

// funciones para historial de subasta
export async function recordAuctionHistory(dto) {
  const res = await fetch(AUCTION_HISTORY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  return res.json();
}

export async function getHistoryByAuction(auctionId) {
  const res = await fetch(`${AUCTION_HISTORY_URL}/auction/${auctionId}`);
  return res.json();
}

export async function getHistoryByUser(userId) {
  const res = await fetch(`${AUCTION_HISTORY_URL}/user/${userId}`);
  return res.json();
}
