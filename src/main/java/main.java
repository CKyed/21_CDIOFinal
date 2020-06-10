import data.BrugerDAO;
import data.DALException;
import data.ProduktBatchKompDAO;
import data.RaavareBatchDAO;
import dto.BrugerDTO;
import dto.ProduktBatchKompDTO;
import dto.RaavareBatchDTO;

import java.util.List;

public class main {

    public static void main(String[] args) throws DALException {
        ProduktBatchKompDAO produktBatchKompDAO = new ProduktBatchKompDAO();
        List<ProduktBatchKompDTO> x = produktBatchKompDAO.getProduktBatchKompList();


    }
}

