package data;

import dto.ProduktBatchDTO;
import dto.ProduktBatchKompDTO;
import dto.RaavareBatchDTO;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

// Anthony laver denne klasse

public class ProduktBatchKompDAO implements iProduktBatchKompDAO{


    @Override
    public ProduktBatchKompDTO getProduktBatchKomp(int pbId, int rbId) throws DALException {
        return null;
    }

    @Override
    public List<ProduktBatchKompDTO> getProduktBatchKompList(int pbId) throws DALException {
        return null;
    }

    @Override
    public List<ProduktBatchKompDTO> getProduktBatchKompList() throws DALException {
        return null;
    }

    @Override
    public void createProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException {

    }

    @Override
    public void updateProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException {

    }
}
