package data;

import dto.ProduktBatchKompDTO;

import java.util.List;

public interface iProduktBatchKompDAO {
    ProduktBatchKompDTO getProduktBatchKomp(int pbId, int rbId) throws DALException;
    List<ProduktBatchKompDTO> getProduktBatchKompList(int pbId) throws DALException;
    List<ProduktBatchKompDTO> getProduktBatchKompList() throws DALException;
    void createProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException;
    void updateProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException;
}
