# Base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy jar file
COPY target/etudiant-service-0.0.1-SNAPSHOT.jar app.jar

# Expose port Spring Boot
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
