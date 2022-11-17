package com.example.demo.controller;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Employees;


@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class Controller {
	private final TestRepository repo;
	
	public Controller(TestRepository repo) {
		this.repo = repo;
	}
	
    @GetMapping("/{id}")
    public Employees getClient(@PathVariable int id) {
        return repo.findById(id).orElseThrow(RuntimeException::new);
    }
	
	@GetMapping("/all")
    public List<Employees> listAll() {
        return repo.findAll();
    }
	
	@PostMapping
	public ResponseEntity<?> createEmployee(@RequestBody Employees employee) throws URISyntaxException {//
		try {
			Employees _employee = repo
					.save(new Employees(employee.getFirstName(), employee.getLastName(), employee.getPhoneNumber(),employee.getEmail()));
			return new ResponseEntity<>(_employee, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
  @PutMapping("/{id}")
  public ResponseEntity<Employees> updateClient(@PathVariable Integer id, @RequestBody Employees employee) {
      Employees currentEmployee = repo.findById(id).orElseThrow(RuntimeException::new);
      currentEmployee.setFirstName(employee.getFirstName());
      currentEmployee.setLastName(employee.getLastName());
      currentEmployee.setEmail(employee.getEmail());
      currentEmployee.setPhoneNumber(employee.getPhoneNumber());
      currentEmployee = repo.save(employee);

      return ResponseEntity.ok(currentEmployee);
  }
//
  @DeleteMapping("/{id}")
  public ResponseEntity deleteClient(@PathVariable int id) {
	  repo.deleteById(id);
      return ResponseEntity.ok().build();
  }

}
