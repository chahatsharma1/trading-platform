FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/trading-platform-0.0.1-SNAPSHOT.jar /app/trading-platform.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/trading-platform.jar"]