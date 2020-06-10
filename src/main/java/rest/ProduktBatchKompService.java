package rest;

import data.DALException;
import data.ProduktBatchKompDAO;
import dto.ProduktBatchKompDTO;
import data.iProduktBatchKompDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("produktbatchkomp")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class ProduktBatchKompService {

        iProduktBatchKompDAO produktBatchKopmDAO = new ProduktBatchKompDAO();

        @GET
        public List<ProduktBatchKompDTO> getRaavareBatchList() throws DALException {
            return null;
        }
}
