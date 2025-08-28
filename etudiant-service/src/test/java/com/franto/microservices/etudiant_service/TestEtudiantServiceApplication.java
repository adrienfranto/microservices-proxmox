package com.franto.microservices.etudiant_service;

import org.springframework.boot.SpringApplication;

public class TestEtudiantServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(EtudiantServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
