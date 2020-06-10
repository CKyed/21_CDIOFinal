package dto;

public class RaavareBatchDTO {
    private int rbId;
    private RaavareDTO raavare;
    private double maengde;

    public RaavareBatchDTO(int rbId, RaavareDTO raavare, double maengde) {
        this.rbId = rbId;
        this.raavare = raavare;
        this.maengde = maengde;
    }

    public RaavareBatchDTO() {
    }

    public int getRbId() {
        return rbId;
    }

    public void setRbId(int rbId) {
        this.rbId = rbId;
    }

    public RaavareDTO getRaavare() {
        return raavare;
    }

    public void setRaavare(RaavareDTO raavare) {
        this.raavare = raavare;
    }

    public double getMaengde() {
        return maengde;
    }

    public void setMaengde(double maengde) {
        this.maengde = maengde;
    }
}
