package data;
import dto.BrugerDTO;
import java.util.List;

public interface iBrugerDAO {
    BrugerDTO getBruger(int oprId) throws DALException;
    List<BrugerDTO> getBrugerList() throws DALException;
    void createBruger(BrugerDTO opr) throws DALException;
    void updateBruger(BrugerDTO opr) throws DALException;
}
