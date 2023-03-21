FROM openjdk:17-alpine AS build

COPY . .

WORKDIR /backend

RUN chmod +x ./gradlew && \
    ./gradlew clean && \
    ./gradlew bootJar

FROM openjdk:17 AS main

WORKDIR /app

EXPOSE 8080

ARG JAR_FILE=/backend/build/libs/*.jar
COPY --from=build ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar"]