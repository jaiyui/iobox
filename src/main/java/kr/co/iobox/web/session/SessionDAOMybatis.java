package kr.co.iobox.web.session;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @brief 	Session DAO Mybatis 
 * @author 	성낙천
 * @version 1.0
 * @date    생성일: 2014.02.04 
 * @date    수정일: 2014.02.04
 * @remark
 */
@Repository
public class SessionDAOMybatis implements SessionDAO {

	@Autowired SqlSession sqlSessionSession;
	
	@Override
	public Boolean checkIdDuplicate(String id) {
		int foundCount = sqlSessionSession.selectOne("Session.checkidduplicate", id);
		return (foundCount > 0) ? true : false;
	}

	@Override
	public Boolean checkNickNameDuplicate(String nickname) {
		int foundCount = sqlSessionSession.selectOne("Session.checknicknameduplicate", nickname);
		return (foundCount > 0) ? true : false;
	}

	@Override
	public void create(Session user) {
		sqlSessionSession.insert("Session.create", user);
	}

	@Override
	public void update(Session user) {
		// TODO Auto-generated method stub

	}

	@Override
	public Session read(String id) {
		return sqlSessionSession.selectOne("Session.read", id);
	}

	@Override
	public void active(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void inactive(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Session> list(HashMap<String, String> param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getListCount(HashMap<String, String> param) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Boolean verify(String id, String pwd) {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("id", id);
		param.put("pwd", pwd);

		int foundCount = sqlSessionSession.selectOne("Session.verify", param);
		return (foundCount > 0) ? true : false;
	}

}
