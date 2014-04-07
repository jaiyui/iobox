package kr.co.iobox.web.session;

import java.util.HashMap;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.iobox.web.common.CommonBuilder;

@Controller
@RequestMapping("/session")
public class SessionController {

	@Autowired SessionService sessionService;

	@RequestMapping(value = "/index")
	public String sessionDivider(HttpSession session)
	{
		if (session.getAttribute("id") == null)
			return "redirect:/session/login";
		else
			return "redirect:/session/logout";
	}


	@RequestMapping(value = "/login")
	public String login(@RequestParam(defaultValue="wait")String result, @RequestParam(defaultValue="/dashboard/view")String url, @RequestParam(defaultValue="")String queryString, HttpSession session, Model model)
	{
		HashMap<String, String> defaultParam = CommonBuilder.CommonSetter(session);
		defaultParam = CommonBuilder.MenuSetter(defaultParam, "Login", "", "");
		
		model.addAllAttributes(defaultParam);
		model.addAttribute("result", result);
		model.addAttribute("url", url);
		model.addAttribute("queryString", queryString);
		return "/session/loginForm"; 
	}

	@RequestMapping(value = "/logout")
	public String logoutProcess(HttpSession session)
	{
		session.invalidate();
		return "redirect:/dashboard/view";
	}	

	@RequestMapping(value = "/start")
	public String start(String email, String password, String url, String queryString, HttpSession session)
	{
		Boolean loginResult = sessionService.verify(email, password);

		if (loginResult)
		{
			Session user = sessionService.read(email);
			session.setAttribute("idx", String.valueOf(user.idx));
			session.setAttribute("id", user.getId());
			session.setAttribute("nickname", user.getNickname());
			session.setMaxInactiveInterval(3600);
			return "redirect:" + url + "?" + queryString;
		} else
			return "redirect:login?result=failure&url=" + url + "&queryString=" + queryString;
	}

	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public void register(HttpSession session, Model model)
	{
		HashMap<String, String> defaultParam = CommonBuilder.CommonSetter(session);
		defaultParam = CommonBuilder.MenuSetter(defaultParam, "Login", "", "");
		
		model.addAllAttributes(defaultParam);
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String register(@Valid Session user, Errors errors)
	{
		if (errors.hasErrors()) return "/session/register";	
		sessionService.create(user); 
		
		return "redirect:login";
	}
}
