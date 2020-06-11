package dto;

import java.util.ArrayList;

public class ProduktBatchDTO {
int pbId;
int receptId;
int status;
ArrayList<ProduktBatchKompDTO> produktBatchKomponenter;

    public ProduktBatchDTO() {
    }

    public ProduktBatchDTO(int pbId, int receptId, int status, ArrayList<ProduktBatchKompDTO> produktBatchKomponenter) {
        this.pbId = pbId;
        this.receptId = receptId;
        this.status = status;
        this.produktBatchKomponenter = produktBatchKomponenter;
    }

    public int getPbId() {
        return pbId;
    }

    public void setPbId(int pbId) {
        this.pbId = pbId;
    }

    public int getReceptId() {
        return receptId;
    }

    public void setReceptId(int receptId) {
        this.receptId = receptId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public ArrayList<ProduktBatchKompDTO> getProduktBatchKomponenter() {
        return produktBatchKomponenter;
    }

    public void setProduktBatchKomponenter(ArrayList<ProduktBatchKompDTO> produktBatchKomponenter) {
        this.produktBatchKomponenter = produktBatchKomponenter;
    }
}
