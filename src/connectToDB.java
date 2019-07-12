

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "connectToDB", urlPatterns = {"/connectToDB"})
public class connectToDB extends HttpServlet {
	private static final long serialVersionUID = 102831973239L;

    public connectToDB() {
    	super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
	
		
		out.print("<html><body><h1 align='center'>End point responding  </h1></body></html>");

	}

}
