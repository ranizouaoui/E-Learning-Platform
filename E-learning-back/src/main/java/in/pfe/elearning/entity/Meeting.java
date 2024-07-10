package in.pfe.elearning.entity;


import java.time.LocalDateTime;
import java.util.*;

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
@Document(collection="Meetings")
public class Meeting {
    @Id
    private String id;
    private String name;
    private String description;
    @DBRef
    private Teacher teacher;
    private LocalDateTime dateTime;
    private String status = "upcoming";
}
