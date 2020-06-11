package rest;

import data.*;
import dto.ProduktBatchDTO;
import dto.RaavareBatchDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    public RaavareBatchDTO getRaavareBatch(@PathParam("id") int id) throws DALException {
        return raavareBatchDAO.getRaavareBatch(id);
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public Response addRaavareBatchJson(RaavareBatchDTO raavareBatchDTO) throws DALException {
        raavareBatchDAO.createRaavareBatch(raavareBatchDTO);
        return Response.ok("Tilføjet").build();
    }

    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateRaavareBatchJson(RaavareBatchDTO raavareBatchDTO) throws DALException {
        raavareBatchDAO.updateRaavareBatch(raavareBatchDTO);
        return Response.ok("Opdateret").build();
    }

}