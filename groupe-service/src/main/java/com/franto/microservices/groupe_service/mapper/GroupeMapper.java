package com.franto.microservices.groupe_service.mapper;

import com.franto.microservices.groupe_service.dto.GroupeDto;
import com.franto.microservices.groupe_service.model.Groupe;

public class GroupeMapper {

    public static GroupeDto toDto(Groupe groupe) {
        if(groupe == null) return null;
        return new GroupeDto(groupe.getId(), groupe.getNomGroup(), groupe.getDescription());
    }

    public static Groupe toEntity(GroupeDto dto) {
        if(dto == null) return null;
        return new Groupe(dto.getId(), dto.getNomGroup(), dto.getDescription());
    }
}
