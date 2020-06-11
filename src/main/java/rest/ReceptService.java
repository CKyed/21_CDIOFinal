package rest;

import data.DALException;
import data.ReceptDAO;
import data.iReceptDAO;
import dto.ReceptDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("recept")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ReceptService {
    iReceptDAO receptDAO = new ReceptDAO();

    @GET
    public List<ReceptDTO> getReceptList() throws DALException {
        return receptDAO.getReceptList();

    }

    @GET
    @Path("{id}")
    public ReceptDTO getRecept(@PathParam("id") int id) throws DALException{
        return receptDAO.getRecept(id);
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createReceptJson(ReceptDTO receptDTO)throws DALException {
        receptDAO.createRecept(receptDTO);
        return Response.ok("Tilføjet").build();
    }

    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateReceptJson(ReceptDTO receptDTO)throws DALException {
        receptDAO.updateRecept(receptDTO);
        return Response.ok("Opdateret").build();
    }

}
