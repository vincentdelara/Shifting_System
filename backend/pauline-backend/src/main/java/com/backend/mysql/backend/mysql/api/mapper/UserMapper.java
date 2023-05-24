package com.backend.mysql.backend.mysql.api.mapper;

import com.backend.mysql.backend.mysql.api.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT userid, username, email FROM users")
    List<User> findAll();

    @Select("SELECT COUNT(*) FROM users WHERE email = #{email} AND password = #{password}")
    int countByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Insert("INSERT INTO users (firstname, middlename, lastname, username, email, password, business_unit, position) VALUES (#{firstname}, #{middlename}, #{lastname}, #{username}, #{email}, #{password}, #{business_unit}, #{position})")
    @Options(useGeneratedKeys = true, keyProperty = "userId")
    void insertUser(User user);
}
