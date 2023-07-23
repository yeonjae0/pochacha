FROM openjdk:17-jdk-alpine
ARG JAR_FILE=oho-0.0.1-SNAPSHOT.jar
COPY /build/libs/${JAR_FILE} api.jar
ENTRYPOINT ["java","-jar","/api.jar"]
