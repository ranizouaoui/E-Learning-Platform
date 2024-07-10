package in.pfe.elearning.entity;

import java.time.LocalDate;
import java.util.List;

import javax.security.auth.Subject;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection="Users")
public class Teacher extends User {
    public String getTeacherverification() {
        return teacherverification;
    }

    public void setTeacherverification(String teacherverification) {
        this.teacherverification = teacherverification;
    }

    private List<Subject> subjects;
    private Boolean isTeacher = false;
    private String  teacherverification;

    public Teacher(String Firstname, String Lastname, String email, String password, LocalDate date , List<Subject> subjects,String teacherverification) {
        this.Firstname = Firstname;
        this.Lastname = Lastname;
        this.email = email;
        this.password = password;
        this.date_of_birth = date;
        this.subjects = subjects;
        this.teacherverification=teacherverification;
    }

    public void addSubject(Subject subject) {
        this.subjects.add(subject);
    }
}