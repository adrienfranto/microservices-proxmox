package com.franto.microservices.etudiant_service.service;

import com.franto.microservices.etudiant_service.dto.EtudiantRequest;
import com.franto.microservices.etudiant_service.dto.EtudiantResponse;
import com.franto.microservices.etudiant_service.model.Etudiant;
import com.franto.microservices.etudiant_service.repository.EtudiantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EtudiantService {
    private final EtudiantRepository etudiantRepository;
    public void ajouterEtudiant(EtudiantRequest etudiantRequest){
        Etudiant etudiant =Etudiant.builder()
                .matricule(etudiantRequest.getMatricule())
                .nom(etudiantRequest.getNom())
                .prenoms(etudiantRequest.getPrenoms())
                .sexe(etudiantRequest.getSexe())
                .age(etudiantRequest.getAge())
                .build();

        etudiantRepository.save(etudiant);
        log.info("Etudiant {} enregister avec success",etudiant.getId());
    }

    public List<EtudiantResponse> afficherEtudiants() {
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        return etudiantList.stream().map(etudiant -> mapToEtudiantResponse(etudiant))
                .toList();

    }


    public void modifierEtudiant(String id, EtudiantRequest etudiantRequest){
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        etudiant.setNom(etudiantRequest.getNom());
        etudiant.setMatricule(etudiantRequest.getMatricule());
        etudiant.setPrenoms(etudiantRequest.getPrenoms());
        etudiant.setSexe(etudiantRequest.getSexe());
        etudiant.setAge(etudiantRequest.getAge());

        etudiantRepository.save(etudiant);
        log.info("Étudiant {} modifié avec succès", etudiant.getId());
    }

    public void supprimerEtudiant(String id){
        etudiantRepository.deleteById(id);
        log.info("Étudiant {} supprimé avec succès", id);
    }

    private EtudiantResponse mapToEtudiantResponse(Etudiant etudiant){
        return  EtudiantResponse.builder()
                .id(etudiant.getId())
                .matricule(etudiant.getMatricule())
                .nom(etudiant.getNom())
                .prenoms(etudiant.getPrenoms())
                .sexe(etudiant.getSexe())
                .age(etudiant.getAge())
                .build();
    }
}
