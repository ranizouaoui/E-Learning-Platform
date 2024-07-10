package in.pfe.elearning.controllers;

import in.pfe.elearning.entity.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.pfe.elearning.entity.GroupClass;
import in.pfe.elearning.services.GroupClassService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/group-classes")
public class GroupClassController {

    private final GroupClassService groupClassService;

    @Autowired
    public GroupClassController(GroupClassService groupClassService) {
        this.groupClassService = groupClassService;
    }

    @GetMapping
    public ResponseEntity<List<GroupClass>> getAllGroupClasses() {
        List<GroupClass> groupClasses = groupClassService.getAllGroupClasses();
        return ResponseEntity.ok(groupClasses);
    }



    @GetMapping("/{id}")
    public ResponseEntity<GroupClass> getGroupClassById(@PathVariable String id) {
        Optional<GroupClass> groupClass = groupClassService.getGroupClassById(id);
        return groupClass.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


}
