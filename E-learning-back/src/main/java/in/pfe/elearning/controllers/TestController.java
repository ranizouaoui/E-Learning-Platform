package in.pfe.elearning.controllers;

import in.pfe.elearning.entity.Meeting;
import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.Test;
import in.pfe.elearning.services.EmailService;
import in.pfe.elearning.services.ParentService;
import in.pfe.elearning.services.TestService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/tests")
public class TestController {
    private final ParentService parentService;
    private final EmailService emailService;
    private final TestService testService;

    @Autowired
    public TestController(TestService testService , EmailService emailService, ParentService parentService) {
        this.testService = testService;
        this.emailService = emailService;
        this.parentService = parentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable String id) {
        return testService.getTestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody Test test) throws URISyntaxException {
        Test createdTest = testService.createTest(test);
             String textbody = "تم إنشاء اختبار جديد بالاسم:  " + createdTest.getName();
        List<Parent> parents = parentService.getAllParents();
        for (Parent parent : parents) {
            emailService.sendNotificationEmail(parent.getEmail(),textbody);
        }
        return ResponseEntity.created(new URI("/api/tests/" + createdTest.getId())).body(createdTest);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> updateTestAdmin(@PathVariable String id, @RequestBody Test test) {
        Test updatedTest = testService.updateTestAdmin(id, test);
        return ResponseEntity.ok(updatedTest);
    }

    @PutMapping("/testId/{id}/teacherId{teacherId}")
    public ResponseEntity<Test> updateTest(@PathVariable String testId, @PathVariable String teachetId, @RequestBody Test test) {
        Test updatedTest = testService.updateTest(testId,teachetId, test);
        return ResponseEntity.ok(updatedTest);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTestAdmin(@PathVariable String id) {
        testService.deleteTestAdmin(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/testId/{testId}/teacherID/{teacherId}")
    public ResponseEntity<?> deleteTest(@PathVariable String testId , @PathVariable String teacherId) {
        testService.deleteTest(testId,teacherId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return ResponseEntity.ok(tests);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllTests() {
        testService.deleteAllTests();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/schoolLevel/{schoolLevel}/subject/{subject}/term/{term}")
    public ResponseEntity<?> getTestBySchoolLevelAndSectionAndSubject(
        @PathVariable String schoolLevel, 
        @PathVariable(required = false) String subject ,
        @PathVariable int term)  {
            List<Test> tests;
            if (subject == null && term == 0) {
                tests = testService.getTestBySchoolLevel(schoolLevel);
            } else  if (term == 0 ) {
                tests = testService.getTesteBySchoolLevelAndSubject(schoolLevel, subject);
            }
            else if (subject == null) {
                tests = testService.getTestBySchoolLevelAndTerm(schoolLevel, term);
            } else {
                tests = testService.getTestBySchoolLevelAndSubjectAndTerm(schoolLevel, subject, term);
            } 
            return ResponseEntity.ok(tests);

    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Test>> getTestsByTeacher(@PathVariable String teacherId) {
        List<Test> tests = testService.getTestsByTeacherId(teacherId);
        return ResponseEntity.ok(tests);
    }


}
