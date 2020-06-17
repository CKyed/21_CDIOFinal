package data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class DBconnector {
    Connection connection;
    String host = "medicinaldb.cxhgltlvl9j3.eu-central-1.rds.amazonaws.com";
    String port = "3306";
    String username = "admin";
    String password = "HurraForMig";
    String driver = "com.mysql.cj.jdbc.Driver";
    String url = "jdbc:mysql://"
            + host + ":" + port + "/MedicinalDb" + "?characterEncoding=latin1"
            //+ "?useUnicode=true"
            + "&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

    public DBconnector() throws DALException{
        try {
            Class.forName(driver);
            connection = DriverManager.getConnection(url, username, password);
        }catch (Exception e){
            throw new DALException("Fejl med at oprette forbindelse til SQL server");
        }
    }

    public void closeConnection() throws DALException {
        try {
            connection.close();
        }catch (SQLException e){
            e.printStackTrace();
            throw new DALException("Fejl med at lukke forbindelse til SQL server");
        }
    }

}
