package data;

import dto.BrugerDTO;
import java.sql.*;
import java.util.ArrayList;
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

        dBconnector.closeConnection();
        return bruger;
    }

    @Override
    public List<BrugerDTO> getBrugerList() throws DALException {
        DBconnector dBconnector = new DBconnector();
        List<BrugerDTO> brugerList =new ArrayList<BrugerDTO>();

        try {
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Brugere;");

            while (resultSet.next()){
                BrugerDTO bruger = new BrugerDTO();
                bruger.setBrugerID(resultSet.getInt(1));
                bruger.setBrugerNavn(resultSet.getString(2));
                bruger.setInitialer(resultSet.getString(3));
                bruger.setCPR(resultSet.getString(4));
                bruger.setRolle(resultSet.getString(5));
                brugerList.add(bruger);
            }

        }catch (Exception e){
            throw new DALException("Kunne ikke hente brugerlisten");
        }

        dBconnector.closeConnection();
        return brugerList;
    }

    @Override
    public void createBruger(BrugerDTO opr) throws DALException {
        DBconnector dBconnector = new DBconnector();

        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "insert into Brugere values('%d', '%s', '%s','%s', '%s');";
            //Format the string
            SQLstatement =String.format(SQLstatement, opr.getBrugerID(),opr.getBrugerNavn(),opr.getInitialer(),opr.getCPR(),opr.getRolle());
            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (Exception e){
            throw new DALException("Kunne ikke oprette bruger");
        }

        dBconnector.closeConnection();
    }

    @Override
    public void updateBruger(BrugerDTO opr) throws DALException {
        DBconnector dBconnector = new DBconnector();

        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "UPDATE Brugere SET BrugerNavn = '%s', Ini ='%s', Cpr ='%s', Rolle = '%s' WHERE BrugerID = %d;";
            //Format the string
            SQLstatement =String.format(SQLstatement,opr.getBrugerNavn(),opr.getInitialer(),opr.getCPR(),opr.getRolle(),opr.getBrugerID());
            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (Exception e){
            throw new DALException("Kunne ikke opdatere brugeren");
        }

        dBconnector.closeConnection();
    }
}
