FROM openjdk:21-jdk-slim

WORKDIR /app

COPY build/target/trading-platform.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Xmx256m -Xms128m -Dserver.port=$PORT -jar app.jar"]
