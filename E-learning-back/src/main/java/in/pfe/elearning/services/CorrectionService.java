
package in.pfe.elearning.services;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.pfe.elearning.entity.Correction;
import in.pfe.elearning.repository.CorrectionRepository;

import java.util.List;

@Service
public class CorrectionService {

    private final CorrectionRepository correctionRepository;

    @Autowired
    public CorrectionService(CorrectionRepository correctionRepository) {
        this.correctionRepository = correctionRepository;
    }

    public Correction saveCorrection(Correction correction) {
        correction.setId(new ObjectId().toString());
        return correctionRepository.save(correction);
    }

    public List<Correction> getAllCorrections() {
        return correctionRepository.findAll();
    }

    public Correction getCorrectionById(String id) {
        return correctionRepository.findById(id).orElseThrow(() -> new RuntimeException("Correction not found with id: " + id));
    }

    public Correction updateCorrection(String id, Correction correction) {
        correction.setId(id);
        return correctionRepository.save(correction);
    }

    public void deleteCorrection(String id) {
        correctionRepository.deleteById(id);
    }
}