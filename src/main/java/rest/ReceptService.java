package rest;

import data.DALException;
import data.ReceptDAO;
import data.iReceptDAO;
import dto.ReceptDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
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


}
