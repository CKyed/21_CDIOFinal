package rest;

import data.*;
import dto.BrugerDTO;
import dto.RaavareBatchDTO;
import dto.RaavareDTO;

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

    @POST //TODO virker ikke pt
    @Produces(MediaType.TEXT_PLAIN)
    public Response addRaavareBatchJson(RaavareBatchDTO raavareBatchDTO) throws DALException {
        //TODO overvej om der skal være fejlfinding her - altså om man skal tjekke om brugeren allerede eksisterer
        raavareBatchDAO.createRaavareBatch(raavareBatchDTO);
        return Response.ok("Tilføjet").build();
    }

}