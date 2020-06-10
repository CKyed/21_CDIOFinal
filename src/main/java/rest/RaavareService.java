package rest;

import data.DALException;
import data.RaavareDAO;
import data.iRaavareDAO;
import dto.RaavareDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

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


}
