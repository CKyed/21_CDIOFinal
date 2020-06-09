package data;

import dto.BrugerDTO;
import java.sql.*;
import java.util.List;

public class BrugerDAO implements iBrugerDAO{
    @Override
    public BrugerDTO getBruger(int oprId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        BrugerDTO bruger = new BrugerDTO();

         try {
             Statement statement = dBconnector.connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM Brugere WHERE BrugerID ="+ oprId+";");
                resultSet.next();
                 bruger.setBrugerID(resultSet.getInt(1));
                 bruger.setBrugerNavn(resultSet.getString(2));
                 bruger.setInitialer(resultSet.getString(3));
                 bruger.setCPR(resultSet.getString(4));
                 bruger.setRolle(resultSet.getString(5));
         }catch (Exception e){
             throw new DALException("Kunne ikke finde bruger med det ID");
         }


        return null;
    }

    @Override
    public List<BrugerDTO> getBrugerList() throws DALException {
        return null;
    }

    @Override
    public void createBruger(BrugerDTO opr) throws DALException {

    }

    @Override
    public void updateBruger(BrugerDTO opr) throws DALException {

    }
}
