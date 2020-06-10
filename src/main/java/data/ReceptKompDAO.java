package data;

import dto.RaavareDTO;
import dto.ReceptKompDTO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

public class ReceptKompDAO implements iReceptKompDAO{

    @Override
    public ReceptKompDTO getReceptKomp(int receptId, int raavareId) throws DALException {
        DBconnector dBconnector = new DBconnector();

        try{
            Statement statement = dBconnector.connection.createStatement();
            //ResultSet resultSet = statement.executeQuery("SELECT * FROM  WHERE  = "++";");
            //resultSet.next();

        }catch (Exception e){
            throw new DALException("kunne ikke finde råvare");
        }

        dBconnector.closeConnection();

        return null;
    }

    @Override
    public List<ReceptKompDTO> getReceptKompList(int receptId) throws DALException {
        return null;
    }

    @Override
    public List<ReceptKompDTO> getReceptKompList() throws DALException {
        return null;
    }

    @Override
    public void createReceptKomp(ReceptKompDTO receptkomponent) throws DALException {

    }

    @Override
    public void updateReceptKomp(ReceptKompDTO receptkomponent) throws DALException {

    }
}
