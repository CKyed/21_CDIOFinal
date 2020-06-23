package data;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class DALException extends Exception {
    public String technicalMSG;

    public DALException(String userMSG, String technicalMSG) {
        super(userMSG);
        this.technicalMSG = userMSG + "\nDatabase says: " + technicalMSG;
    }

    public String getTechnicalMSG() {
        return technicalMSG;
    }


}

