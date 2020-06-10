import data.BrugerDAO;
import data.DALException;
import data.ProduktBatchKompDAO;
import data.RaavareBatchDAO;
import dto.BrugerDTO;
import dto.RaavareBatchDTO;

public class main {

    public static void main(String[] args) throws DALException {
        ProduktBatchKompDAO produktBatchKompDAO = new ProduktBatchKompDAO();
        produktBatchKompDAO.getProduktBatchKomp(51268945,75386425);


    }
}

