package com.microservice.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.microservice.exception.ResourceNotFoundException;
import com.microservice.dto.ProductDTO;
import com.microservice.model.Product;
import com.microservice.repository.ProductRepository;
import com.microservice.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;

    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .category(product.getCategory())
                .basePrice(product.getBasePrice())
                .userId(product.getUserId())
                .status(product.getStatus())
                .visible(product.getVisible())
                .build();
    }

    private Product convertToEntity(ProductDTO dto) {
        return Product.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .basePrice(dto.getBasePrice())
                .userId(dto.getUserId())
                .status(dto.getStatus())
                .visible(dto.getVisible())
                .build();
    }

    @Override
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = convertToEntity(dto);
        return convertToDTO(repository.save(product));
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        return convertToDTO(product);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return repository.findByVisibleTrue()
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getProductsByUserId(Long userId) {
        return repository.findByUserId(userId)
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getProductsByStatus(String status) {
        return repository.findByStatus(status)
                .stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setCategory(dto.getCategory());
        product.setBasePrice(dto.getBasePrice());
        product.setStatus(dto.getStatus());
        product.setVisible(dto.getVisible());

        return convertToDTO(repository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        product.setVisible(false);
        repository.save(product);
    }
}