package com.MatchMyMovie.api.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private Date createdOn;

    @OneToMany(mappedBy = "user")
    private List<Swipe> swipes;

    @OneToMany(mappedBy = "user")
    private List<UserPreference> userPreferences;

    public User() {
        this.createdOn = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public List<Swipe> getSwipes() {
        return swipes;
    }

    public void setSwipes(List<Swipe> swipes) {
        this.swipes = swipes;
    }

    public void addSwipe(Swipe swipe) {
        this.swipes.add(swipe);
    }

    public void removeSwipe(Swipe swipe) {
        this.swipes.remove(swipe);
    }

    public List<UserPreference> getUserPreferences() {
        return userPreferences;
    }

    public void setUserPreferences(List<UserPreference> userPreferences) {
        this.userPreferences = userPreferences;
    }

    public void addUserPreference(UserPreference userPreference) {
        this.userPreferences.add(userPreference);
    }

    public void removeUserPreference(UserPreference userPreference) {
        this.userPreferences.remove(userPreference);
    }
}
