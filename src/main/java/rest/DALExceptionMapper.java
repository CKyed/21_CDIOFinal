package rest;

import data.DALException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class DALExceptionMapper implements ExceptionMapper<DALException> {

    @Override
    public Response toResponse(DALException exception) {
        return Response
                .status(Response.Status.NOT_FOUND) //404
                .entity(exception.getMessage())
                .type(MediaType.TEXT_PLAIN)
                .build();
    }
}

//entity kan sende objekter også, som kan formateres som JSON.