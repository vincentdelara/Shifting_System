//vincentdelara
package tgsi.shiftingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tgsi.shiftingsystem.mapper.DataMapper;
import tgsi.shiftingsystem.model.Data;

@RestController
@CrossOrigin("*")
public class DataController {
    @Autowired
    private DataMapper dataMapper;

    @GetMapping("/datas")
    public List<Data> getdata() {
        return dataMapper.findAll();
    }

    @GetMapping("/datas/{id}")
    public Data getdata(@PathVariable Long id) {
        return dataMapper.findById(id);
    }

    @PostMapping("/datas")
    public void createdata(@RequestBody Data data) {
        dataMapper.insert(data);
    }

    @PutMapping("/datas/{id}")
    public void updatedata(@PathVariable Long id, @RequestBody Data data) {
        data.setId(id); 
        dataMapper.update(data);
    }

    @DeleteMapping("/datas/{id}")
    public void deletedata(@PathVariable Long id) {
        dataMapper.deleteById(id);
    }

    
}
