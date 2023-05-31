
package tgsi.shiftingsystem.mapper;
import org.apache.ibatis.annotations.*;

import tgsi.shiftingsystem.model.User;


@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE userId = #{userId}")
    User getUserById(Long userId);

    @Select("SELECT * FROM users WHERE username = #{username}")
    User getUserByUsername(String username);    

    @Select("SELECT * FROM users WHERE email = #{email}")
    User getUserByEmail(String username);  

    @Insert("INSERT INTO users (firstname, middlename, lastname, username, email, password, business_unit, position) VALUES (#{firstname}, #{middlename}, #{lastname}, #{username}, #{email}, #{password}, #{business_unit}, #{position})")
    @Options(useGeneratedKeys = true, keyProperty = "userId")
    void createUser(User user);
    
}


