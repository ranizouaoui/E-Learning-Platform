package in.pfe.elearning.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.entity.Test;
import in.pfe.elearning.repository.TestRepository;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

@Service
public class TestService {

    private final TestRepository testRepository;

    @Autowired
    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public Optional<Test> getTestById(String id) {
        return testRepository.findById(id);
    }

    public Test createTest(Test test) {
        test.setId(new ObjectId().toString());
        return testRepository.save(test);
    }

    public Test updateTest(String idTest, String idTeacher, Test test ) {
        if (testRepository.existsById(idTest) ) {
            Test test1= testRepository.findById(idTest).get();
            if (test1.getTeacher().getId()== idTeacher){

            test.setId(idTest);
            return testRepository.save(test);}
            else{
                throw new RuntimeException("Only the teacher who created this course can delete it");
            }
        } else {
            throw new RuntimeException("Test not found with id: " + idTest);
        }
    }

    public Test updateTestAdmin(String idTest, Test test)
    {
        if (testRepository.existsById(idTest) ) {
            test.setId(idTest);
            return testRepository.save(test);
        }
        else {
            throw new RuntimeException("Test not found with id: " + idTest);
        }
    }

    public void deleteTestAdmin(String id) {
        if (testRepository.existsById(id)) {
            testRepository.deleteById(id);
        } else {
            throw new RuntimeException("Test not found with id: " + id);
        }
    }

    public void deleteTest(String idTest , String idTeacher){
        if (testRepository.existsById(idTest) ) {
            Test test1= testRepository.findById(idTest).get();
            if (test1.getTeacher().getId()== idTeacher){
                testRepository.deleteById(idTest);
            }
            else{throw new RuntimeException("Only the teacher who created this Test who can delete it");}

        } else {
            throw new RuntimeException("Test not found with id: " + idTest);
        }

}

    public Optional<Test> getTestByName(String name) {
        return testRepository.findByName(name);
    }

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }


    public List<Test> getTestsByTeacherId(String teacherId) {
        return testRepository.findByTeacherId(teacherId);
    }

    public void deleteAllTests() {
        testRepository.deleteAll();
    }

    public List<Test> getTestBySchoolLevelAndSubjectAndTerm(String schoolLevel , String subject, int term) {
        return testRepository.findBySchoolLevelAndSubjectAndTerm(schoolLevel,  subject, term);
    }

    public List<Test> getTesteBySchoolLevelAndSubject(String schoolLevel , String subject) {
        return testRepository.findBySchoolLevelAndSubject(schoolLevel,  subject);
    }

    public List<Test> getTestBySchoolLevelAndTerm(String schoolLevel , int term) {
        return testRepository.findBySchoolLevelAndTerm(schoolLevel,  term);
    }

    public List<Test> getTestBySchoolLevel(String schoolLevel) {
        return testRepository.findBySchoolLevel(schoolLevel);
    }

    public List<Test> getTestByTeacher(String teacherId) {
        return testRepository.findByTeacherId(teacherId);
    }
}
