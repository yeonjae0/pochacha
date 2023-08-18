FROM openjdk:17-jdk-alpine

ARG JAR_FILE=oho-0.0.1-SNAPSHOT.jar

COPY /build/libs/${JAR_FILE} /app.jar

COPY _.korean.go.kr.crt _.korean.go.kr.crt

RUN keytool -importcert -file _.korean.go.kr.crt -keystore /etc/ssl/certs/java/cacerts -storepass changeit -noprompt

CMD ["java", "-jar", "-Dspring.profiles.active=prod", "/app.jar"]
