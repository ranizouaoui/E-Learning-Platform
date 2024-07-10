package in.pfe.elearning.entity;

import java.time.LocalDate;
import java.util.*;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection="Courses")
public class Course {
    @Id
    private String id;
    private String video_url;
    private String pdf_url; 
    private String name;
    private String term;
    @DBRef
    private Teacher teacher;
    private String schoolLevel;
    private String subject;
    private LocalDate date_of_addition;
    private List<Quiz> quizzes;
}
