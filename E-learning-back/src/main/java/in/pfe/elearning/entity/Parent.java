package in.pfe.elearning.entity;

import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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
public class Parent extends User{
private List<Student> children;    
private String pincode;
private Boolean subscribed;
public Parent(String Firstname, String Lastname, String email, String password, LocalDate date_of_birth, List<Student> children, String pincode,String tel) {
    this.Firstname = Firstname;
    this.Lastname = Lastname;
    this.email = email;
    this.password = password;
    this.date_of_birth = date_of_birth;
    this.children = children;
    this.pincode = pincode;
    this.subscribed = false;
    this.tel=tel;
}
}
