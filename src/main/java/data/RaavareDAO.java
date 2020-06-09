package data;

import dto.RaavareDTO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

public class RaavareDAO implements iRaavareDAO{


    @Override
    public RaavareDTO getRaavare(int raavareId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        RaavareDTO raavareDTO = new RaavareDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Raavarer WHERE RaavareID = "+raavareId+";");
            resultSet.next();
            raavareDTO.setRaavareID(resultSet.getInt(1));
            raavareDTO.setRaavareNavn(resultSet.getString(2));
            raavareDTO.setLeverandoer(resultSet.getString(3));

        }catch (Exception e){
            throw new DALException("kunne ikke finde råvare");
        }

        dBconnector.closeConnection();
        return raavareDTO;
    }

    @Override
    public List<RaavareDTO> getRaavareList() throws DALException {
        return null;
    }

    @Override
    public void createRaavare(RaavareDTO raavare) throws DALException {

    }

    @Override
    public void updateRaavare(RaavareDTO raavare) throws DALException {

    }
}
