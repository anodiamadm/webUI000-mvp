import CourseList from '../CourseList/CourseList';
import useFetch from '../useFetch';

const AnodiamHome = () => {

  const { data: courses, isPending, error } = useFetch('http://localhost:8000/courses', 'GET');

  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <div className="anodiam-body-panel-top">
          <h2>Anodiam Home Page</h2>
        </div>
          { error && <div>ERROR: {error} </div> }
          { isPending && <div>Loading .... </div> }
          { courses && <CourseList courses={courses} title="All Courses" /> }
      </div>
    </div>
  );
}
 
export default AnodiamHome;