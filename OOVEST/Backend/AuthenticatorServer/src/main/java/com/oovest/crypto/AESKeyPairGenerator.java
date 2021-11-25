package com.oovest.crypto;

public class AESKeyPairGenerator {


    // todo add timestamp.
    public static String createKC(String rawPassword) {
        String shuffledPassword = Hash.sha256(rawPassword) + Hash.getTimeStamp();
        String hashed = Hash.sha256(shuffledPassword);
        String result = "";
        for (int i = 0; i < hashed.toCharArray().length / 2; i++) {
            result = result.concat(String.valueOf(hashed.charAt(2 * i)));
        }
        System.out.println(hashed);
        System.out.println(result);
        return result;
    }

    public static String createKCFromHashedPass(String hashedPass) {
        String hashed = Hash.sha256(hashedPass + Hash.getTimeStamp());
        String kc = "";
        for (int i = 0; i < hashed.toCharArray().length / 2; i++) {
            kc = kc.concat(String.valueOf(hashed.charAt(2 * i)));
        }
        System.out.println(hashed);
        System.out.println(kc);
        return kc;
    }
}
