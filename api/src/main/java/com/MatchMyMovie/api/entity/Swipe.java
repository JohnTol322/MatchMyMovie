package com.MatchMyMovie.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "swipes")
@Data
public class Swipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long movieId;

    private boolean liked;

    private Date createdOn;

    public Swipe() {
        this.createdOn = new Date();
    }
}
