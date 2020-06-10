import data.BrugerDAO;
import data.DALException;
import data.RaavareBatchDAO;
import dto.BrugerDTO;
import dto.RaavareBatchDTO;

public class main {

    public static void main(String[] args) throws DALException {
        BrugerDAO brugerDAO = new BrugerDAO();
       // brugerDAO.getBruger(001);
        brugerDAO.getBruger(003);

        BrugerDTO test = new BrugerDTO(10,"Laborant","Peter","PR","1234567890");
        brugerDAO.createBruger(test);
    }
    //Oprettet for at mappestrukturen kommer på git

}
