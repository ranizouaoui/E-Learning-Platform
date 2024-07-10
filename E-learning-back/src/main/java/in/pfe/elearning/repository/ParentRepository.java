package in.pfe.elearning.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import in.pfe.elearning.entity.Parent;
import in.pfe.elearning.entity.User;

public interface ParentRepository extends MongoRepository<Parent, String> {

    Optional<Parent> findByEmail(String email);

    void deleteByEmail(String id);

    List<Parent> findTop5ByOrderByIdDesc();

}
