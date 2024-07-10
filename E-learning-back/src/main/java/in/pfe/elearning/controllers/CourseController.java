package in.pfe.elearning.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.pfe.elearning.entity.Course;
import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.payload.response.MessageResponse;
import in.pfe.elearning.services.CourseService;
import in.pfe.elearning.services.EmailService;
import in.pfe.elearning.services.ParentService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final EmailService emailService;
    private final ParentService parentService;

    @Autowired
    public CourseController(CourseService courseService, EmailService emailService, ParentService parentService) {
        this.courseService = courseService;
        this.emailService = emailService;
        this.parentService = parentService;
    }

    @GetMapping("/courses")
    public ResponseEntity<Map<String, Object>> getAllCourses(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Pageable paging = PageRequest.of(page, size);
        Page<Course> pageCourses = courseService.getAllCourses(paging);
        List<Course> courses = pageCourses.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("courses", courses);
        response.put("currentPage", pageCourses.getNumber());
        response.put("totalItems", pageCourses.getTotalElements());
        response.put("totalPages", pageCourses.getTotalPages());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Optional<Course> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = courseService.createCourse(course);
        // Send notification email to all users about the new course created using the email service  
        String textbody = "تم إنشاء درس جديد بالاسم:  " + course.getName();
        List<Parent> parents = parentService.getAllParents();
        for (Parent parent : parents) {
            emailService.sendNotificationEmail(parent.getEmail(),textbody);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Course> getCourseByName(@PathVariable String name) {
        Optional<Course> course = courseService.getCourseByName(name);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<List<Course>> getCourseByTeacher(@PathVariable String id) {
        List<Course> courses = courseService.getAllCoursesByTeacher(id);
        return ResponseEntity.ok(courses);
    }


    @GetMapping("/schoolLevel/{schoolLevel}/subject/{subject}/term/{term}")
    public ResponseEntity<List<Course>> getCourseByTermAndSchoolLevelAndSubject(
        @PathVariable String schoolLevel,
        @PathVariable(required = false) String subject ,
        @PathVariable int term
    ) {
        List<Course> courses;
        if (subject == null && term == 0) {
            courses = courseService.getCourseBySchoolLevel(schoolLevel);
        } else  if (term == 0 ) {
            courses = courseService.getCourseBySchoolLevelAndSubject(schoolLevel, subject);
        }
        else if (subject == null) {
            courses = courseService.getCourseBySchoolLevelAndTerm(schoolLevel, term);
        } else {
            courses = courseService.getCourseBySchoolLevelAndSubjectAndTerm(schoolLevel, subject, term);
        }
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/teacher/{teacherId}/courses/count")
    public int getNumberOfCourses(@PathVariable String teacherId) {
        return courseService.numberOfCourses(teacherId);
    }


}
