package in.pfe.elearning.services;

import org.apache.commons.lang3.ObjectUtils.Null;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.Role;

import in.pfe.elearning.entity.Teacher;
import in.pfe.elearning.repository.TeacherRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> getAllTeachers() {
        List<Teacher> teachers  =  teacherRepository.findAll();
        teachers.removeIf(teacher -> !teacher.getRoles().get(0).getName().equals(Role.ERole.ROLE_TEACHER));
        return teachers;
        
    }

    public Teacher getTeacherByEmail(String id) {
        return teacherRepository.findByEmail(id);
    }

    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(String email, Teacher teacher) {
        if (teacherRepository.findByEmail(email) != null ) {
            teacher.setEmail(email);
            return teacherRepository.save(teacher);
        } else {
            throw new RuntimeException("Teacher not found with email: " + email);
        }
    }

    public void deleteTeacher(String id) {
        if (teacherRepository.existsByEmail(id)) {
            teacherRepository.deleteByEmail(id);
        } else {
            throw new RuntimeException("Teacher not found with id: " + id);
        }
    }

    public List<Teacher> getTeachersRequests(){
        return teacherRepository.findByIsTeacher(false);
    }

    public void approveTeacherRequest(String id){
       Optional<Teacher> teacherOptional = teacherRepository.findById(id);
        if (teacherOptional.isPresent()) {
            Teacher teacher = teacherOptional.get();
            teacher.setVerified(true);
            teacherRepository.save(teacher);
        } else {
            throw new RuntimeException("Teacher not found with id: " + id);
        }
    }

    

}
