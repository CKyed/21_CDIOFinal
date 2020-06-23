package rest;

import data.DALException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class DALExceptionMapper implements ExceptionMapper<DALException> {

    public static class ErrorMsg{
        String userMSG;
        String technicalMSG;

        public ErrorMsg() {
        }

        public String getUserMSG() {
            return userMSG;
        }

        public void setUserMSG(String userMSG) {
            this.userMSG = userMSG;
        }

        public String getTechnicalMSG() {
            return technicalMSG;
        }

        public void setTechnicalMSG(String technicalMSG) {
            this.technicalMSG = technicalMSG;
        }
    }

    @Override
    public Response toResponse(DALException exception) {
        ErrorMsg errorMsg = new ErrorMsg();
        errorMsg.userMSG =exception.getMessage();
        errorMsg.technicalMSG = exception.getTechnicalMSG();

        return Response
                .status(Response.Status.NOT_FOUND) //404
                .entity(errorMsg)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}

//entity kan sende objekter også, som kan formateres som JSON.