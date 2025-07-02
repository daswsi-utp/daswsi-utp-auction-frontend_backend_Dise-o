package controller;

import dto.SearchResultDTO;
import service.SearchService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin("*")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public List<SearchResultDTO> search(@RequestParam String query) {
        return searchService.search(query);
    }
}
