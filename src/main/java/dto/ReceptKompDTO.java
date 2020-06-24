package dto;

public class ReceptKompDTO {
    private double nonNetto;
    private double tolerance;
    private RaavareDTO raavare;
    private int receptId;

    public ReceptKompDTO() {
    }

    public double getNonNetto() {
        return nonNetto;
    }

    public void setNonNetto(double nonNetto) {
        this.nonNetto = nonNetto;
    }

    public double getTolerance() {
        return tolerance;
    }

    public void setTolerance(double tolerance) {
        this.tolerance = tolerance;
    }

    public RaavareDTO getRaavare() {
        return raavare;
    }

    public void setRaavare(RaavareDTO raavare) {
        this.raavare = raavare;
    }

    public int getReceptId() {
        return receptId;
    }

    public void setReceptId(int receptId) {
        this.receptId = receptId;
    }
}