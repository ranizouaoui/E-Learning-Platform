package in.pfe.elearning.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.pfe.elearning.entity.Meeting;
import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.services.EmailService;
import in.pfe.elearning.services.GroupClassService;
import in.pfe.elearning.services.ParentService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/meetings")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MeetingController {

    private final GroupClassService meetingService;
    private final EmailService emailService;
    private final ParentService parentService;

    @Autowired
    public MeetingController(GroupClassService meetingService , EmailService emailService, ParentService parentService) {
        this.meetingService = meetingService;
        this.emailService = emailService;
        this.parentService = parentService;
    }

    @GetMapping
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        List<Meeting> meetings = meetingService.getAllMeetings();
        return ResponseEntity.ok(meetings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable String id) {
        Meeting meeting = meetingService.getMeetingById(id).orElse(null);
        return ResponseEntity.ok(meeting);
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        Meeting createdMeeting = meetingService.createMeeting(meeting);
             // Send notification email to all users about the new meet created using the email service  
        String textbody = "تم إنشاء درس تدارك جديد بالاسم:  " + meeting.getName();
        List<Parent> parents = parentService.getAllParents();
        for (Parent parent : parents) {
            emailService.sendNotificationEmail(parent.getEmail(),textbody);
        }
        return ResponseEntity.ok(createdMeeting);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable String id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/teacher/{email}")
    public ResponseEntity<List<Meeting>> getAllMeetingforateacherBymail(@PathVariable String email) {
        List<Meeting> meetings = meetingService.getAllMeetings();
        List<Meeting> teacherMeetings = new ArrayList<>();
        for(Meeting meeting : meetings) {
            if(meeting.getTeacher() != null) {
                if (meeting.getTeacher().getEmail().equals(email)) {
                    teacherMeetings.add(meeting);
                }
            }
        }
        return ResponseEntity.ok(teacherMeetings);
    }
    @PutMapping("/start/{id}")
    public Void StartMeeting(@PathVariable String id) {
        Meeting meeting = meetingService.getMeetingById(id).orElse(null);
        meeting.setStatus("ongoing");
       meetingService.createMeeting(meeting);
        return null;

    }
    @GetMapping("/all")
    public ResponseEntity<List<Meeting>> getAvailablemeeting() {
        List<Meeting> meetings = meetingService.getAllMeetings();
        return ResponseEntity.ok(meetings);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updatemeeting(@PathVariable String id, @RequestBody Meeting meet) {

        Meeting updatemeeting = meetingService.updatemeeting(id,meet);
            // Send notification email to all users about the new meet created using the email service  
             String textbody = "تم تحديث درس التدارك بالاسم:  " + updatemeeting.getName();
            List<Parent> parents = parentService.getAllParents();
            for (Parent parent : parents) {
                emailService.sendNotificationEmail(parent.getEmail(),textbody);
            }
        return ResponseEntity.ok(updatemeeting);
    }

    @GetMapping("/count/{teacherId}")
    public int getNumberOfMeetings(@PathVariable String teacherId) {
        return meetingService.numberOfMeetings(teacherId);
    }

}
