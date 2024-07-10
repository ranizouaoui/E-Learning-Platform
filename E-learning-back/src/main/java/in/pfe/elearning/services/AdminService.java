package in.pfe.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.Role;
import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.entity.Test;
import in.pfe.elearning.repository.CorrectionRepository;
import in.pfe.elearning.repository.CourseRepository;
import in.pfe.elearning.repository.ParentRepository;
import in.pfe.elearning.repository.TeacherRepository;
import in.pfe.elearning.repository.TestRepository;

@Service
public class AdminService {
private final CourseRepository courseRepository;
private final TeacherRepository teacherRepository;
private final ParentRepository parentRepository;
private final TestRepository testRepository;


    @Autowired
    public AdminService(CourseRepository courseRepository, TeacherRepository teacherRepository, ParentRepository parentRepository , TestRepository testRepository) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
        this.parentRepository = parentRepository;
        this.testRepository = testRepository;
    }

    public int numberOfCourses() {
        return courseRepository.findAll().size();
    }

    public int numberOfTeachers() {

        List<Teacher> teachers =teacherRepository.findAll();
         teachers.removeIf(teacher -> !teacher.getRoles().get(0).getName().equals(Role.ERole.ROLE_TEACHER));
        return teachers.size();
    }

    public int numberOfParents() {
        List<Parent> parents = parentRepository.findAll();
        parents.removeIf(parent -> !parent.getRoles().get(0).getName().equals(Role.ERole.ROLE_PARENT));
        return parents.size();
    }

    public int numberOfTests() {
        return testRepository.findAll().size();
    }

    public int numberOfChildren(){
       List<Parent> parents = parentRepository.findAll();
         int children = 0;
            for (Parent parent : parents) {
                children += parent.getChildren().size();
            }
        return children;
    }

    public List<Parent> getLast5Parents() {
        List<Parent> parents = parentRepository.findTop5ByOrderByIdDesc();
        parents.removeIf(parent -> !parent.getRoles().get(0).getName().equals(Role.ERole.ROLE_PARENT));
        return parents;
    }

    public List<Teacher> getLast5Teachers() {
        List<Teacher> teachers= teacherRepository.findTop5ByOrderByIdDesc();
        teachers.removeIf(teacher -> !teacher.getRoles().get(0).getName().equals(Role.ERole.ROLE_TEACHER));
        return teachers;
    }

}
