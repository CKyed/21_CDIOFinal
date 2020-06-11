package dto;

public class ProduktBatchKompDTO {

private int pbId;
private RaavareBatchDTO raavareBatchDTO;
private double tara;
private double netto;
private BrugerDTO laborant;

    public ProduktBatchKompDTO() {
    }

    public ProduktBatchKompDTO(int pbId, RaavareBatchDTO raavareBatchDTO, double tara, double netto, BrugerDTO laborant) {
        this.pbId = pbId;
        this.raavareBatchDTO = raavareBatchDTO;
        this.tara = tara;
        this.laborant = laborant;
        this.netto = netto;
    }

    public RaavareBatchDTO getRaavareBatchDTO() {
        return raavareBatchDTO;
    }

    public void setRaavareBatchDTO(RaavareBatchDTO raavareBatchDTO) {
        this.raavareBatchDTO = raavareBatchDTO;
    }

    public double getTara() {
        return tara;
    }

    public void setTara(double tara) {
        this.tara = tara;
    }

    public BrugerDTO getLaborant() {
        return laborant;
    }

    public void setLaborant(BrugerDTO laborant) {
        this.laborant = laborant;
    }

    public double getNetto() {
        return netto;
    }

    public void setNetto(double netto) {
        this.netto = netto;
    }

    public int getPbId() {
        return pbId;
    }

    public void setPbId(int pbId) {
        this.pbId = pbId;
    }
}
