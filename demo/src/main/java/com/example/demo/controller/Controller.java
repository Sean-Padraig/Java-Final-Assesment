package com.example.demo.controller;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Employees;


@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "*")
public class Controller {
	private final TestRepository repo;
	public Controller(TestRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping("/employees")
    public List<Employees> listAll() {
        return repo.findAll();
    }
	
	@PostMapping
	public ResponseEntity confirmBooking(@RequestBody Employees employee) throws URISyntaxException {//
		try {
			Employees _employee = repo
					.save(new Employees(employee.getFirstName(), employee.getLastName(), employee.getPhoneNumber(),employee.getEmail()));
			return new ResponseEntity<>(_employee, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
