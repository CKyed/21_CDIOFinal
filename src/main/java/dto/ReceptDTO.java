package dto;


import java.util.List;

public class ReceptDTO {

    private int receptId;
    private String receptNavn;
    private List<ReceptKompDTO> receptKompomenter;

    public ReceptDTO() {
    }

    public ReceptDTO(int receptId, String receptNavn, List<ReceptKompDTO> receptKompomenter) {
        this.receptId = receptId;
        this.receptNavn = receptNavn;
        this.receptKompomenter = receptKompomenter;
    }

    public int getReceptId() {
        return receptId;
    }

    public void setReceptId(int receptId) {
        this.receptId = receptId;
    }

    public String getReceptNavn() {
        return receptNavn;
    }

    public void setReceptNavn(String receptNavn) {
        this.receptNavn = receptNavn;
    }

    public List<ReceptKompDTO> getReceptKompomenter() {
        return receptKompomenter;
    }

    public void setReceptKompomenter(List<ReceptKompDTO> receptKompomenter) {
        this.receptKompomenter = receptKompomenter;
    }
}
