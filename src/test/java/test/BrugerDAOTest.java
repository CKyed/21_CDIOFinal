package test;

import data.BrugerDAO;
import data.DALException;
import dto.BrugerDTO;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class BrugerDAOTest {

    @org.junit.jupiter.api.Test
    void getBruger() {
        //This variable: brugerId may be changed
        int brugerId = 1;

        boolean testSucceded = true;
        BrugerDAO brugerDAO = new BrugerDAO();
        BrugerDTO brugerDTO;
        try {
            brugerDTO = brugerDAO.getBruger(brugerId);
            if (brugerDTO.getBrugerID() != brugerId){
                testSucceded = false;
            }
        } catch (Exception e){
            testSucceded = false;
            e.printStackTrace();
        }

        assertTrue(testSucceded);
    }

    @org.junit.jupiter.api.Test
    void getBrugerList() {
        boolean testSucceded = true;
        BrugerDAO brugerDAO = new BrugerDAO();
        List<BrugerDTO> brugerDTOList;
        try {
            brugerDTOList = brugerDAO.getBrugerList();
            for (int i = 0; i < brugerDTOList.size(); i++) {
                if (brugerDTOList.isEmpty()){
                    testSucceded = false;
                }

                if (brugerDTOList.get(i).equals(null)){
                    testSucceded = false;
                }
            }

        } catch (Exception e){
            testSucceded = false;
            e.printStackTrace();
        }

        assertTrue(testSucceded);

    }

    @org.junit.jupiter.api.Test
    void createBruger() {
        boolean testSucceded = true;
        int brugerId = (int) (Math.random()*1000);
        BrugerDAO brugerDAO = new BrugerDAO();
        BrugerDTO brugerDTO = new BrugerDTO(brugerId,"Laborant","Christian Kyed","CK","0000000000",1);
        try{
            brugerDAO.createBruger(brugerDTO);
        } catch (Exception e) {
            e.printStackTrace();
            testSucceded = false;
        }
        assertTrue(testSucceded);
    }

    @org.junit.jupiter.api.Test
    void updateBruger() {
        boolean testSucceded = true;
        BrugerDAO brugerDAO = new BrugerDAO();
        List<BrugerDTO> brugerDTOList;
        BrugerDTO brugerDTO;
        try {
            brugerDTOList = brugerDAO.getBrugerList();
            int index = (int) (Math.random()*brugerDTOList.size());
            brugerDTO = brugerDTOList.get(index);

            //Generate a random CPR
            String CPRstring = "00000";
            int CPR = (int)(Math.random()*50000)+10000;
            CPRstring = CPRstring.concat(CPR+"");

            brugerDTO.setCPR(CPRstring);
            brugerDAO.updateBruger(brugerDTO);

        } catch (Exception e){
            testSucceded = false;
            e.printStackTrace();
        }
        assertTrue(testSucceded);

    }
    /*
    @org.junit.jupiter.api.Test
    void createArmyOfChristianKyed(){
        for (int i = 0; i < 500; i++) {
            createBruger();
        }
    }

     */
}