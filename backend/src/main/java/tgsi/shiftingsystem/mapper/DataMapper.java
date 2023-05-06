//vincentdelara
package tgsi.shiftingsystem.mapper;
import java.util.List;

import org.apache.ibatis.annotations.*;


import tgsi.shiftingsystem.model.Data;

@Mapper
public interface DataMapper {
        @Select("SELECT * FROM datas ORDER BY id DESC")
        List<Data> findAll();
    
        @Select("SELECT * FROM datas WHERE id = #{id}")
        Data findById(Long id);
    
        @Insert("INSERT INTO datas(overtime, otime, start, end, xpire, shifttype, status) VALUES(#{overtime}, #{otime}, #{start}, #{end}, #{xpire}, #{shifttype}, #{status})")
        @Options(useGeneratedKeys = true, keyProperty = "id")
        void insert(Data data);
    
        @Update("UPDATE datas SET overtime = #{overtime}, otime = #{otime}, start = #{start}, end = #{end}, xpire = #{xpire}, shifttype = #{shifttype}, status = #{status}, WHERE id = #{id}")
        void update(Data data);
    
        @Delete("DELETE FROM datas WHERE id = #{id}")
        void deleteById(Long id);
    }
    