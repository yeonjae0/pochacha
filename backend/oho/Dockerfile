FROM openjdk:17-jdk-alpine

ARG JAR_FILE=oho-0.0.1-SNAPSHOT.jar

COPY /build/libs/${JAR_FILE} /app.jar

#COPY ./src/main/resources/keystore.p12 /app/keystore.p12

CMD ["java", "-jar", "-Dspring.profiles.active=prod", "/app.jar"]
