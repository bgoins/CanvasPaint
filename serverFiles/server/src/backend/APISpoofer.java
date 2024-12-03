package backend;
import com.google.gson.Gson;
import java.util.List;
import java.util.Arrays;

public class APISpoofer 
{
	class Course 
	{
	    int num;
	    String name;
	    int section;

	    public Course(int num, String name, int section) 
	    {
	        this.num = num;
	        this.name = name;
	        this.section = section;
	    }
	}

	class Assignment 
	{
	    int num;
	    String title;
	    String dueDate;

	    public Assignment(int num, String title, String dueDate) 
	    {
	        this.num = num;
	        this.title = title;
	        this.dueDate = dueDate;
	    }
	}

	class CourseAssignments 
	{
	    List<Course> courses;
	    List<Assignment> assignments;

	    public CourseAssignments(List<Course> courses, List<Assignment> assignments) 
	    {
	        this.courses = courses;
	        this.assignments = assignments;
	    }
	}

	public String spoofedmsg()
	{        
        List<Course> courses = Arrays.asList(
            new Course(3300, "Introduction to Software Engineering", 4),
            new Course(3080, "Python Programming", 1),
            new Course(3090, "Linear Algebra", 3),
            new Course(3010, "Social and Ethical Imp. of Computing", 1)
        );

        List<Assignment> assignments = Arrays.asList(
            new Assignment(3300, "Assignment 5", "2024-12-03"),
            new Assignment(3080, "HW 6", "2024-12-25"),
            new Assignment(3080, "HW 7", "2024-12-10"),
            new Assignment(3010, "Essay", "2024-12-11"),
            new Assignment(3090, "Chapter 5", "2024-12-05"),
            new Assignment(3010, "Final", "2024-12-15")
        );

        CourseAssignments courseAssignments = new CourseAssignments(courses, assignments);

        Gson gson = new Gson();
        String json = gson.toJson(courseAssignments);
                
        return json.toString();
	}
}
