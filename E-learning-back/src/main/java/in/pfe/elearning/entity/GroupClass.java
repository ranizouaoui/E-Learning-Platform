package in.pfe.elearning.entity;

import java.time.LocalTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="GroupClasses")
public class GroupClass {
@Id
private String id;
private String teacher_id;
private String subject;
private String school_level;
private int dayId;
private LocalTime start_time;
private LocalTime end_time; 
}
