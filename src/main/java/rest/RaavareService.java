package rest;

import data.DALException;
import data.RaavareDAO;
import data.iRaavareDAO;
import dto.RaavareDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("raavare")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class RaavareService {
    iRaavareDAO raavareDAO = new RaavareDAO();

    @GET
    @Path("{id}")
    public RaavareDTO getRaavare(@PathParam("id") int id) throws DALException {
        return raavareDAO.getRaavare(id);
    }

    @GET
    public List<RaavareDTO> getRaavare() throws DALException {
        return raavareDAO.getRaavareList();
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createRaavareJson(RaavareDTO raavareDTO) throws DALException {
        raavareDAO.createRaavare(raavareDTO);
        return Response.ok("Tilføjet").build();
    }

    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateRaavareJson(RaavareDTO raavareDTO) throws DALException {
        raavareDAO.updateRaavare(raavareDTO);
        return Response.ok("Opdateret").build();

    }
}
