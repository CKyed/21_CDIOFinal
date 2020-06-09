package data;

import dto.RaavareBatchDTO;
import dto.RaavareDTO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

public class RaavareBatchDAO implements iRaavareBatchDAO{
    private RaavareDAO raavareDAO = new RaavareDAO();


    @Override
    public RaavareBatchDTO getRaavareBatch(int rbId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        RaavareBatchDTO raavareBatchDTO = new RaavareBatchDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Raavarer WHERE rbId = "+rbId+";");
            resultSet.next();
            raavareBatchDTO.setRbId(resultSet.getInt(1));
            raavareBatchDTO.setMaengde(resultSet.getDouble(3));
            int raavareId = resultSet.getInt(2);
            raavareBatchDTO.setRaavare(raavareDAO.getRaavare(raavareId));

        }catch (Exception e){
            throw new DALException("kunne ikke finde råvareBatch");
        }

        dBconnector.closeConnection();
        return raavareBatchDTO;
    }

    @Override
    public List<RaavareBatchDTO> getRaavareBatchList() throws DALException {
        return null;
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
