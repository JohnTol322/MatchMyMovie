package com.MatchMyMovie.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
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
        this.userPreferences = new ArrayList<>();
        this.swipes = new ArrayList<>();
    }

    public void addSwipe(Swipe swipe) {
        this.swipes.add(swipe);
    }

    public void removeSwipe(Swipe swipe) {
        this.swipes.remove(swipe);
    }

    public void addUserPreference(UserPreference userPreference) {
        this.userPreferences.add(userPreference);
    }

    public void removeUserPreference(UserPreference userPreference) {
        this.userPreferences.remove(userPreference);
    }
}
