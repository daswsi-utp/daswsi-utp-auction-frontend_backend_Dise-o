package com.microservice.microservice_auction.serviceimpl;

import com.microservice.microservice_auction.dto.AuctionDTO;
import com.microservice.microservice_auction.exception.ResourceNotFoundException;
import com.microservice.microservice_auction.model.Auction;
import com.microservice.microservice_auction.model.AuctionStatus;
import com.microservice.microservice_auction.repository.AuctionRepository;
import com.microservice.microservice_auction.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository repo;

    private AuctionDTO toDto(Auction a) {
        return AuctionDTO.builder()
            .id(a.getId())
            .productId(a.getProductId())
            .startDate(a.getStartDate())
            .endDate(a.getEndDate())
            .initialPrice(a.getInitialPrice())
            .currentPrice(a.getCurrentPrice())
            .finalPrice(a.getFinalPrice())
            .winnerId(a.getWinnerId())
            .status(a.getStatus())
            .visible(a.getVisible())
            .build();
    }

    private Auction toEntity(AuctionDTO d) {
        return Auction.builder()
            .id(d.getId())
            .productId(d.getProductId())
            .startDate(d.getStartDate())
            .endDate(d.getEndDate())
            .initialPrice(d.getInitialPrice())
            .currentPrice(d.getCurrentPrice())
            .finalPrice(d.getFinalPrice())
            .winnerId(d.getWinnerId())
            .status(d.getStatus() != null ? d.getStatus() : AuctionStatus.PENDING)
            .visible(d.getVisible())
            .build();
    }

    @Override
    public AuctionDTO create(AuctionDTO dto) {
        return toDto(repo.save(toEntity(dto)));
    }

    @Override
    public AuctionDTO getById(Long id) {
        Auction a = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Subasta no encontrada"));
        return toDto(a);
    }

    @Override
    public List<AuctionDTO> getAll() {
        return repo.findByVisibleTrue()
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AuctionDTO> getByStatus(AuctionStatus status) {
        return repo.findByStatus(status)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public AuctionDTO update(Long id, AuctionDTO dto) {
        Auction a = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Subasta no encontrada"));

        a.setEndDate(dto.getEndDate());
        a.setCurrentPrice(dto.getCurrentPrice());
        a.setFinalPrice(dto.getFinalPrice());
        a.setWinnerId(dto.getWinnerId());
        a.setStatus(dto.getStatus());
        a.setVisible(dto.getVisible());

        return toDto(repo.save(a));
    }

    @Override
    public void delete(Long id) {
        Auction a = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Subasta no encontrada"));
        a.setVisible(false);
        repo.save(a);
    }
}
