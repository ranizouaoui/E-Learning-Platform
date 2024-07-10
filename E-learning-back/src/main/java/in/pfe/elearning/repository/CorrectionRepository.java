package in.pfe.elearning.repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.pfe.elearning.entity.Correction;

@Repository
public interface CorrectionRepository extends MongoRepository<Correction, String> {
    
}
