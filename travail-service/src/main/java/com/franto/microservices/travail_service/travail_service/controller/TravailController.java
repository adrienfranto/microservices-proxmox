package com.franto.microservices.travail_service.travail_service.controller;


import com.franto.microservices.travail_service.travail_service.dto.TravailDto;
import com.franto.microservices.travail_service.travail_service.service.TravailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/travaux")
@RequiredArgsConstructor
public class TravailController {

    private final TravailService service;

    @PostMapping
    public TravailDto createTravail(@RequestBody TravailDto dto) {
        return service.createTravail(dto);
    }

    @GetMapping
    public List<TravailDto> getAllTravaux() {
        return service.getAllTravaux();
    }

    @GetMapping("/{id}")
    public TravailDto getTravailById(@PathVariable Long id) {
        return service.getTravailById(id);
    }

    @PutMapping("/{id}")
    public TravailDto updateTravail(@PathVariable Long id, @RequestBody TravailDto dto) {
        return service.updateTravail(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTravail(@PathVariable Long id) {
        service.deleteTravail(id);
    }
}
