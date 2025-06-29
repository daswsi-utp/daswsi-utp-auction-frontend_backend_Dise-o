package com.microservice.microservice_auction.serviceimpl;

import com.microservice.microservice_auction.dto.AuctionHistoryDTO;
import com.microservice.microservice_auction.model.AuctionHistory;
import com.microservice.microservice_auction.repository.AuctionHistoryRepository;
import com.microservice.microservice_auction.service.AuctionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionHistoryServiceImpl implements AuctionHistoryService {

    @Autowired
    private AuctionHistoryRepository repo;

    private AuctionHistoryDTO toDto(AuctionHistory h) {
        return AuctionHistoryDTO.builder()
            .id(h.getId())
            .userId(h.getUserId())
            .auctionId(h.getAuctionId())
            .interactionType(h.getInteractionType())
            .amount(h.getAmount())
            .date(h.getDate())
            .visible(h.getVisible())
            .build();
    }

    private AuctionHistory toEntity(AuctionHistoryDTO d) {
        return AuctionHistory.builder()
            .id(d.getId())
            .userId(d.getUserId())
            .auctionId(d.getAuctionId())
            .interactionType(d.getInteractionType())
            .amount(d.getAmount())
            .date(d.getDate())
            .visible(d.getVisible())
            .build();
    }

    @Override
    public AuctionHistoryDTO record(AuctionHistoryDTO dto) {
        return toDto(repo.save(toEntity(dto)));
    }

    @Override
    public List<AuctionHistoryDTO> getByAuction(Long auctionId) {
        return repo.findByAuctionId(auctionId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AuctionHistoryDTO> getByUser(Long userId) {
        return repo.findByUserId(userId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }
}
