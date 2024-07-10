package in.pfe.elearning.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.User;
import in.pfe.elearning.repository.TeacherRepository;
import in.pfe.elearning.repository.ParentRepository;

@Service
public class UserService {
    @Autowired
    private  ParentRepository parentRepository;
    @Autowired
    private TeacherRepository teacherRepository;

    public User findUserByEmail(String email) {
        Optional<Parent> user = parentRepository.findByEmail(email);
        if (user.isPresent()){
            User parent = user.get().toParent();
            return parent;
        }
       else {
            User teacher = teacherRepository.findByEmail(email).toTeacher();
            return teacher;
        }
    }
}
