//vincentdelara
package tgsi.shiftingsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("tgsi.shiftingsystem.mapper")
public class ShiftingsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShiftingsystemApplication.class, args);
	}

}
