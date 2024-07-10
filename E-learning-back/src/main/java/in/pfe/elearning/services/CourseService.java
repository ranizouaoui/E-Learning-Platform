package in.pfe.elearning.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import in.pfe.elearning.entity.Course;
import in.pfe.elearning.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
  

    @Autowired
    public CourseService(CourseRepository courseRepository , EmailService emailService) {
        this.courseRepository = courseRepository;

    }



    public Optional<Course> getCourseById(String id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course) {
        course.setId(new ObjectId().toString());
    
        return courseRepository.save(course);
    }

    public Course updateCourse(String id, Course course) {
        if (courseRepository.existsById(id)) {
            course.setId(id);
            return courseRepository.save(course);
        } else {
            throw new RuntimeException("Course not found with id: " + id);
        }
    }

    public void deleteCourse(String id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Course not found with id: " + id);
        }
    }

    public Optional<Course> getCourseByName(String name) {
  
        return courseRepository.findByName(name);
    }

    public List<Course> getCourseBySchoolLevelAndSubjectAndTerm(String schoolLevel , String subject, int term) {
        return courseRepository.findBySchoolLevelAndSubjectAndTerm(schoolLevel,  subject, term);
    }

    public List<Course> getCourseBySchoolLevelAndSubject(String schoolLevel , String subject) {
        return courseRepository.findBySchoolLevelAndSubject(schoolLevel,  subject);
    }

    public List<Course> getCourseBySchoolLevelAndTerm(String schoolLevel , int term) {
        return courseRepository.findBySchoolLevelAndTerm(schoolLevel,  term);
    }

    public List<Course> getCourseBySchoolLevel(String schoolLevel) {
        return courseRepository.findBySchoolLevel(schoolLevel);
    }

    public Page<Course> getAllCourses(Pageable paging) {
        return courseRepository.findAll(paging);
    }

    public List<Course> getAllCoursesByTeacher(String teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

    public int numberOfCourses(String teacherID) {
        return courseRepository.findByTeacherId(teacherID).size();
    }

}
