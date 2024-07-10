package in.pfe.elearning.entity;

import java.time.LocalDate;
import java.util.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Progress {
    private LocalDate date;
    private int courseId;
    private int QuizScore;
    private List<Integer> chosenOptions;
}
