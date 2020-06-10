import data.BrugerDAO;
import data.DALException;
import data.RaavareBatchDAO;
import data.ReceptKompDAO;
import dto.BrugerDTO;
import dto.RaavareBatchDTO;
import dto.RaavareDTO;

public class main {

    public static void main(String[] args) throws DALException {
        BrugerDAO brugerDAO = new BrugerDAO();
       // brugerDAO.getBruger(001);
        brugerDAO.getBruger(003);

    }


}
