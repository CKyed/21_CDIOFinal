package data;


import dto.ProduktBatchDTO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

public class ProduktBatchDAO implements iProduktBatchDAO {
    private iProduktBatchKompDAO produktBatchKompDAO = new ProduktBatchKompDAO();

    @Override
    public ProduktBatchDTO getProduktBatch(int pbId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        ProduktBatchDTO produktBatchDTO = new ProduktBatchDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            String SQLquery = "SELECT * FROM ProduktBatches WHERE pbId ="+pbId+";";
            ResultSet resultSet = statement.executeQuery(SQLquery);
            resultSet.next();

            produktBatchDTO.setPbId(resultSet.getInt(1));
            produktBatchDTO.setStatus(resultSet.getInt(2));
            produktBatchDTO.setReceptId(resultSet.getInt(3));
            produktBatchDTO.setProduktBatchKomponenter(produktBatchKompDAO.getProduktBatchKompList(pbId));

        }catch (Exception e){
            throw new DALException("Kunne ikke finde produktbatch med det ID");
        }
        dBconnector.closeConnection();
        return produktBatchDTO;

    }

    @Override
    public List<ProduktBatchDTO> getProduktBatchList() throws DALException {
        return null;
    }

    @Override
    public void createProduktBatch(ProduktBatchDTO produktbatch) throws DALException {

    }

    @Override
    public void updateProduktBatch(ProduktBatchDTO produktbatch) throws DALException {

    }
}
