package rest;

import data.DALException;
import data.ProduktBatchDAO;
import data.iProduktBatchDAO;
import dto.ProduktBatchDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Path("produktbatch")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class ProduktBatchService {
    iProduktBatchDAO produktBatchDAO = new ProduktBatchDAO();

    @GET
    @Path("{id}")
    public ProduktBatchDTO getProduktbatch(@PathParam("id") int id) throws DALException{
        return produktBatchDAO.getProduktBatch(id);
    }


}
