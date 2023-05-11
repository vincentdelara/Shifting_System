package com.backend.mysql.backend.mysql.api.controller;

import com.backend.mysql.backend.mysql.api.model.User;
import com.backend.mysql.backend.mysql.api.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersResource {
    private final UserMapper userMapper;

    public UsersResource(UserMapper userMapper){
        this.userMapper = userMapper;
    }

    @GetMapping("/allUsers")
    public List<User> getAll(){
        return userMapper.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        int count = userMapper.countByEmailAndPassword(user.getEmail(), user.getPassword());
        if (count == 1) {
            return ResponseEntity.ok("{\"message\":\"Login Successful\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\":\"Wrong credentials\"}");
        }
    }

    @PostMapping("/CreateUser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userMapper.insertUser(user);
        return ResponseEntity.ok("{\"message\":\"User created successfully\"}");
    }
}
