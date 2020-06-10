package data;

import dto.BrugerDTO;
import dto.RaavareBatchDTO;
import dto.RaavareDTO;

import java.sql.ResultSet;
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

        }catch (Exception e){
            throw new DALException("Kunne ikke finde råvareBatch med det ID");
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

        }catch (Exception e){
            throw new DALException("kunne ikke finde råvareBatches");
        }

        dBconnector.closeConnection();
        return raavareBatchDTOList;
    }

    @Override
    public List<RaavareBatchDTO> getRaavareBatchList(int raavareId) throws DALException {
        return null;
    }

    @Override
    public void createRaavareBatch(RaavareBatchDTO raavarebatch) throws DALException {

    }

    @Override
    public void updateRaavareBatch(RaavareBatchDTO raavarebatch) throws DALException {

    }
}
