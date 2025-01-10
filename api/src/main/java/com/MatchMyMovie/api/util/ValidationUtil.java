package com.MatchMyMovie.api.util;

public class ValidationUtil {
    public static boolean isNullOrEmpty(String value) {
        return value == null || value.isEmpty();
    }

    public static boolean emailIsValid(String email) {
        return email != null && email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    }

    public static boolean passwordIsValid(String password) {
        return password != null && password.length() >= 8;
    }
}
