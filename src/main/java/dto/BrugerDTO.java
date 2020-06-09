package dto;

public class BrugerDTO {
    private int brugerID;
    private String rolle;
    private String brugerNavn;
    private String initialer;
    private String CPR;

    public BrugerDTO() {
    }

    public BrugerDTO(int brugerID, String rolle, String brugerNavn, String initialer, String CPR) {
        this.brugerID = brugerID;
        this.rolle = rolle;
        this.brugerNavn = brugerNavn;
        this.initialer = initialer;
        this.CPR = CPR;
    }

    public int getBrugerID() {
        return brugerID;
    }

    public void setBrugerID(int brugerID) {
        this.brugerID = brugerID;
    }

    public String getRolle() {
        return rolle;
    }

    public void setRolle(String rolle) {
        this.rolle = rolle;
    }

    public String getBrugerNavn() {
        return brugerNavn;
    }

    public void setBrugerNavn(String brugerNavn) {
        this.brugerNavn = brugerNavn;
    }

    public String getInitialer() {
        return initialer;
    }

    public void setInitialer(String initialer) {
        this.initialer = initialer;
    }

    public String getCPR() {
        return CPR;
    }

    public void setCPR(String CPR) {
        this.CPR = CPR;
    }
}
