package in.pfe.elearning.entity;

import org.springframework.data.annotation.Id;

import java.util.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

@Id
private int id;
private String Firstname;
private String Lastname;
private String school_level;
private List<Progress> progress;
private List<String> groupClasses;
}
