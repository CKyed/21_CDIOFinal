package rest;

import data.DALException;
import data.ProduktBatchDAO;
import data.iProduktBatchDAO;
import dto.ProduktBatchDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


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

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createProduktBatchJson(ProduktBatchDTO produktBatchDTO) throws DALException {
        produktBatchDAO.createProduktBatch(produktBatchDTO);
        return Response.ok("Tilføjet").build();
    }

    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProduktBatchJson(ProduktBatchDTO produktBatchDTO) throws DALException {
        produktBatchDAO.updateProduktBatch(produktBatchDTO);
        return Response.ok("Opdateret").build();
    }


}
