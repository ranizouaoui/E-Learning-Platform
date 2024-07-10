package in.pfe.elearning.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.services.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/numberOfCourses")
    public ResponseEntity<Integer> getNumberOfCourses() {
        return ResponseEntity.ok(adminService.numberOfCourses());
    }

    @GetMapping("/numberOfTeachers")
    public ResponseEntity<Integer> getNumberOfTeachers() {
        return ResponseEntity.ok(adminService.numberOfTeachers());
    }

    @GetMapping("/numberOfParents")
    public ResponseEntity<Integer> getNumberOfParents() {
        return ResponseEntity.ok(adminService.numberOfParents());
    }

    @GetMapping("/numberOfTests")
    public ResponseEntity<Integer> getNumberOfTests() {
        return ResponseEntity.ok(adminService.numberOfTests());
    }

    @GetMapping("/last5Parents")
    public ResponseEntity<List<Parent>> getLast5Parents() {
        return ResponseEntity.ok(adminService.getLast5Parents());
    }

    @GetMapping("/last5Teachers")
    public ResponseEntity<List<Teacher>> getLast5Teachers() {
        return ResponseEntity.ok(adminService.getLast5Teachers());
    }
}