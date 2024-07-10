package in.pfe.elearning.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.services.TeacherService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/teachers")

public class TeacherController {

    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable String email) {
        Teacher teacher = teacherService.getTeacherByEmail(email);
        return teacher != null ? ResponseEntity.ok(teacher) : ResponseEntity.notFound().build();
    }


    @PutMapping("/{email}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable String id, @RequestBody Teacher teacher) {
        Teacher updatedTeacher = teacherService.updateTeacher(id, teacher);
        return ResponseEntity.ok(updatedTeacher);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable String id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/requests")
    public ResponseEntity<List<Teacher>> getTeachersRequests() {
        List<Teacher> teachers = teacherService.getTeachersRequests();
        return ResponseEntity.ok(teachers);
    }

    @PutMapping("/requests/{id}")
    public ResponseEntity<Void> approveTeacherRequest(@PathVariable String id) {
        teacherService.approveTeacherRequest(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
