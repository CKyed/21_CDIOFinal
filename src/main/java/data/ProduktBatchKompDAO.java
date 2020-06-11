package data;

import com.sun.org.apache.xpath.internal.objects.XString;
import dto.ProduktBatchDTO;
import dto.ProduktBatchKompDTO;
import dto.RaavareBatchDTO;
import dto.ReceptKompDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ProduktBatchKompDAO implements iProduktBatchKompDAO {
    private iRaavareBatchDAO raavareBatchDAO = new RaavareBatchDAO();
    private iBrugerDAO brugerDAO = new BrugerDAO();

    @Override
    public ProduktBatchKompDTO getProduktBatchKomp(int pbId, int rbId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        ProduktBatchKompDTO produktBatchKompDTO = new ProduktBatchKompDTO();

        try {
            Statement statement = dBconnector.connection.createStatement();
            // retrieving column values
            String query = "SELECT * FROM ProduktBatchKomp WHERE pbId = " + pbId + " AND rbId = " + rbId + ";";
            ResultSet resultSet = statement.executeQuery(query);
            resultSet.next();

            produktBatchKompDTO.setPbId(4);
            produktBatchKompDTO.setTara(resultSet.getDouble(1));
            produktBatchKompDTO.setNetto(resultSet.getDouble(2));
            int brugerId = resultSet.getInt(3);
            produktBatchKompDTO.setLaborant(brugerDAO.getBruger(brugerId));
            produktBatchKompDTO.setRaavareBatchDTO(raavareBatchDAO.getRaavareBatch(rbId));

        } catch (Exception e) {
            throw new DALException("Kunne ikke finde produktbatchkomp med de angivne ID");
        }
        dBconnector.closeConnection();
        return produktBatchKompDTO;
    }

    @Override
    public List<ProduktBatchKompDTO> getProduktBatchKompList(int pbId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        ProduktBatchKompDTO produktBatchKompDTO = new ProduktBatchKompDTO();
        List<ProduktBatchKompDTO> produktBatchKompDAOList = new ArrayList<>();

        try {
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM ProduktBatchKomp WHERE pbId = " + pbId + ";");
            while (resultSet.next()) {

                produktBatchKompDTO.setTara(resultSet.getDouble(1));
                produktBatchKompDTO.setNetto(resultSet.getDouble(2));
                produktBatchKompDTO.setPbId(4);
                int brugerId = resultSet.getInt(3);
                produktBatchKompDTO.setLaborant(brugerDAO.getBruger(brugerId));
                int rbId = resultSet.getInt(5);
                produktBatchKompDTO.setRaavareBatchDTO(raavareBatchDAO.getRaavareBatch(rbId));
                produktBatchKompDAOList.add(produktBatchKompDTO);
                produktBatchKompDTO = new ProduktBatchKompDTO();
            }

        } catch (Exception e) {
            throw new DALException("Produktbacthkomp med det angivne pbId findes ikke");
        }
        dBconnector.closeConnection();
        return produktBatchKompDAOList;
    }

    @Override
    public List<ProduktBatchKompDTO> getProduktBatchKompList() throws DALException {
        DBconnector dBconnector = new DBconnector();
        ProduktBatchKompDTO produktBatchKompDTO = new ProduktBatchKompDTO();
        List<ProduktBatchKompDTO> produktBatchKompDAOList = new ArrayList<>();

        try {
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM ProduktBatchKomp;");
            while (resultSet.next()) {

                produktBatchKompDTO.setTara(resultSet.getDouble(1));
                produktBatchKompDTO.setNetto(resultSet.getDouble(2));
                int brugerId = resultSet.getInt(3);
                produktBatchKompDTO.setPbId(4);
                produktBatchKompDTO.setLaborant(brugerDAO.getBruger(brugerId));
                int rbId = resultSet.getInt(5);
                produktBatchKompDTO.setRaavareBatchDTO(raavareBatchDAO.getRaavareBatch(rbId));
                produktBatchKompDAOList.add(produktBatchKompDTO);
                produktBatchKompDTO = new ProduktBatchKompDTO();
            }

        } catch (Exception e) {
            throw new DALException("Produktbacthkomp med det angivne pbId findes ikke");
        }
        dBconnector.closeConnection();
        return produktBatchKompDAOList;
    }

    @Override
    public void createProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException {
        DBconnector dBconnector = new DBconnector();
        try {
            Statement statement = dBconnector.connection.createStatement();
            String sqlStatement = "insert into ProduktbatchKomp values('%f', '%f', '%d', '%d', '%d');";
            sqlStatement = String.format(sqlStatement,
                    produktbatchkomponent.getTara(),
                    produktbatchkomponent.getNetto(),
                    produktbatchkomponent.getLaborant().getBrugerID(),
                    produktbatchkomponent.getPbId(),
                    produktbatchkomponent.getRaavareBatchDTO().getRbId());
            //Execute the insert statement
            statement.executeUpdate(sqlStatement);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        dBconnector.closeConnection();
    }

    @Override
    public void updateProduktBatchKomp(ProduktBatchKompDTO produktbatchkomponent) throws DALException {
        DBconnector dBconnector = new DBconnector();
        try {
            Statement statement = dBconnector.connection.createStatement();
            String sqlStatement = "UPDATE ProduktbatchKomp " +
                    "SET Tara = '%f' , Netto = '%f' ,BrugerID = '%d' " +
                    "WHERE pbId = '%d' AND rbId = '%d';";
            sqlStatement = String.format(sqlStatement,
                    produktbatchkomponent.getTara(),
                    produktbatchkomponent.getNetto(),
                    produktbatchkomponent.getLaborant().getBrugerID(),
                    produktbatchkomponent.getPbId(),
                    produktbatchkomponent.getRaavareBatchDTO().getRbId());
            //Execute the insert statement
            statement.executeUpdate(sqlStatement);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        dBconnector.closeConnection();

    }
}

