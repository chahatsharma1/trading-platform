FROM openjdk:21-jdk-slim

WORKDIR /app

COPY . /app

RUN chmod +x ./mvnw

RUN ./mvnw clean package

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-Dserver.port=$PORT", "-jar", "target/trading-platform-0.0.1-SNAPSHOT.jar"]