package com.franto.microservices.travail_service.travail_service.service;

import com.franto.microservices.travail_service.travail_service.dto.TravailDto;
import com.franto.microservices.travail_service.travail_service.mapper.TravailMapper;
import com.franto.microservices.travail_service.travail_service.model.Travail;
import com.franto.microservices.travail_service.travail_service.repository.TravailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TravailService {

    private final TravailRepository repository;

    public TravailDto createTravail(TravailDto dto) {
        Travail travail = TravailMapper.toEntity(dto);
        return TravailMapper.toDto(repository.save(travail));
    }

    public List<TravailDto> getAllTravaux() {
        return repository.findAll()
                .stream()
                .map(TravailMapper::toDto)
                .collect(Collectors.toList());
    }

    public TravailDto getTravailById(Long id) {
        Travail travail = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Travail non trouvé avec id : " + id));
        return TravailMapper.toDto(travail);
    }

    public TravailDto updateTravail(Long id, TravailDto dto) {
        Travail travail = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Travail non trouvé avec id : " + id));

        travail.setTitre(dto.getTitre());
        travail.setDescription(dto.getDescription());

        return TravailMapper.toDto(repository.save(travail));
    }

    public void deleteTravail(Long id) {
        repository.deleteById(id);
    }
}
