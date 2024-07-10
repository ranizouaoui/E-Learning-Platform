package in.pfe.elearning.entity;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.security.auth.Subject;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Document(collection="Users")
public class User {
    @Id
    protected String id;
    protected String Firstname;
    protected String Lastname;

    @Indexed(unique = true)
    protected String email;
    protected String password;
    protected String tel;
    @DBRef
    protected List<Role> roles;
    protected LocalDate date_of_birth;
    private Boolean verified=false;

    
    public User(String Firstname, String Lastname, String email, String password, LocalDate date_of_birth,String tel) {
        this.Firstname = Firstname;
        this.Lastname = Lastname;
        this.email = email;
        this.password = password;
        this.date_of_birth = date_of_birth;
        this.tel=tel;
    }


    public Parent toParent() {
        List<Student> children = new ArrayList<>();
        return new Parent(this.Firstname, this.Lastname, this.email, this.password, this.date_of_birth , children, "",this.tel);
    }


    public Teacher toTeacher() {
        List<Subject> subjects = new ArrayList<>();
        String teacherverification="";
        return new Teacher(this.Firstname, this.Lastname, this.email, this.password, this.date_of_birth, subjects,teacherverification);
        
    }
}
