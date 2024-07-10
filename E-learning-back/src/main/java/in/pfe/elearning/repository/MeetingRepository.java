package in.pfe.elearning.repository;


import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import in.pfe.elearning.entity.Meeting;

public interface MeetingRepository extends MongoRepository<Meeting, String> {

    public Optional<Meeting> findMeetingByTeacher(String email);





}
