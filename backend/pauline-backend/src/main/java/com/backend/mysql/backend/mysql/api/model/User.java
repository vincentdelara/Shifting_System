package com.backend.mysql.backend.mysql.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    private String firstname;
    private String middlename;
    private String lastname;
    private String username;
    private String email;
    private String password;
    private String business_unit;
    private String position;


    public User(Integer userId, String firstname, String middlename, String lastname,  String username, String email, String business_unit, String position) {
        this.userId = userId;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.business_unit = business_unit;
        this.position = position;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public String getLastname() {
        return lastname;
    }

    public String getBusinessUnit() {
        return business_unit;
    }

    public String getPosition() {
        return position;
    }

    public String getUsername() {
        return username;
    }

    public void setFirstname() {
        this.firstname = firstname;
    }

    public void setMiddlename() {
        this.middlename = middlename;
    }

    public void setLastname() {
        this.lastname = lastname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBusinessUnit() {
        this.business_unit = business_unit;
    }

    public void setPosition() {
        this.position = position;
    }
}

