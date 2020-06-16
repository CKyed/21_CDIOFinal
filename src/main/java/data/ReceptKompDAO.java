package data;

import dto.ReceptKompDTO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ReceptKompDAO implements iReceptKompDAO {
    private iRaavareDAO raavareDAO = new RaavareDAO();

    @Override
    public ReceptKompDTO getReceptKomp(int receptId, int raavareId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        ReceptKompDTO receptKompDTO = new ReceptKompDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM ReceptKomp WHERE raavareId = "+raavareId+"and receptId = "+receptId+";");
            resultSet.next();
            receptKompDTO.setNonNetto(resultSet.getDouble(1));
            receptKompDTO.setTolerance(resultSet.getDouble(2));
            receptKompDTO.setReceptId(resultSet.getInt(3));
            raavareId = resultSet.getInt(4);
            receptKompDTO.setRaavare(raavareDAO.getRaavare(raavareId));
        }catch (Exception e){
            throw new DALException("kunne ikke finde receptkomponenten");
        }
        dBconnector.closeConnection();
        return receptKompDTO;
    }

    @Override
    public List<ReceptKompDTO> getReceptKompList(int receptId) throws DALException { // liste med receptkomponenter ud fra et recept id.
        DBconnector dBconnector = new DBconnector();
        ReceptKompDTO receptKompDTO = new ReceptKompDTO();
        List<ReceptKompDTO> receptKompDTOList = new ArrayList<ReceptKompDTO>();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM ReceptKomp WHERE receptId = "+receptId+";");
            while (resultSet.next()){
                receptKompDTO.setNonNetto(resultSet.getDouble(1));
                receptKompDTO.setTolerance(resultSet.getDouble(2));
                receptKompDTO.setReceptId(resultSet.getInt(3));
                int raavareId = resultSet.getInt(4);
                receptKompDTO.setRaavare(raavareDAO.getRaavare(raavareId));
                receptKompDTOList.add(receptKompDTO);
                receptKompDTO = new ReceptKompDTO();

            }

        }catch (Exception e){
            throw new DALException("kunne ikke finde receptkomponent");
        }
        dBconnector.closeConnection();
        return receptKompDTOList;

    }

    @Override
    public List<ReceptKompDTO> getReceptKompList() throws DALException { //liste over alle recept komponenter
        DBconnector dBconnector = new DBconnector();
        ReceptKompDTO receptKompDTO = new ReceptKompDTO();
        List<ReceptKompDTO> receptKompDTOList = new ArrayList<ReceptKompDTO>();

        try{
            Statement statement = dBconnector.connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM ReceptKomp;");
            while (resultSet.next()){
                receptKompDTO.setNonNetto(resultSet.getDouble(1));
                receptKompDTO.setTolerance(resultSet.getDouble(2));
                receptKompDTO.setReceptId(resultSet.getInt(3));
                int raavareId = resultSet.getInt(4);
                receptKompDTO.setRaavare(raavareDAO.getRaavare(raavareId));
                receptKompDTOList.add(receptKompDTO);
                receptKompDTO = new ReceptKompDTO();

            }

        }catch (Exception e){
            throw new DALException("kunne ikke finde receptkomponent");
        }
        dBconnector.closeConnection();
        return receptKompDTOList;
    }

    @Override
    public void createReceptKomp(ReceptKompDTO receptkomponent) throws DALException {
        DBconnector dBconnector = new DBconnector();

        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "insert into ReceptKomp values('%f', '%f', '%d', '%d');";
            //Format the string
            SQLstatement =String.format(SQLstatement,
                    receptkomponent.getNonNetto(), //NonNetto
                    receptkomponent.getTolerance(), //Tolerance
                    receptkomponent.getReceptId(),//ReceptID
                    receptkomponent.getRaavare().getRaavareID()); //RaavareID
            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (Exception e){
            throw new DALException("Kunne ikke oprette den ønskede Receptkompnent");
        }

        dBconnector.closeConnection();

    }

    @Override
    public void updateReceptKomp(ReceptKompDTO receptkomponent) throws DALException {
        DBconnector dBconnector = new DBconnector();


        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "update ReceptKomp set nonNetto = '%f', tolerance= '%f' where receptId = '%d' and raavareId = '%d';";
            //Format the string
            SQLstatement =String.format(SQLstatement,
                receptkomponent.getNonNetto(), //NonNetto
                receptkomponent.getTolerance(), //Tolerance
                receptkomponent.getReceptId(), //ReceptID
                receptkomponent.getRaavare().getRaavareID());
            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (Exception e){
            throw new DALException("Kunne ikke oprette den ønskede Receptkompnent");
        }

        dBconnector.closeConnection();
    }
}
