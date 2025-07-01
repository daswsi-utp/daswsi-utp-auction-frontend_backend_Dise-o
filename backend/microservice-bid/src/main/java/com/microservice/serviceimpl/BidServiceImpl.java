package com.microservice.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.microservice.dto.BidDTO;
import com.microservice.exception.ResourceNotFoundException;
import com.microservice.model.Bid;
import com.microservice.repository.BidRepository;
import com.microservice.service.BidService;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BidServiceImpl implements BidService {

    @Autowired
    private BidRepository repo;

    private BidDTO toDto(Bid b) {
        return BidDTO.builder()
            .id(b.getId())
            .auctionId(b.getAuctionId())
            .userId(b.getUserId())
            .amount(b.getAmount())
            .bidDate(b.getBidDate())
            .visible(b.getVisible())
            .build();
    }

    private Bid toEntity(BidDTO d) {
        return Bid.builder()
            .id(d.getId())
            .auctionId(d.getAuctionId())
            .userId(d.getUserId())
            .amount(d.getAmount())
            .bidDate(d.getBidDate())
            .visible(d.getVisible())
            .build();
    }

    @Override
    public BidDTO create(BidDTO dto) {
        return toDto(repo.save(toEntity(dto)));
    }

    @Override
    public BidDTO getById(Long id) {
        Bid b = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Puja no encontrada"));
        return toDto(b);
    }

    @Override
    public List<BidDTO> getAll() {
        return repo.findByVisibleTrue()
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<BidDTO> getByAuction(Long auctionId) {
        return repo.findByAuctionId(auctionId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<BidDTO> getByUser(Long userId) {
        return repo.findByUserId(userId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public BidDTO update(Long id, BidDTO dto) {
        Bid b = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Puja no encontrada"));
        b.setAmount(dto.getAmount());
        b.setVisible(dto.getVisible());
        return toDto(repo.save(b));
    }

    @Override
    public void delete(Long id) {
        Bid b = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Puja no encontrada"));
        b.setVisible(false);
        repo.save(b);
    }
}