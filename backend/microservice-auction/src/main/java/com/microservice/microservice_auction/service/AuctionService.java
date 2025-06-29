package com.microservice.microservice_auction.service;

import com.microservice.microservice_auction.dto.AuctionDTO;
import com.microservice.microservice_auction.model.AuctionStatus;
import java.util.List;

public interface AuctionService {
    AuctionDTO create(AuctionDTO dto);
    AuctionDTO getById(Long id);
    List<AuctionDTO> getAll();
    List<AuctionDTO> getByStatus(AuctionStatus status);
    AuctionDTO update(Long id, AuctionDTO dto);
    void delete(Long id);
}
