package in.pfe.elearning.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.pfe.elearning.entity.Correction;
import in.pfe.elearning.services.CorrectionService;

import java.util.List;

@RestController
@RequestMapping("/corrections")
public class CorrectionController {

    private final CorrectionService correctionService;

    @Autowired
    public CorrectionController(CorrectionService correctionService) {
        this.correctionService = correctionService;
    }

    @PostMapping
    public ResponseEntity<Correction> createCorrection(@RequestBody Correction correction) {
        Correction createdCorrection = correctionService.saveCorrection(correction);
        return new ResponseEntity<>(createdCorrection, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Correction>> getAllCorrections() {
        List<Correction> corrections = correctionService.getAllCorrections();
        return new ResponseEntity<>(corrections, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Correction> getCorrectionById(@PathVariable String id) {
        Correction correction = correctionService.getCorrectionById(id);
        return new ResponseEntity<>(correction, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Correction> updateCorrection(@PathVariable String id, @RequestBody Correction correction) {
        Correction updatedCorrection = correctionService.updateCorrection(id, correction);
        return new ResponseEntity<>(updatedCorrection, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCorrection(@PathVariable String id) {
        correctionService.deleteCorrection(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}