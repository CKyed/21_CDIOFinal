package rest;

import data.*;
import dto.ReceptKompDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("receptkomp")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class ReceptKompService {
    iReceptKompDAO receptKompDAO = new ReceptKompDAO();

    @GET
    public List<ReceptKompDTO> getReceptKompList() throws DALException{
        return receptKompDAO.getReceptKompList();

    }

    @GET
    @Path("{id}")
    public List<ReceptKompDTO> getReceptKompList(@PathParam("id") int id) throws DALException{
        return receptKompDAO.getReceptKompList(id);

    }

}
