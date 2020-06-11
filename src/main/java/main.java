import data.*;
import dto.*;

import java.util.ArrayList;
import java.util.List;

public class main {

    public static void main(String[] args) throws DALException {
        /*
        RaavareDTO raavareDTO = new RaavareDTO(10102121,"Tis","Tissemand");
        RaavareBatchDTO raavareBatchDTO = new RaavareBatchDTO(11113333,raavareDTO,2.0);
        RaavareBatchDTO raavareBatchDTO2 = new RaavareBatchDTO(11112222,raavareDTO,1.0);
        BrugerDTO bruger = new BrugerDTO(98,"Laborant","Yao Ming","YM","12312312");
        ProduktBatchKompDTO produktBatchKompDTO = new ProduktBatchKompDTO(raavareBatchDTO,4.4,2.2,bruger);
        ProduktBatchKompDTO produktBatchKompDTO2 = new ProduktBatchKompDTO(raavareBatchDTO2,4.0,2.0,bruger);
        ArrayList<ProduktBatchKompDTO> komponenter = new ArrayList<ProduktBatchKompDTO>();
        komponenter.add(produktBatchKompDTO);
        komponenter.add(produktBatchKompDTO2);
        ProduktBatchDTO produktBatchDTO = new ProduktBatchDTO(44433322,23695842,0,komponenter);


        ProduktBatchDAO pbd = new ProduktBatchDAO();
        pbd.createProduktBatch(produktBatchDTO);

         */
        ProduktBatchDAO pbd = new ProduktBatchDAO();
        List<ProduktBatchDTO> pbDTO = pbd.getProduktBatchList();


    }
}

