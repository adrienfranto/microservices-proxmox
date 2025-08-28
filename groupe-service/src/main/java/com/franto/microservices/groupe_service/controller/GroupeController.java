package com.franto.microservices.groupe_service.controller;

import com.franto.microservices.groupe_service.dto.GroupeDto;
import com.franto.microservices.groupe_service.service.GroupeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/groupe")
@RequiredArgsConstructor
public class GroupeController {

    private final GroupeService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GroupeDto createGroupe(@RequestBody GroupeDto dto) {
        return service.createGroupe(dto);
    }

    @GetMapping
    public List<GroupeDto> getAllGroupes() {
        return service.getAllGroupes();
    }

    @GetMapping("/{id}")
    public GroupeDto getGroupeById(@PathVariable Long id) {
        return service.getGroupeById(id);
    }

    @PutMapping("/{id}")
    public GroupeDto updateGroupe(@PathVariable Long id, @RequestBody GroupeDto dto) {
        return service.updateGroupe(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGroupe(@PathVariable Long id) {
        service.deleteGroupe(id);
    }
}
