package data;

import dto.ProduktBatchDTO;
import java.util.List;

public interface iProduktBatchDAO {
    ProduktBatchDTO getProduktBatch(int pbId) throws DALException;
    List<ProduktBatchDTO> getProduktBatchList() throws DALException;
    void createProduktBatch(ProduktBatchDTO produktbatch) throws DALException;
    void updateProduktBatch(ProduktBatchDTO produktbatch) throws DALException;
}

