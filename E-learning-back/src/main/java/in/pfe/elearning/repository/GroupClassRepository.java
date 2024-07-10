package in.pfe.elearning.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import in.pfe.elearning.entity.GroupClass;

public interface GroupClassRepository extends MongoRepository<GroupClass, String> {

    void deleteById(String id);

   
}