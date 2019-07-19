
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
//import com.amazonaws.services.rds.auth.GetIamAuthTokenRequest;
//import com.amazonaws.services.rds.auth.RdsIamAuthTokenGenerator;

@WebServlet(name = "connectToDB", urlPatterns = { "/connectToDB" })
public class connectToDB extends HttpServlet {
	private static final long serialVersionUID = 102831973239L;

	public connectToDB() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Connection conn = null;
		Statement stmt = null;
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		out.print("<h1 align='center'>End point responding  </h1>");
		conn = getRemoteConnection();

		
		  try { 
			  conn.beginRequest();
			  stmt = conn.createStatement();
			  String sqlTest = "Insert into chatroom_db.chatroom (Text,User,Date) Values (\"Test Statement\",\"Stephen\",1);";
			  stmt.executeUpdate(sqlTest);
			  
			  conn.endRequest(); 
			  conn.close();
		  
		  } catch (SQLException e) { // TODO Auto-generated catch block
		  e.printStackTrace(); }
		 

	}

	// Adding from
	// https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html
	private static Connection getRemoteConnection() {

		if (System.getenv("RDS_HOSTNAME") != null) {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				String dbName = System.getenv("RDS_DB_NAME");
				String userName = System.getenv("RDS_USERNAME");
				String password = System.getenv("RDS_PASSWORD");
				String hostname = System.getenv("RDS_HOSTNAME");
				String port = System.getenv("RDS_PORT");
				String jdbcUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName + "?user=" + userName
						+ "&password=" + password;
				System.out.println("Getting remote connection with connection string from environment variables.");
				Connection con = DriverManager.getConnection(jdbcUrl);
				System.out.println("Remote connection successful.");
				return con;
			} catch (ClassNotFoundException e) {
				System.out.println(e.toString());
			} catch (SQLException e) {
				System.out.println(e.toString());
			}
		}
		return null;
	}
}
