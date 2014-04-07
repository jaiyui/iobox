package kr.co.iobox.web.common;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class AES256 {

	private static volatile AES256 INSTANCE;
	
	final static String secretKey   = "12345678901234567890123456789012"; //32bit
	static String IV                = ""; //16bit
	
	
	public static AES256 getInstance()
	{
	     if(INSTANCE == null)
	     {
	         synchronized(AES256.class)
	         {
	             if(INSTANCE == null) INSTANCE = new AES256();
	         }
	     }
	     return INSTANCE;
	 }

	private AES256()
	{
	     IV = secretKey.substring(0,16);
	}
	
	//암호화
	public static String AES_Encode(String str) throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException
	{
		byte[] keyData = secretKey.getBytes();
	 
		SecretKey secureKey = new SecretKeySpec(keyData, "AES");
	  
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.ENCRYPT_MODE, secureKey, new IvParameterSpec(IV.getBytes()));
	  
		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
		String enStr = new String(Base64.encodeBase64(encrypted));
	  
		return enStr;
	}
	 
	  //복호화
	public static String AES_Decode(String str) throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException
	{
	    byte[] keyData = secretKey.getBytes();
	    System.out.println(new String(keyData) );
	    SecretKey secureKey = new SecretKeySpec(keyData, "AES");
	    Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
	    c.init(Cipher.DECRYPT_MODE, secureKey, new IvParameterSpec(IV.getBytes("UTF-8")));
	  
	    byte[] byteStr = Base64.decodeBase64(str.getBytes());
	  
	    return new String(c.doFinal(byteStr),"UTF-8");
	}
	 
	//키생성
	public static byte[] generationAES256_KEY() throws NoSuchAlgorithmException
	{
		KeyGenerator kgen = KeyGenerator.getInstance("AES");
		kgen.init(256);
		SecretKey key = kgen.generateKey();
	  
		return key.getEncoded();
	  
	}	
}
