//vincentdelara
package tgsi.shiftingsystem.mapper;
import org.apache.ibatis.annotations.*;

import tgsi.shiftingsystem.model.User;


@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE iduser = #{iduser}")
    User getUserById(Long iduser);
    

    @Select("SELECT * FROM users WHERE username = #{username}")
    User getUserByUsername(String username);    

    @Insert("INSERT INTO users (username, password) VALUES (#{username}, #{password})")
    @Options(useGeneratedKeys = true, keyProperty = "iduser")
    void createUser(User user);
    
    
}


