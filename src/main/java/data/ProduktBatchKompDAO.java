package data;

import dto.ProduktBatchDTO;
import dto.ProduktBatchKompDTO;
import dto.RaavareBatchDTO;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

// Anthony laver denne klasse

public class ProduktBatchKompDAO implements iProduktBatchKompDAO{
    private iRaavareBatchDAO raavareBatchDAO = new RaavareBatchDAO();
    private iBrugerDAO brugerDAO = new BrugerDAO();

    @Override
    public ProduktBatchKompDTO getProduktBatchKomp(int pbId, int rbId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        ProduktBatchKompDTO produktBatchKompDTO = new ProduktBatchKompDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            // retrieving column values
            String query = "SELECT * FROM ProduktBatchKomp WHERE pbId = " + pbId + " AND rbId = " + rbId + ";";
            ResultSet resultSet = statement.executeQuery(query);
            resultSet.next();

            produktBatchKompDTO.setRaavareBatchDTO(raavareBatchDAO.getRaavareBatch(rbId));
            produktBatchKompDTO.setTara(resultSet.getDouble(1));
            produktBatchKompDTO.setNetto(resultSet.getDouble(2));
            int brugerId = resultSet.getInt(3);
            produktBatchKompDTO.setLaborant(brugerDAO.getBruger(brugerId));

        }catch (Exception e){
            throw new DALException("Kunne ikke finde produktbatchkomp med de angivne ID");
        }
        dBconnector.closeConnection();
        return produktBatchKompDTO ;
    }

    @Override
    public List<ProduktBatchKompDTO> getProduktBatchKompList(int pbId) throws DALException {

        return null;
    }

    @Override
    public List<ProduktBatchKompDTO> getProduktBatchKompList() throws DALException {
        return null;
    }

    @Override
    public void createProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException {

    }

    @Override
    public void updateProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException {

    }
}
