package in.pfe.elearning.repository;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.pfe.elearning.entity.Course;
import in.pfe.elearning.entity.Teacher;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {

    Optional<Course> findByName(String name);

    List<Course> findByTeacherId(String teacherId);


    List<Course> findByTeacherId(ObjectId teacherId);

    List<Course> findBySchoolLevelAndSubject(String schoolLevel, String subject);

    List<Course> findBySchoolLevelAndSubjectAndTerm(String schoolLevel, String subject, int term);

    List<Course> findBySchoolLevelAndTerm(String schoolLevel, int term);

    List<Course> findBySchoolLevel(String schoolLevel);


    boolean existsById(String id);


    void deleteById(String id);


    Optional<Course> findById(String id);
}
