package rest;

import data.*;
import dto.BrugerDTO;
import dto.RaavareBatchDTO;
import dto.RaavareDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("raavarebatch")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class RaavareBatchService {
    iRaavareBatchDAO raavareBatchDAO = new RaavareBatchDAO();

    @GET
    public List<RaavareBatchDTO> getRaavareBatchList() throws DALException {
        return raavareBatchDAO.getRaavareBatchList();
    }

    @GET
    @Path("{id}")
    public RaavareBatchDTO getUser(@PathParam("id") int id) throws DALException {
        return raavareBatchDAO.getRaavareBatch(id);
    }

}