package kr.co.iobox.web.session;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iobox.web.common.Utils;

@Service
public class SessionServiceImpl implements SessionService {

	@Autowired SessionDAO dao;

	@Override
	public void create(Session fellows) {
		fellows.pwd = Utils.encodeMD5(fellows.pwd);

		dao.create(fellows);
	}

	@Override
	public void update(Session fellows) {
		// TODO Auto-generated method stub

	}

	@Override
	public Session read(String id) {
		return dao.read(id);
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
	public List<Session> list(String target, String keyword, int page, int perPage) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getListCount(String target, String keyword) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Boolean verify(String id, String password) {
		password = Utils.encodeMD5(password);

		return dao.verify(id, password);
	}

}
