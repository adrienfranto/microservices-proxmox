
package com.franto.microservices.etudiant_service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.franto.microservices.etudiant_service.dto.EtudiantRequest;
import com.franto.microservices.etudiant_service.repository.EtudiantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MongoDBContainer;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class EtudiantServiceTest {

	static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:latest").withReuse(true);

	static {
		mongoDBContainer.start();
	}

	@DynamicPropertySource
	static void setProperties(DynamicPropertyRegistry registry) {
		registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
	}

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private EtudiantRepository etudiantRepository;

	@Test
	void shouldCreateEtudiant() throws Exception {
		EtudiantRequest etudiantRequest = getEtudiantRequest();
		String etudiantRequestString = objectMapper.writeValueAsString(etudiantRequest);

		mockMvc.perform(post("/api/etudiant")
						.contentType(MediaType.APPLICATION_JSON)
						.content(etudiantRequestString))
				.andExpect(status().isCreated());

		assertEquals(1, etudiantRepository.findAll().size());
	}

	private EtudiantRequest getEtudiantRequest() {
		return EtudiantRequest.builder()
				.matricule("1555H-F")
				.nom("RAZAFINDRATOVO")
				.prenoms("Adrien Franto")
				.sexe("Masculin")
				.age(BigDecimal.valueOf(23))
				.build();
	}
}
