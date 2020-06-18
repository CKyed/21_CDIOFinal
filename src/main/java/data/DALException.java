package data;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class DALException extends Exception {
    public DALException(String message) {
        super(message);
    }
    /*
    @Override
    public Response toResponse(DALException exception) {
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity(exception.getMessage())
                .type(MediaType.TEXT_PLAIN)
                .build();
    }

     */
}

