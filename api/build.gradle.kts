plugins {
    `java-library`
    `maven-publish`
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.graalvm.buildtools.native)
}

group = "com.MatchMyMovie"
version = "0.0.1-SNAPSHOT"
description = "api"

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    api(libs.springframework.jpa)
    api(libs.springframework.security)
    api(libs.springframework.web)
    runtimeOnly(libs.postgresql)
    compileOnly(libs.lombok)
    developmentOnly(libs.springframework.devtools)
    annotationProcessor(libs.springframework.configuration.processor)
    annotationProcessor(libs.lombok)
    testImplementation(libs.springframework.test)
    testImplementation(libs.springframework.security.test)
}

java {
    disableAutoTargetJvm()
    toolchain.languageVersion = JavaLanguageVersion.of(21)
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

publishing {
    publications.create<MavenPublication>("maven") {
        from(components["java"])
    }
}

tasks {
    withType<JavaCompile> {
        options.encoding = Charsets.UTF_8.name()
        options.release = 21
    }

    withType<Javadoc> {
        options.encoding = Charsets.UTF_8.name()
    }
}
