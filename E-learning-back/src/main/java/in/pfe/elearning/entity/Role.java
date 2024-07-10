package in.pfe.elearning.entity;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
@Document(collection = "Roles")
public class Role {
    @Id
    private ObjectId id;
    private ERole name;

    public Role() {

    }
    public Role(ERole name) {
      this.name = name;
    }
    
  
    public ERole getName() {
      return name;
    }
  
    public void setName(ERole name) {
      this.name = name;
    }

    public enum ERole {
        ROLE_PARENT ,
        ROLE_TEACHER,
        ROLE_ADMIN
      }
      
}


