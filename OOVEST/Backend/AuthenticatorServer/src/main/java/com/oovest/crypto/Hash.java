package com.oovest.crypto;

import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.UUID;


public class Hash {

    public static String sha256(String base) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(base.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public static String getTimeStamp() {
        Date date = new Date();
        LocalDate localDate = LocalDate.now();
        return localDate.toString().concat("T").concat(String.valueOf(date.getHours()));
    }

    public static String generateString() {
        String uuid = UUID.randomUUID().toString();
        return "uuid = " + uuid;
    }

    public static boolean checkTimeStampValidation(String timeStamp) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String current = dtf.format(now);
        System.out.println(current);
        Date d1 = null;
        try {

            d1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(current);
            Date d2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(timeStamp);
            long diff = (d1.getTime() - d2.getTime()) / 1000;
            return Math.abs(diff) < 30 * 60;

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return false;
    }

    public static void main(String[] args) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String current = dtf.format(now);
        System.out.println(checkTimeStampValidation("2021-02-17 23:41:00"));
    }

}