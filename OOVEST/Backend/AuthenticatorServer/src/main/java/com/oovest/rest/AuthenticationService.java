package com.oovest.rest;

import com.oovest.StaticServerContent;
import com.oovest.crypto.*;
import com.oovest.dataBase.DataBaseController;
import org.bson.Document;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.nio.charset.StandardCharsets;

@Path("/")
public class AuthenticationService {

    @GET // This annotation indicates GET request
    @Path("/hello")
    public Response hello(@Context HttpServletRequest req) {
        System.out.println(req.getRemoteAddr());
        return Response.status(200).entity("hello").build();
    }

    // todo Exception handling.
    @POST
    @Path("/signUp")
    public Response signUp(@QueryParam("username") String username, // username is a simple name.
                           @QueryParam("password") String encryptedPass,
                           @QueryParam("email") String encryptedEmail) {

        String password = RSAUtil.decrypt(encryptedPass);
        String email = RSAUtil.decrypt(encryptedEmail);
        Document document = DataBaseController.doesExist(email);
        if (document != null) {
            return Response.status(409).entity("{ \"result\":\"user with this email does exit.\"}").build();
        }
        DataBaseController.addUser(username, email, password);
        String KC = AESKeyPairGenerator.createKC(password);
        String response = "I got kc";
        String encryptedResponse;
        try {
            encryptedResponse = Password.encrypt(response.getBytes(StandardCharsets.UTF_8), KC);
            return Response.status(200).entity("{ \"result\":\"" + encryptedResponse + "\"").build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(400).entity("{ \"result\":\"" + "failed" + "\"").build();
        }
    }


    @POST
    @Path("/handshake")
    public Response handshake(@QueryParam("idc") String clientId, // clientId is her unique username.
                              @QueryParam("idv") String providerServerId,
                              @QueryParam("ts1") String timeStamp1,
                              @Context HttpServletRequest req) {

        if (!Hash.checkTimeStampValidation(timeStamp1)) {
            return Response.status(400).entity("{\"result\":\"Request is expired.\"}").build();
        }

        String ip = req.getRemoteAddr();
        String kcv = Hash.sha256(ip.concat(Hash.generateString()));
        String timeStamp2 = Hash.getTimeStamp(); // year-month-day#hour.
        String lifeTime2 = "30m"; // 30 minute.
        String ticketV = getTicket(StaticServerContent.getKV(),
                kcv,
                clientId,
                ip,
                providerServerId,
                timeStamp2,
                lifeTime2);

        if (ticketV.equals("Error")) {
            return Response.status(400).entity("{\"result\":\"Bad request.\"}").build();
        }

        String rawData = kcv.concat(providerServerId)
                .concat(timeStamp2)
                .concat(lifeTime2)
                .concat(ticketV);

        Document document = DataBaseController.doesExist(clientId);
        if (document == null) {
            return Response.status(404).entity("{\"result\":\"user with this id doesnt found\"}").build();
        }
        String hashedPass = String.valueOf(document.get("password"));
        String kc = AESKeyPairGenerator.createKCFromHashedPass(hashedPass);
        String encryptedResult = null;
        try {
            encryptedResult = Password.encrypt(rawData.getBytes(Password.UTF_8), kc);
            Response.status(200).entity("{\"result\":" + "\"" + encryptedResult + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
        }
        Response.status(400).entity("{\"result\":\"failed\"}");
        return null;
    }


    private String getTicket(String kv,
                             String kcv,
                             String idc,
                             String adc,
                             String idv,
                             String ts2,
                             String lf2) {
        String rawData = kcv.concat(idc).concat(adc).concat(idv).concat(ts2).concat(lf2);
        String encryptedTextBase64 = null;
        try {
            encryptedTextBase64 = Password.encrypt(rawData.getBytes(Password.UTF_8), kv);
            return encryptedTextBase64;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Error";
    }

}





