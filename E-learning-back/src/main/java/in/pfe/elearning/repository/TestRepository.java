package in.pfe.elearning.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.entity.Test;

public interface TestRepository extends MongoRepository<Test, String> {

    Optional<Test> findByName(String name);
    List<Test> findByTeacher(Teacher teacher);
    List<Test> findBySchoolLevelAndSubjectAndTerm(String schoolLevel, String subject, int term);
    List<Test> findBySchoolLevelAndSubject(String schoolLevel, String subject);
    List<Test> findBySchoolLevelAndTerm(String schoolLevel, int term);
    List<Test> findBySchoolLevel(String schoolLevel);
    boolean existsById(String idTest);
    Optional<Test> findById(String idTest);
    List<Test> findByTeacherId(String teacherId);


}
