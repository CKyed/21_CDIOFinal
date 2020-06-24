package dto;

import java.util.ArrayList;
import java.util.List;

public class ProduktBatchDTO {
int pbId;
int receptId;
int status;
List<ProduktBatchKompDTO> produktBatchKomponenter;

    public ProduktBatchDTO() {
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

    public List<ProduktBatchKompDTO> getProduktBatchKomponenter() {
        return produktBatchKomponenter;
    }

    public void setProduktBatchKomponenter(List<ProduktBatchKompDTO> produktBatchKomponenter) {
        this.produktBatchKomponenter = produktBatchKomponenter;
    }
}
