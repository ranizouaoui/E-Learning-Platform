package in.pfe.elearning.controllers;

import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.Student;
import in.pfe.elearning.services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/parents")
public class ParentController {

    private final ParentService parentService;

    @Autowired
    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }
    BCryptPasswordEncoder bCryptPasswordEncoder;


    // Endpoint to retrieve all parents
    @GetMapping("/all")
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    // Endpoint to retrieve a parent by ID
    @GetMapping("/{email}")
    public Parent getParentById(@PathVariable String email) {
        if (parentService.getParentByEmail(email).isPresent()) {
            return parentService.getParentByEmail(email).get();
        } else {
            throw new RuntimeException("Parent not found with mail: " + email);
        }
    }

    // Endpoint to delete a parent by ID
    @DeleteMapping("/{email}")
    public void deleteParentById(@PathVariable String email) {
        parentService.deleteParentByEmail(email);
    }

    // Endpoint to delete all students
    @DeleteMapping("/deleteAll")
    public void deleteAllParents() {
        parentService.deleteAllParent();
    }

    // Endpoint to add a student
    @PostMapping("/{parentEmail}/addStudent")
    public void addStudent(@PathVariable String parentEmail, @RequestBody Student student) {
        parentService.addStudent(parentEmail, student);
    }

    // Endpoint to remove a student
    @DeleteMapping("/{parentEmail}/removeStudent/{studentId}")
    public void removeStudent(@PathVariable String parentEmail, @PathVariable int studentId) {
        parentService.removeStudent(parentEmail, studentId);
    }

    // Endpoint to update a student
    @PutMapping("/{parentEmail}/updateStudent/{studentId}")
    public void updateStudent(@PathVariable String parentEmail, @PathVariable int studentId, @RequestBody Student student) {
        parentService.updateStudent(parentEmail, studentId, student);
    }
    @PutMapping("/{parentEmail}/upgrade")
    public void upgradeAccount(@PathVariable String parentEmail) {
        parentService.upgradeparentaccount(parentEmail);
    }

}
