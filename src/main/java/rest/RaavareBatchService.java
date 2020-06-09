package rest;

import data.*;
import dto.RaavareBatchDTO;
import dto.RaavareDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("raavarebatch")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class RaavareBatchService {
    iRaavareBatchDAO raavareBatchDAO = new RaavareBatchDAO();

    @GET //TODO Det her virker ikke pt
    @Path("{id}")
    public RaavareBatchDTO getUser(@PathParam("id") int id) throws DALException {
        return raavareBatchDAO.getRaavareBatch(id);
    }

}