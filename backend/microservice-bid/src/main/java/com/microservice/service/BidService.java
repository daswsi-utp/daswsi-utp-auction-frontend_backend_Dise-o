package com.microservice.service;

import java.util.List;
import com.microservice.dto.BidDTO;

public interface BidService {
    BidDTO create(BidDTO dto);
    BidDTO getById(Long id);
    List<BidDTO> getAll();
    List<BidDTO> getByAuction(Long auctionId);
    List<BidDTO> getByUser(Long userId);
    BidDTO update(Long id, BidDTO dto);
    void delete(Long id);
}