package data;

import dto.ReceptDTO;
import dto.ReceptKompDTO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ReceptDAO implements iReceptDAO{
    private iReceptKompDAO receptKompDAO = new ReceptKompDAO();

    @Override
    public ReceptDTO getRecept(int receptId) throws DALException {
        DBconnector dBconnector = new DBconnector();
        ReceptDTO receptDTO = new ReceptDTO();

        try{
            Statement statement = dBconnector.connection.createStatement();
            String SQLquery = "SELECT * FROM Recepter WHERE receptId = "+receptId+";";
            ResultSet resultSet = statement.executeQuery(SQLquery);
            resultSet.next();

            receptDTO.setReceptId(resultSet.getInt(1));
            receptDTO.setReceptNavn(resultSet.getString(2));
            receptDTO.setReceptKomponenter(receptKompDAO.getReceptKompList(receptId));


        }catch (Exception e){
            throw new DALException("Kunne ikke finde recepten med det ID");
        }

        dBconnector.closeConnection();
        return receptDTO;
    }

    @Override
    public List<ReceptDTO> getReceptList() throws DALException {
        DBconnector dBconnector = new DBconnector();
        ReceptDTO receptDTO = new ReceptDTO();
        List<ReceptDTO> receptDTOList = new ArrayList<ReceptDTO>();

        try{
            Statement statement = dBconnector.connection.createStatement();
            String SQLquery = "SELECT * FROM Recepter";
            ResultSet resultSet = statement.executeQuery(SQLquery);
            int receptId;
            while (resultSet.next()){
                //Get the receptId in a variable, since it is used twice
                receptId = resultSet.getInt(1);
                receptDTO.setReceptId(receptId);
                receptDTO.setReceptNavn(resultSet.getString(2));
                receptDTO.setReceptKomponenter(receptKompDAO.getReceptKompList(receptId));
                //Add to list
                receptDTOList.add(receptDTO);
                //Clear receptDTO object
                receptDTO = new ReceptDTO();
            }

        } catch (Exception e){
            throw new DALException("Kunne ikke finde listen af recepter");
        }

        dBconnector.closeConnection();
        return receptDTOList;
    }

    @Override
    public void createRecept(ReceptDTO recept) throws DALException {
        DBconnector dBconnector = new DBconnector();
        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "insert into Recepter values('%d', '%s');";
            //Format the string
            SQLstatement =String.format(SQLstatement,
                recept.getReceptId(),
                recept.getReceptNavn());

            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (Exception e){
            throw new DALException("Kunne ikke oprette den ønskede Recept");
        }

        for (ReceptKompDTO rkDTO: recept.getReceptKomponenter()) {
            receptKompDAO.createReceptKomp(rkDTO);
        }

        dBconnector.closeConnection();
    }

    @Override
    public void updateRecept(ReceptDTO recept) throws DALException {
        DBconnector dBconnector = new DBconnector();
        try {
            Statement statement = dBconnector.connection.createStatement();
            //Create String for the SQL Insert Statement
            String SQLstatement = "update Recepter set receptNavn = '%s' where receptId = '%d');";
            //Format the string
            SQLstatement =String.format(SQLstatement,
                    recept.getReceptNavn(), // Ja, det  skal stå i omvendt rækkefølge, grundet sql statementen
                    recept.getReceptId());


            //Execute the insert statement
            statement.executeUpdate(SQLstatement);
        }catch (Exception e){
            throw new DALException("Kunne ikke opdatere den ønskede Recept");
        }

        for (ReceptKompDTO rkDTO: recept.getReceptKomponenter()) {
            receptKompDAO.updateReceptKomp(rkDTO);
        }

        dBconnector.closeConnection();
    }
}
