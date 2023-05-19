package tgsi.shiftingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tgsi.shiftingsystem.mapper.UserMapper;
import tgsi.shiftingsystem.model.User;



@RestController
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserMapper userMapper;
   
    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userMapper.getUserById(userId);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userMapper.getUserByUsername(username);
    }


    @PostMapping("/registerUser")
    public void registerUser(@RequestBody User user) {
        userMapper.createUser(user);
    }
}
