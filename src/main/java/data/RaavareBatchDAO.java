package data;

import dto.BrugerDTO;
import dto.RaavareBatchDTO;
import dto.RaavareDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class RaavareBatchDAO implements iRaavareBatchDAO{
    private iRaavareDAO raavareDAO = new RaavareDAO();


    @Override
    public RaavareBatchDTO getRaavareBatch(int rbId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        RaavareBatchDTO raavareBatchDTO = new RaavareBatchDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM RaavareBatches WHERE rbId = "+rbId+";");
            resultSet.next();
            raavareBatchDTO.setRbId(resultSet.getInt(1));
            raavareBatchDTO.setMaengde(resultSet.getDouble(2));
            int raavareId = resultSet.getInt(3);
            raavareBatchDTO.setRaavare(raavareDAO.getRaavare(raavareId));

        }catch (SQLException e){
            e.printStackTrace();
            throw new DALException("Kunne ikke finde råvareBatch med det ID",e.getMessage());
        }

        dBconnector.closeConnection();
        return raavareBatchDTO;
    }

    @Override
    public List<RaavareBatchDTO> getRaavareBatchList() throws DALException {
        DBconnector dBconnector = new DBconnector();
        RaavareBatchDTO raavareBatchDTO = new RaavareBatchDTO();
        List<RaavareBatchDTO> raavareBatchDTOList = new ArrayList<RaavareBatchDTO>();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM RaavareBatches;");
            while (resultSet.next()){
                raavareBatchDTO.setRbId(resultSet.getInt(1));
                raavareBatchDTO.setMaengde(resultSet.getDouble(2));
                int raavareId = resultSet.getInt(3);
                raavareBatchDTO.setRaavare(raavareDAO.getRaavare(raavareId));
                raavareBatchDTOList.add(raavareBatchDTO);
                raavareBatchDTO=new RaavareBatchDTO();
            }

        }catch (SQLException e){
            e.printStackTrace();
            throw new DALException("kunne ikke finde råvareBatches",e.getMessage());
        }

        dBconnector.closeConnection();
        return raavareBatchDTOList;
    }

    @Override
    public List<RaavareBatchDTO> getRaavareBatchList(int raavareId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        RaavareBatchDTO raavareBatchDTO = new RaavareBatchDTO();
        List<RaavareBatchDTO> raavareBatchDTOList = new ArrayList<RaavareBatchDTO>();

        try{
            Statement statement = dBconnector.connection.createStatement();
            //Select all where RaavareID matches
            ResultSet resultSet = statement.executeQuery("SELECT * FROM RaavareBatches WHERE RaavareID = " + raavareId +";");
            //Get the RaavareDTO once, since it will be the same for all RaavareBacthes here
            RaavareDTO raavareDTO = raavareDAO.getRaavare(raavareId);

            //Loop through the resultset, adding the results to the list.
            while (resultSet.next()){
                raavareBatchDTO.setRbId(resultSet.getInt(1));
                raavareBatchDTO.setMaengde(resultSet.getDouble(2));
                //raavareDTO is the one, that is common for all the RaavareBatches in this search
                raavareBatchDTO.setRaavare(raavareDTO);
                raavareBatchDTOList.add(raavareBatchDTO);
                raavareBatchDTO=new RaavareBatchDTO();
            }

        }catch (SQLException e){
            e.printStackTrace();
            throw new DALException("kunne ikke finde råvareBatches",e.getMessage());
        }

        dBconnector.closeConnection();
        return raavareBatchDTOList;
    }

    @Override
    public void createRaavareBatch(RaavareBatchDTO raavareBatch) throws DALException {
        DBconnector dBconnector = new DBconnector();

        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "insert into RaavareBatches values('%d', '%f', '%d');";
            //Format the string
            SQLstatement =String.format(SQLstatement,
                    raavareBatch.getRbId(), //RaavareBatchID
                    raavareBatch.getMaengde(), // Mængde
                    raavareBatch.getRaavare().getRaavareID()); //RaavareID
            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (SQLException e){
            e.printStackTrace();
            throw new DALException("Kunne ikke oprette den ønskede RaavareBatch",e.getMessage());
        }
        dBconnector.closeConnection();
    }

    @Override
    public void updateRaavareBatch(RaavareBatchDTO raavareBatch) throws DALException {
        DBconnector dBconnector = new DBconnector();

        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "UPDATE RaavareBatches SET Maengde = '%f', RaavareID = '%d' WHERE rbID= '%d';";
            //Format the string
            SQLstatement =String.format(SQLstatement,
                    raavareBatch.getMaengde(), // Mængde
                    raavareBatch.getRaavare().getRaavareID(), //RaavareID
                    raavareBatch.getRbId()); //RaavareBatchID
            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (SQLException e){
            e.printStackTrace();
            throw new DALException("Kunne ikke opdatere den ønskede RaavareBatch",e.getMessage());
        }
        dBconnector.closeConnection();
    }
}
