/**
 * @file	ContentsController.java
 * @brief   컨텐츠 페이지 처리 Controller class 
 * @author  성낙천
 * @date    생성: 2014.04.16
 * @date    최종수정: 2014.04.16 
 */

package kr.co.iobox.web.contents;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import kr.co.iobox.web.common.CommonBuilder;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @brief 	컨텐츠 컨트롤러 클래스
 * @author 	성낙천
 * @version 1.0
 * @date    생성: 2014.04.16 
 * @date    최종수정: 2014.04.16 
 * @remark	본 사이트는 거의 콘테트를 표시하는 기능만 가지므로, 각 페이지의 콘텐츠를 표시하기 위한 컨트롤러를 만들어서 모두 처리하는 것으로 합니다.
 */

@Controller
@RequestMapping("/contents")
public class ContentsController {

	@RequestMapping(value = "/softwaretour")
	public String softwaretour(HttpSession session, Model model){
		HashMap<String, String> defaultParam = CommonBuilder.CommonSetter(session);
		defaultParam = CommonBuilder.MenuSetter(defaultParam, "Tour", "", "");
		
		model.addAllAttributes(defaultParam);
		return "/contents/softwaretour";
	}

	@RequestMapping(value = "/faq")
	public String faq(HttpSession session, Model model){
		HashMap<String, String> defaultParam = CommonBuilder.CommonSetter(session);
		defaultParam = CommonBuilder.MenuSetter(defaultParam, "faq", "", "");
		
		model.addAllAttributes(defaultParam);
		return "/contents/faq";
	}

	@RequestMapping(value = "/support")
	public String support(HttpSession session, Model model){
		HashMap<String, String> defaultParam = CommonBuilder.CommonSetter(session);
		defaultParam = CommonBuilder.MenuSetter(defaultParam, "support", "", "");
		
		model.addAllAttributes(defaultParam);
		return "/contents/support";
	}

	@RequestMapping(value = "/contact")
	public String contact(HttpSession session, Model model){
		HashMap<String, String> defaultParam = CommonBuilder.CommonSetter(session);
		defaultParam = CommonBuilder.MenuSetter(defaultParam, "contact", "", "");
		
		model.addAllAttributes(defaultParam);
		return "/contents/contact";
	}

}
