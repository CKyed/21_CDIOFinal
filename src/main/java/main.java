import data.*;
import dto.*;

import java.util.ArrayList;
import java.util.List;

public class main {

    public static void main(String[] args) throws DALException {
        BrugerDTO brugerDTO = new BrugerDTO(505,"Laborant","Tim","TT","1111111111",1);
        BrugerDAO brugerDAO = new BrugerDAO();
        brugerDAO.getBrugerList();


        brugerDAO.createBruger(brugerDTO);
        brugerDTO.setAktiv(0);
        brugerDAO.updateBruger(brugerDTO);
    }
}

