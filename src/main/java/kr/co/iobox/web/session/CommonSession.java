/**
 * @file	CommonSession.java
 * @brief   로그인 세션에 의해 로그인 화면과 일반 화면으로 분기하는 클래스 
 * @author  개발지원 1팀
 * @author  성낙천
 * @date    생성: 
 * @date    최종수정: 
 */

package kr.co.iobox.web.session;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @brief 	HandlerInterceptorAdapter 상속 세션에 의한 로그인 처리 클래스 
 * @author 	개발지원1팀/성낙천
 * @version 1.0
 * @date    생성: 
 * @date    최종수정: 
 * @remark	
 */
public class CommonSession extends HandlerInterceptorAdapter {
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//System.out.print("============" + request.getRequestURI() + "===================\n");
		HttpSession session  =  request.getSession();
		String id = (String)session.getAttribute("id");
		if ( id == null) {	//session check
			response.sendRedirect("/session/login?url=" + request.getRequestURI() + "&queryString=" + ((request.getQueryString() != null) ? URLEncoder.encode(request.getQueryString(), "UTF-8") : ""));
			return false;
		}
		else{
			return true;
		}
	}
}
