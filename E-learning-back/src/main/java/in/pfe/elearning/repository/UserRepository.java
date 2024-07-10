package in.pfe.elearning.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import in.pfe.elearning.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

}