// productService.js
import apiClient from '@/app/Axios/axios';

export async function createProduct(dto) {
  // POST a http://localhost:8080/api/products
  const { data } = await apiClient.post('/products', {
    name:        dto.name,
    description: dto.description,
    imageUrl:    dto.imageUrl,
    category:    dto.category,
    basePrice:   dto.basePrice,
    userId:      dto.userId,
    status:      dto.status,
    visible:     dto.visible
  });
  return data;
}
export async function getProduct(id) {
  const res = await fetch(`${PRODUCT_BASE_URL}/${id}`);
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(PRODUCT_BASE_URL);
  return res.json();
}

export async function getProductsByUser(userId) {
  const res = await fetch(`${PRODUCT_BASE_URL}/user/${userId}`);
  return res.json();
}

export async function getProductsByStatus(status) {
  const res = await fetch(`${PRODUCT_BASE_URL}/status/${status}`);
  return res.json();
}

export async function updateProduct(id, dto) {
  const res = await fetch(`${PRODUCT_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  return res.json();
}

export async function deleteProduct(id) {
  await fetch(`${PRODUCT_BASE_URL}/${id}`, { method: 'DELETE' });
}
