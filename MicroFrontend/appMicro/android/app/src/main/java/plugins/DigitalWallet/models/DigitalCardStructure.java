package plugins.DigitalWallet.models;

public class DigitalCardStructure {
    private String id;
    private String status;
    private String bin;
    private String lastDigits;
    private String expirationDate;
    private boolean imageIsLoaded;

    public DigitalCardStructure(String id, String status, String bin, String lastDigits,
                                String expirationDate, boolean imageIsLoaded) {
        this.id = id;
        this.status = status;
        this.bin = bin;
        this.lastDigits = lastDigits;
        this.expirationDate = expirationDate;
        this.imageIsLoaded = imageIsLoaded;
    }

    public String getId() { return id; }
    public String getStatus() { return status; }
    public String getBin() { return bin; }
    public String getLastDigits() { return lastDigits; }
    public String getExpirationDate() { return expirationDate; }
    public boolean isImageIsLoaded() { return imageIsLoaded; }
}
