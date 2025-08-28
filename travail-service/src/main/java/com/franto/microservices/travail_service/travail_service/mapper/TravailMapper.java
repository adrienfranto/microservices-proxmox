package com.franto.microservices.travail_service.travail_service.mapper;


import com.franto.microservices.travail_service.travail_service.dto.TravailDto;
import com.franto.microservices.travail_service.travail_service.model.Travail;

public class TravailMapper {

    public static TravailDto toDto(Travail travail) {
        return new TravailDto(
                travail.getId(),
                travail.getTitre(),
                travail.getDescription()
        );
    }

    public static Travail toEntity(TravailDto dto) {
        Travail travail = new Travail();
        travail.setId(dto.getId());
        travail.setTitre(dto.getTitre());
        travail.setDescription(dto.getDescription());
        return travail;
    }
}
