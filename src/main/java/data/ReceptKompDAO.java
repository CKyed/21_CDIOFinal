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
            //select * from ReceptKomp where raavareId = '53698247' and receptId = '23695842';
            resultSet.next();
            receptKompDTO.setNonNetto(resultSet.getInt(1));
            receptKompDTO.setTolerance(resultSet.getInt(2));
            //todo? receptId = resultSet.getInt(3);
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
                receptKompDTO.setNonNetto(resultSet.getInt(1));
                receptKompDTO.setTolerance(resultSet.getInt(2));
                //todo? receptId = resultSet.getInt(3);
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
                receptKompDTO.setNonNetto(resultSet.getInt(1));
                receptKompDTO.setTolerance(resultSet.getInt(2));
                //todo? receptId = resultSet.getInt(3);
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

    }

    @Override
    public void updateReceptKomp(ReceptKompDTO receptkomponent) throws DALException {

    }
}
