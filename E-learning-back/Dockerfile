# Utiliser une image de base avec OpenJDK 17
FROM openjdk:17-jdk-slim

# Installer Maven
RUN apt-get update && apt-get install -y maven

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le fichier pom.xml et les fichiers source dans le répertoire de travail
COPY pom.xml /app
COPY src /app/src

# Télécharger les dépendances de Maven et compiler l'application en ignorant les tests
RUN mvn -f /app/pom.xml clean package -DskipTests

# Exposer le port sur lequel l'application va écouter
EXPOSE 8080

# Démarrer l'application avec l'option JVM pour ouvrir le module java.base
CMD ["java", "--add-opens", "java.base/javax.security.auth=ALL-UNNAMED", "-jar", "/app/target/elearning-0.0.1-SNAPSHOT.jar"]
