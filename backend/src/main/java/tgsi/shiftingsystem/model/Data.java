package tgsi.shiftingsystem.model;

import java.sql.Date;
import java.sql.Time;



public class Data {
    private Long id;
    private Date overtime;
    private Date otime;
    private Time start;
    private Time end;
    private Date xpire;
    private String shifttype;
    private String status;
    private String proj;
    private String remarks;
    private Date reqday;
    private String username;

    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Date getOvertime() {
        return overtime;
    }
    public void setOvertime(Date overtime) {
        this.overtime = overtime;
    }
    public Date getOtime() {
        return otime;
    }
    public void setOtime(Date otime) {
        this.otime = otime;
    }
    public Time getStart() {
        return start;
    }
    public void setStart(Time start) {
        this.start = start;
    }
    public Time getEnd() {
        return end;
    }
    public void setEnd(Time end) {
        this.end = end;
    }
    public Date getXpire() {
        return xpire;
    }
    public void setXpire(Date xpire) {
        this.xpire = xpire;
    }
    public String getShifttype() {
        return shifttype;
    }
    public void setShifttype(String shifttype) {
        this.shifttype = shifttype;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getProj() {
        return proj;
    }
    public void setProj(String proj) {
        this.proj = proj;
    }
    public String getRemarks() {
        return remarks;
    }
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    public Date getReqday() {
        return reqday;
    }
    public void setReqday(Date reqday) {
        this.reqday = reqday;
    }
}