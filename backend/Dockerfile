FROM openjdk:17-slim as build

COPY . .

RUN chmod +x ./gradlew && \
    ./gradlew clean build --info


FROM openjdk:17 AS main

WORKDIR /app

EXPOSE 8080

ARG JAR_FILE=/build/libs/*.jar
COPY --from=build ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar"]