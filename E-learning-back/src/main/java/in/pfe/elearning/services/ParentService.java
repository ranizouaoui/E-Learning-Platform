package in.pfe.elearning.services;

import in.pfe.elearning.entity.Teacher;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.Role;
import in.pfe.elearning.entity.Student;
import in.pfe.elearning.repository.ParentRepository;


import java.util.List;
import java.util.Optional;

@Service
public class ParentService {
    private final ParentRepository parentRepository;

    @Autowired
    public ParentService(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    // Method to retrieve all Parents
    public List<Parent> getAllParents() {

            List<Parent> parents = parentRepository.findAll();
        parents.removeIf(parent -> !parent.getRoles().get(0).getName().equals(Role.ERole.ROLE_PARENT));
        return parents;
    }

    // Method to retrieve a Parent by ID
    public Optional<Parent> getParentByEmail(String id) {
        return parentRepository.findByEmail(id);
    }

    // Method to delete a Parent by ID
    public void deleteParentByEmail(String id) {
        parentRepository.deleteByEmail(id);
    }

    // Method to delete all Parents
    public void deleteAllParent() {
        parentRepository.deleteAll();
    }

    // Method to add Student
    public void addStudent(String email , Student student){
        Optional<Parent> parentOptional = parentRepository.findByEmail(email);
        if (parentOptional.isPresent()) {
            Parent parent = parentOptional.get();
            List<Student> students = parent.getChildren();
            if (students.isEmpty()) {
                student.setId(1);
            } else {
                student.setId(students.get(students.size() - 1).getId() + 1);
            }
            students.add(student);
            parent.setChildren(students);
            parentRepository.save(parent);
    }
}

    // Method to remove Student
    public void removeStudent(String parentEmail , int studentId){
        Optional<Parent> parentOptional = parentRepository.findByEmail(parentEmail);
        if (parentOptional.isPresent()) {
            Parent parent = parentOptional.get();
            List<Student> students = parent.getChildren();
            students.removeIf(student -> student.getId() == studentId);
            parent.setChildren(students);
            parentRepository.save(parent);
        }      
    }

    // Method to update Student
    public void updateStudent(String parentEmail , int studentId , Student student){
        Optional<Parent> parentOptional = parentRepository.findByEmail(parentEmail);
        if (parentOptional.isPresent()) {
            Parent parent = parentOptional.get();
            List<Student> students = parent.getChildren();
            students.removeIf(student1 -> student1.getId() == studentId);
            students.add(student);
            parent.setChildren(students);
            parentRepository.save(parent);
        }
    }

    public List<Parent> getAllSubscribedParents(){
        List<Parent> parents = parentRepository.findAll();
        parents.removeIf(parent -> parent.getSubscribed() == false);
        return parents;
    }
    public void upgradeparentaccount(String id){
        Optional<Parent> teacherOptional = parentRepository.findById(id);
        if (teacherOptional.isPresent()) {
            Parent teacher = teacherOptional.get();
            teacher.setSubscribed(true);
            parentRepository.save(teacher);
        } else {
            throw new RuntimeException("Teacher not found with id: " + id);
        }
    }

}
