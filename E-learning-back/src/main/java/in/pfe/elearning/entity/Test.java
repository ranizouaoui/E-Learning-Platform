package in.pfe.elearning.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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
@Document(collection="Tests")
public class Test {
    @Id
    private String id;
    private String name;
    private String pdf_url;
    private String description;
    private String schoolLevel;
    private String difficulty;
    private String subject;
    private String duration;
    @DBRef
    private Teacher teacher;

    private String correction_pdf_url;
    private String term;
}
