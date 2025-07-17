package service;

import dto.AuctionDTO;
import dto.ProductDTO;
import dto.SearchResultDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    private final RestTemplate restTemplate;

    @Value("${auction.service.url}")
    private String auctionServiceUrl;

    @Value("${product.service.url}")
    private String productServiceUrl;

    public SearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<SearchResultDTO> search(String query) {
        String auctionUrl = auctionServiceUrl + "/api/auctions";
        AuctionDTO[] auctions = restTemplate.getForObject(auctionUrl, AuctionDTO[].class);

        List<SearchResultDTO> results = new ArrayList<>();

        if (auctions != null) {
            for (AuctionDTO auction : auctions) {
                ProductDTO product = restTemplate.getForObject(
                        productServiceUrl + "/api/products/" + auction.getProductId(),
                        ProductDTO.class
                );

                if (product != null && product.getName().toLowerCase().contains(query.toLowerCase())) {
                    results.add(new SearchResultDTO(
                            auction.getId(),
                            product.getName(),
                            product.getDescription(),
                            product.getImageUrl(),
                            product.getCategory(),
                            product.getBasePrice(),
                            auction.getInitialPrice()
                    ));
                }
            }
        }

        return results;
    }
}
