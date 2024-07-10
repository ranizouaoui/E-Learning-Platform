package in.pfe.elearning.payload.request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String firstname;
    @NotBlank
    @Size(min = 3, max = 20)
    private String lastname;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;


    private LocalDate date_of_birth;
    private String teacherverification;
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    private String tel;

    public LocalDate getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_Of_Birth(LocalDate dateOfBirth) {
        this.date_of_birth = dateOfBirth;
    }

    public void setTel(String tel){
        this.tel=tel;
    }
    public String getTel(){
        return tel;
    }

  
    public String getFirstname() {
        return firstname;
    }
 
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }
 
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRoles() {
      return this.roles;
    }
    
    public void setRole(Set<String> roles) {
      this.roles = roles;
    }

    public void setTeacherverification(String teacherverification){
        this.teacherverification=teacherverification;
    }
    public String getTeacherverification()
    {
        return this.teacherverification;
    }
}
