plugins {
    `java-library`
    `maven-publish`
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.graalvm.buildtools.native)
}

group = "com.MatchMyMovie"
version = "0.0.1-SNAPSHOT"
description = "API for MatchMyMovie project"

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation(libs.springframework.jpa)
    implementation(libs.springframework.security)
    implementation(libs.springframework.web)
    implementation(libs.jjwt.api)
    runtimeOnly(libs.jjwt.impl)
    runtimeOnly(libs.jjwt.jackson)
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
