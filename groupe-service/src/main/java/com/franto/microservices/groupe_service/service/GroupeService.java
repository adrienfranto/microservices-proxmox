package com.franto.microservices.groupe_service.service;

import com.franto.microservices.groupe_service.dto.GroupeDto;
import com.franto.microservices.groupe_service.mapper.GroupeMapper;
import com.franto.microservices.groupe_service.model.Groupe;
import lombok.RequiredArgsConstructor;
import com.franto.microservices.groupe_service.repository.GroupeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupeService {

    private final GroupeRepository repository;

    public GroupeDto createGroupe(GroupeDto dto) {
        Groupe groupe = GroupeMapper.toEntity(dto);
        Groupe saved = repository.save(groupe);
        return GroupeMapper.toDto(saved);
    }

    public List<GroupeDto> getAllGroupes() {
        return repository.findAll().stream()
                .map(GroupeMapper::toDto)
                .collect(Collectors.toList());
    }

    public GroupeDto getGroupeById(Long id) {
        return repository.findById(id)
                .map(GroupeMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Groupe non trouvé"));
    }

    public GroupeDto updateGroupe(Long id, GroupeDto dto) {
        Groupe existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Groupe non trouvé"));
        existing.setNomGroup(dto.getNomGroup());
        existing.setDescription(dto.getDescription());
        Groupe updated = repository.save(existing);
        return GroupeMapper.toDto(updated);
    }

    public void deleteGroupe(Long id) {
        repository.deleteById(id);
    }
}
