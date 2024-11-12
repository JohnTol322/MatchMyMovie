package com.MatchMyMovie.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_preferences")
@Data
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer genreId;

    private Integer preferenceScore;

    public void addPreferenceScore(Integer preferenceScore) {
        this.preferenceScore += preferenceScore;
    }

}
