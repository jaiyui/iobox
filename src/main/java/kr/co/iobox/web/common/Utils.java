package kr.co.iobox.web.common;

import java.io.UnsupportedEncodingException;

import org.springframework.util.DigestUtils;

public class Utils {

	/** 
	* 
	* 1. MethodName	: encodeMD5
	* 2. ClassName	: Utils
	* 3. 작성자	: 성낙천
	* 4. 작성일	: 2013. 11. 15
	* 5. Comment	: 주어진 문자열이 공백이 아닌 경우 MD5로 암호화하여 리턴
	* @param param
	* @return String 암호화된 문자열
	* @param string 입력 문자열
	* @return
	*/
	public static String encodeMD5(String string)
	{
		if (string.equals("")) return null;
		byte[] bytesInput = null;
		try {
			bytesInput = string.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
        return DigestUtils.md5DigestAsHex(bytesInput);
	}
	
	/** 
	* 
	* 1. MethodName	: removeHTML
	* 2. ClassName	: Utils
	* 3. 작성자	: 성낙천
	* 4. 작성일	: 2013. 12. 13
	* 5. Comment	: 주어진 문자열의 html 코드를 정규식을 활용하여 제거
	* @param param
	* @return String HTML이 제거된 문자열
	* @param string HTML이 포함되어 있는 것으로 생각되는 입력 문자열
	* @return
	*/
	public String removeHTML(String contents)
	{
		contents = contents.replaceAll("\\s", "");
		contents = contents.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
		contents = contents.replaceAll("\r|\n|&nbsp;", "");
		contents = contents.replaceAll("<(\"[^\"]*\"|\'[^\']*\'|[^\'\">])*>", "");
		contents = contents.replaceAll("<\\w+\\s+[^<]*\\s*>", "");
		contents = contents.replaceAll("&[^;]+;", "");
		return contents;
	}
}
