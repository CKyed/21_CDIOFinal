package rest;

import data.DALException;
import data.ProduktBatchKompDAO;
import dto.ProduktBatchKompDTO;
import data.iProduktBatchKompDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("produktbatchkomp")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class ProduktBatchKompService {

        iProduktBatchKompDAO produktBatchKompDAO = new ProduktBatchKompDAO();

        // simply, gets all the produktbatchkomp.
        @GET
        public List<ProduktBatchKompDTO> getProduktBatchKompList() throws DALException {
            return produktBatchKompDAO.getProduktBatchKompList();
        }

        // Gets all produktbatchkomp with a specific pbId
        @GET
        @Path("{pbId}")
        public List<ProduktBatchKompDTO> getProduktBatchKompList(@PathParam("pbId") int pbId) throws DALException {
            return produktBatchKompDAO.getProduktBatchKompList(pbId);
        }

        @POST
        @Produces(MediaType.TEXT_PLAIN)
        @Consumes(MediaType.APPLICATION_JSON)
        public ProduktBatchKompDTO createProduktBatch(ProduktBatchKompDTO produktBatchKompDTO) throws DALException{
                produktBatchKompDAO.createProduktBatchKomp(produktBatchKompDTO);
                //TODO Den skal nok retunere noget andet en null
                return null;
        }
}
