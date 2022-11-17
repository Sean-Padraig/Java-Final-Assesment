package com.example.demo.controller;

import com.example.demo.Employees;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Employees, Integer>  {

}
