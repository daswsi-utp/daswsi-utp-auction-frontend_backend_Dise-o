package com.microservice.service;

import java.util.List;

import com.microservice.dto.ProductDTO;

public interface ProductService {
    ProductDTO createProduct(ProductDTO dto);
    ProductDTO getProductById(Long id);
    List<ProductDTO> getAllProducts();
    List<ProductDTO> getProductsByUserId(Long userId);
    List<ProductDTO> getProductsByStatus(String status);
    ProductDTO updateProduct(Long id, ProductDTO dto);
    void deleteProduct(Long id); // delete logic = visible
}