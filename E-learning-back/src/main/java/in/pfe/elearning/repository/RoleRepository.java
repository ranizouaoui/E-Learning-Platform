package in.pfe.elearning.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import in.pfe.elearning.entity.Role;
import in.pfe.elearning.entity.Role.ERole;


public interface RoleRepository extends MongoRepository<Role, ObjectId> {
  Optional<Role> findByName(ERole name);
}
