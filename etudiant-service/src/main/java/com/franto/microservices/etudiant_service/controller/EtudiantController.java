package com.franto.microservices.etudiant_service.controller;

import com.franto.microservices.etudiant_service.dto.EtudiantRequest;
import com.franto.microservices.etudiant_service.dto.EtudiantResponse;
import com.franto.microservices.etudiant_service.service.EtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/etudiant")
@RequiredArgsConstructor
public class EtudiantController {

    private final EtudiantService etudiantService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void ajouterEtudiant(@RequestBody EtudiantRequest etudiantRequest){
        etudiantService.ajouterEtudiant(etudiantRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List <EtudiantResponse>  afficherEtudiants(){
       return etudiantService.afficherEtudiants();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void modifierEtudiant(@PathVariable String id, @RequestBody EtudiantRequest etudiantRequest){
        etudiantService.modifierEtudiant(id, etudiantRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void supprimerEtudiant(@PathVariable String id){
        etudiantService.supprimerEtudiant(id);
    }
}
