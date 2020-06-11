package dto;

public class ReceptKompDTO {
    private double nonNetto;
    private double tolerance;
    private RaavareDTO raavare;
    private ReceptDTO recept;

    public ReceptKompDTO(double nonNetto, double tolerance, RaavareDTO raavare) {
        this.nonNetto = nonNetto;
        this.tolerance = tolerance;
        this.raavare = raavare;
    }

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

    public ReceptDTO getRecept() {
        return recept;
    }

    public void setRecept(ReceptDTO recept) {
        this.recept = recept;
    }
}