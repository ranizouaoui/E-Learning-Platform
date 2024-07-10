package in.pfe.elearning.services;

import in.pfe.elearning.entity.Course;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.GroupClass;
import in.pfe.elearning.entity.Meeting;
import in.pfe.elearning.repository.GroupClassRepository;
import in.pfe.elearning.repository.MeetingRepository;

import java.time.LocalDateTime;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupClassService {

    @Autowired
    private final GroupClassRepository groupClassRepository;
    @Autowired
    private final MeetingRepository meetingRepository;

    public GroupClassService(GroupClassRepository groupClassRepository, MeetingRepository meetingRepository) {
        this.groupClassRepository = groupClassRepository;
        this.meetingRepository = meetingRepository;
    }

    public List<GroupClass> getAllGroupClasses() {
        return groupClassRepository.findAll();
    }

    public Optional<GroupClass> getGroupClassById(String id) {
        return groupClassRepository.findById(id);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> getMeetingById(String id) {
        return meetingRepository.findById(id);
    }

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }
    public Optional<Meeting>GetMeetingByTreacherEmail(String email){
        List<Meeting> meetings = meetingRepository.findAll();
        for(Meeting meeting : meetings) {
            if (meeting.getTeacher().getEmail().equals(email)) {
                return Optional.of(meeting);
            }

        }
        return Optional.empty();
    }

    public void deleteMeeting(String id) {
        meetingRepository.deleteById(id);
    }

    public Meeting updatemeeting(String id, Meeting meeting) {
        if (meetingRepository.existsById(id)) {
            meeting.setId(id);
            return meetingRepository.save(meeting);
        } else {
            throw new RuntimeException("Course not found with id: " + id);
        }
    }

    public int numberOfMeetings(String teacherID) {
        List<Meeting> meetings = meetingRepository.findAll();
        meetings.removeIf(meeting -> !meeting.getTeacher().getId().equals(teacherID));
        return meetings.size();
        
    }

}
