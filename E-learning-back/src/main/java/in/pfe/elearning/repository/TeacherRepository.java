package in.pfe.elearning.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.entity.User;

public interface TeacherRepository extends MongoRepository<Teacher, String> {

Teacher findByEmail(String email);
Optional<Teacher> findById(String id);
List<Teacher> findByIsTeacher(boolean b);

boolean existsByEmail(String id);

void deleteByEmail(String id);
List<Teacher> findTop5ByOrderByIdDesc();

}
