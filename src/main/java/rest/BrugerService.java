package rest;

import data.BrugerDAO;
import data.DALException;
import data.iBrugerDAO;
import dto.BrugerDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unused")
@Path("bruger")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class BrugerService {
    iBrugerDAO brugerDAO = new BrugerDAO();

    @GET
    public List<BrugerDTO> getBrugerList() throws DALException {
        return brugerDAO.getBrugerList();
    }

    @GET
    @Path("{id}")
    public BrugerDTO getBruger(@PathParam("id") int id) throws DALException {
        return brugerDAO.getBruger(id);
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createBrugerJson(BrugerDTO brugerDTO) throws DALException {
        brugerDAO.createBruger(brugerDTO);
        return Response.ok("Tilføjet").build();
    }



}
