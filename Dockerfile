# Use the official OpenJDK base image
FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the local code to the container
COPY . /app

# Run the build command (Maven)
RUN ./mvnw clean package

# Expose port (Render sets PORT environment variable, typically 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-Dserver.port=$PORT", "-jar", "target/trading-platform.jar"]
