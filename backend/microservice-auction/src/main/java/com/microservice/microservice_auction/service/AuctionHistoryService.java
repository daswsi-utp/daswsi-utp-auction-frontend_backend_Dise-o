package com.microservice.microservice_auction.service;

import com.microservice.microservice_auction.dto.AuctionHistoryDTO;
import java.util.List;

public interface AuctionHistoryService {
    AuctionHistoryDTO record(AuctionHistoryDTO dto);
    List<AuctionHistoryDTO> getByAuction(Long auctionId);
    List<AuctionHistoryDTO> getByUser(Long userId);
}
